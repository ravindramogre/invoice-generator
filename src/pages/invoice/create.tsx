import React, { useEffect, useState, useRef } from "react";
import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, Button, Table, Modal, Image } from "antd";
import { useCreate, useList } from "@refinedev/core";
import { PdfLayout } from "./InvoicePdf";
import { PdfLayoutEstimate } from "./InvoidePdfEstimate";
import QrIcon from "/qrIcon.png";

interface Entry {
  product_type?: any;
  purity?: any;
  unit_weight?: number;
  making_charges?: number;
  worker_compensation?: number;
  stone_charges?: number;
  quantity?: number;
  item_price?: number;
  discount?: number;
}

export const InvoiceCreate: React.FC = () => {
  const createInvoiceItems = useCreate();
  const { mutate: createInvoice } = useCreate();
  const [open, setOpen] = useState(false);
  const [invoice, setInvoice] = useState(null);
  const [paymentMode, setPaymentMode] = useState("");
  const [form] = Form.useForm();
  const [showQR, setShowQR] = useState(false);
  const { data: latestInvoice, isLoading } = useList({
    pagination: {
      pageSize: 1,
      current: 1,
    },
    sorters: [
      {
        field: "createdAt",
        order: "desc",
      },
    ],
  });
  const initInvoice = "INV_00001";
  const [invoiceNo, setInvoiceNo] = useState(initInvoice);
  useEffect(() => {
    const id = parseInt(`${latestInvoice?.data[0]?.id || 0}`) + 1;
    setInvoiceNo(`INV_${id.toString().padStart(5, "0")}`);
    form?.setFieldValue("invoice_no", `INV_${id.toString().padStart(5, "0")}`);
    form?.setFieldValue("taxes", [1, 2]);
  }, [latestInvoice]);

  const { data: productData } = useList({
    resource: "producttypes",
    pagination: {
      pageSize: 1000
    },
    meta: {
      populate: ["product", "type"],
    },
  });
  const { data: types } = useList({
    resource: "types",
    pagination: {
      pageSize: 1000
    }
  });

  const productTypes = productData?.data;
  const productOptions = productTypes?.map((item: any) => ({
    value: `${item.id} ${item?.type?.id}`,
    label: `${item?.type?.type} ${item?.product?.name}`,
  }));
  let defaultOption = "";
  let defaultKey = 0;
  let defaultValue = 0;
  let defaultLabel = "";
  if (productTypes) {
    defaultOption = `${productTypes[0]?.id} ${productTypes[0]?.type?.id}`;
    defaultKey = parseInt(`${productTypes[0]?.id}`);
    defaultValue = parseInt(`${productTypes[0]?.type?.id}`);
    defaultLabel = `${productTypes[0]?.type?.type} ${productTypes[0]?.product?.name}`;
  }

  const { selectProps: purityProps } = useSelect({
    resource: "purities",
    optionLabel: "purity_percentage",
    optionValue: "id",
  });
  //console.log(purityProps);
  let defaultPurityKey = 0;
  let defaultPurityLabel = 0;
  const options = purityProps?.options;
  if (purityProps?.options) {
    defaultPurityKey = parseFloat(`${purityProps?.options[0]?.value}`);
    defaultPurityLabel = parseFloat(`${purityProps?.options[0]?.label}`);
  }
  //console.log(defaultPurityKey)

  const { selectProps: taxesProps } = useSelect({
    resource: "taxes",
    optionLabel: "name",
    optionValue: "id",
  });
  const { selectProps: customerProps } = useSelect({
    resource: "customers",
    optionLabel: "name",
    optionValue: "id",
  });
  //console.log(types?.data);

  const [entries, setEntries] = useState<Entry[]>([]);
  const [entry, setEntry] = useState({});
  useEffect(() => {
    setEntry({
      product_type: {
        key: defaultKey,
        value: defaultValue,
        label: defaultLabel,
      },
      unit_weight: 0,
      making_charges: 0,
      worker_compensation: 0,
      stone_charges: 0,
      quantity: 0,
      item_price: 0,
      purity: {
        key: defaultPurityKey,
        value: defaultPurityKey,
        label: defaultPurityLabel,
      },
      discount: 0,
    });
  }, [productData, options]);
  //console.log(entry);

  useEffect(() => {
    setEntries([entry]);
  }, [entry]);

  const handleAddEntry = () => {
    setEntries([
      ...entries,
      {
        product_type: {
          key: defaultKey,
          value: defaultValue,
          label: defaultLabel,
        },
        unit_weight: 0,
        making_charges: 0,
        worker_compensation: 0,
        stone_charges: 0,
        quantity: 0,
        item_price: 0,
        purity: {
          key: defaultPurityKey,
          value: defaultPurityKey,
          label: defaultPurityLabel,
        },
        discount: 0,
      },
    ]);
  };
  const handleRemoveEntry = (index: number) => {
    const updatedEntries = [...entries];
    updatedEntries.splice(index, 1);
    setEntries(updatedEntries);
  };

  const handleFieldChange = (
    value: string | number,
    field: keyof Entry,
    index: number,
    label: string = ""
  ) => {
    const updatedEntries = [...entries];
    if (field === "product_type" && typeof value === "string") {
      const keyString = value.substr(0, value.indexOf(" "));
      const valueString = value.substr(value.indexOf(" ") + 1);
      const key =
        typeof keyString === "string" ? parseInt(keyString) : keyString;
      const Value =
        typeof valueString === "string" ? parseInt(valueString) : valueString;
      updatedEntries[index] = {
        ...updatedEntries[index],
        [field]: {
          key: key,
          value: Value,
          label: label,
        },
      };
    } else if (field === "purity" && typeof value === "string") {
      const updatedValue =
        typeof value === "string" ? parseFloat(value) : value;
      updatedEntries[index] = {
        ...updatedEntries[index],
        [field]: {
          key: updatedValue,
          value: updatedValue,
          label: parseFloat(label),
        },
      };
    } else {
      const regex = /^[+-]?\d*\.?\d*$/;
      if (typeof value === "string" && regex.test(value)){
        const updatedValue = value.charAt(0) === '0' ? value.substring(1) : value;
        updatedEntries[index] = {
          ...updatedEntries[index],
          [field]: updatedValue,
        };
      }
    }
    //console.log(updatedEntries)
    setEntries(updatedEntries);
  };

  const handleOnFinish = async () => {
    const values = form.getFieldValue([]);
    const { invoice_no } = values;
    try {
      createInvoice(
        {
          resource: "invoices",
          values: {
            invoice_no: invoice_no,
            //salesman: `${values.salesman}`,
            taxes: {
              connect: values.taxes,
            },
            customer: {
              connect: [values.customer],
            },
            payment_mode: paymentMode
          },
        },
        {
          onSuccess: (data) => {
            handleCreateInvoiceItems(data.data.data.id);
          },
          onError: (error) => {
            console.log("something went wrong", error);
          },
        }
      );
      console.log("Form submitted successfully");
    } catch (error: any) {
      console.error("Error submitting form:", error.message);
    }
  };
  //console.log(entries);
  const handleCreateInvoiceItems = (invoiceId: number) => {
    try {
      entries.forEach(async (item) => {
        //console.log(invoiceId);
        const units_weight =
          (item?.unit_weight !== undefined ? item?.unit_weight : 0) *
          (item?.quantity !== undefined ? item?.quantity : 0);
        let rate = 0;
        types?.data?.forEach((type) => {
          if (type?.id === item?.product_type?.value) {
            rate = type?.rate;
          }
        });
        const units_price = (rate * units_weight * item?.purity?.label) / 100;
        const wcCharges =
          (units_price *
            (item?.worker_compensation !== undefined
              ? item?.worker_compensation
              : 0)) /
          100;
        const mcCharges =
          units_weight *
          (item?.making_charges !== undefined ? item?.making_charges : 0);

        //TODO: need to confirm discount on which price
        const discount =
          (units_price * (item?.discount !== undefined ? item?.discount : 0)) /
          100;

        const item_price =
          units_price +
          wcCharges +
          mcCharges +
          (item?.stone_charges !== undefined ? item?.stone_charges : 0) -
          discount;
        createInvoiceItems.mutate({
          resource: "invoiceitems",
          values: {
            product_type: parseInt(item?.product_type?.key),
            purity: {
              connect: [parseInt(item?.purity?.key)],
            },
            unit_weight: item?.unit_weight,
            making_charges: item?.making_charges,
            worker_compensation: item?.worker_compensation,
            stone_charges: item?.stone_charges,
            quantity: item?.quantity,
            item_price: item_price,
            rate: rate,
            discount: item?.discount,
            invoice: {
              connect: [invoiceId],
            },
          },
          successNotification: false,
          errorNotification: false,
        });
      });
    } catch (error) {
      console.error("Error creating Invoice Items:", error);
    }
  };

  const handleEstimate = () => {
    console.log(entries);
    setInvoice(form.getFieldValue([]));
    setOpen(true);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  //console.log(invoiceNo,'my caller');

  //console.log(formProps.form?.getFieldValue(['invoice_no']));//

  const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  const handleError = () => {
  }

  const handleScan = (data: any) => {
    if (data){
      setShowQR(false)
    }
    console.log(data);
  }
  return (
    <Create footerButtons={<></>}>
      <Form form={form} onFinish={handleOnFinish} layout="vertical">
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button type="primary" onClick={handleEstimate}>
            Estimate
          </Button>
        </div>
        <Form.Item
          label="Invoice Number"
          name="invoice_no"
          rules={[
            {
              required: true,
              message: "Please enter Invoice Number",
            },
          ]}
        >
          <Input disabled={true} />
        </Form.Item>
        {/* <Form.Item
          label="Salesman"
          name="salesman"
          rules={[
            {
              required: false,
              message: "Please enter Salesman",
            },
          ]}
        >
          <Input value={""}/>
        </Form.Item> */}
        <Form.Item>
          <Table
            dataSource={entries}
            bordered
            size="small"
            scroll={{ x: 1100 }}
            style={{ marginBottom: "0" }}
          >
            <Table.Column
              title="Product"
              dataIndex="product_type"
              key="product_type"
              render={(text, record, index) => (
                <Select
                  showSearch
                  style={{ width: "180px" }}
                  options={productOptions}
                  value={text?.label}
                  filterOption={filterOption}
                  onChange={(value, option: any) => {
                    console.log(option);
                    handleFieldChange(
                      value.toString(),
                      "product_type",
                      index,
                      option?.label
                    );
                  }}
                />
              )}
            />
            {/* <Table.Column
              title="Type"
              dataIndex="types"
              key="types"
              render={(text, record: Entry, index) => (
                <Select
                  {...typeProps}
                  style={{ width: "90px" }}
                  value={text}
                  onChange={(value) =>
                    handleFieldChange(value.toString(), "type", index)
                  }
                />
              )}
            /> */}
            {/* <Table.Column
                        title="HSN"
                        dataIndex="hsn"
                        key="hsn"
                        render={(text, record, index) => (
                            <Input />
                        )}
                    /> */}
            <Table.Column
              title="Qty"
              dataIndex="quantity"
              key="quantity"
              render={(text, record: Entry, index) => (
                <Input
                  value={text || '0'}
                  onChange={(e) => {
                    handleFieldChange(e.target.value, "quantity", index);
                  }}
                />
              )}
            />
            <Table.Column
              title="Unit Weight"
              dataIndex="unit_weight"
              key="unit_weight"
              render={(text, record: Entry, index) => (
                <Input
                  value={text || "0"}
                  onChange={(e) => {
                    handleFieldChange(e.target.value, "unit_weight", index);
                  }}
                />
              )}
            />
            <Table.Column
              title="Purity"
              dataIndex="purity"
              key="purity"
              render={(text, record: Entry, index) => (
                <Select
                  {...purityProps}
                  style={{ width: "90px" }}
                  value={text?.value || defaultPurityKey}
                  onChange={(value, option: any) =>
                    handleFieldChange(
                      value.toString(),
                      "purity",
                      index,
                      option?.label
                    )
                  }
                />
              )}
            />
            <Table.Column
              title="WC(%)"
              dataIndex="worker_compensation"
              key="worker_compensation"
              render={(text, record: Entry, index) => (
                <Input
                  value={text || "0"}
                  onChange={(e) => {
                    handleFieldChange(
                      e.target.value,
                      "worker_compensation",
                      index
                    );
                  }}
                />
              )}
            />
            <Table.Column
              title="MC/gm"
              dataIndex="making_charges"
              key="making_charges"
              render={(text, record: Entry, index) => (
                <Input
                  value={text || "0"}
                  onChange={(e) =>
                    handleFieldChange(e.target.value, "making_charges", index)
                  }
                />
              )}
            />
            <Table.Column
              title="St. Charges"
              dataIndex="stone_charges"
              key="stone_charges"
              render={(text, record: Entry, index) => (
                <Input
                  value={text || "0"}
                  onChange={(e) =>
                    handleFieldChange(e.target.value, "stone_charges", index)
                  }
                />
              )}
            />
            <Table.Column
              title="Discount"
              dataIndex="discount"
              key="discount"
              render={(text, record: Entry, index) => (
                <Input
                  value={text || "0"}
                  onChange={(e) =>
                    handleFieldChange(e.target.value, "discount", index)
                  }
                />
              )}
            />
            {/* <Table.Column
              title="Amount"
              dataIndex="item_price"
              key="item_price"
              render={(text, record: Entry) => (
                <Input
                  value={text || "0"}
                  onChange={(e) =>
                    handleFieldChange(
                      e.target.value,
                      "item_price",
                      record.entryKey
                    )
                  }
                />
              )}
            /> */}
            <Table.Column
              title="Action"
              key="action"
              render={(text, record: Entry, index) => (
                <Button
                  style={{ backgroundColor: "red", color: "white" }}
                  onClick={() => handleRemoveEntry(index)}
                >
                  Remove
                </Button>
              )}
            />
          </Table>
          <Button type="primary" onClick={handleAddEntry}>
            Add Item
          </Button>
        </Form.Item>
        <Form.Item
          label="Taxes"
          name="taxes"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Select {...taxesProps} mode="multiple" style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="Customer"
          name="customer"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...customerProps} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="Payment Mode"
          name="payment_mode"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select style={{ width: "100%" }} onChange={(value) => setPaymentMode(value)}>
            <Select.Option value={"UPI"}>UPI</Select.Option>
            <Select.Option value={"CASH"}>Cash</Select.Option>
            <Select.Option value={"CREDITCARD"}>Credit Card</Select.Option>
            <Select.Option value={"DEBITCARD"}>Debit Card</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
      <Modal
        open={open}
        width={800}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      >
        <PdfLayoutEstimate invoiceitems={entries} invoice={invoice} />
      </Modal>

      {/* <Image
        onClick={() => setShowQR(true)}
        preview={false}
        src={QrIcon}
        alt=""
      />
      <Modal
        title="Scan now"
        open={showQR}
        onCancel={() => setShowQR(false)}
        onOk={() => setShowQR(false)}
        destroyOnClose={true}
      >
        <div
          style={{
            height: "100%",
            width: "100%",
          }}
        >
            <QrReader
              delay={300}
              onError={handleError}
              onScan={handleScan}
              style={{ width: "100%", height: "100%" }}
            />
        </div>
      </Modal> */}
    </Create>
  );
};
