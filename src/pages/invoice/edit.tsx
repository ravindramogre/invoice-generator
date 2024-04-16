import React, { useEffect, useState } from "react";
import { Edit, useForm, useSelect } from "@refinedev/antd";

import { Button, Form, Input, Select, Table, notification } from "antd";
import { useCreate, useDelete, useList, useUpdate } from "@refinedev/core";

// import MDEditor from "@uiw/react-md-editor";

interface Entry {
    id?: any,
    product_type?: {
      key: number, 
      value:number, 
      label:string
    };
    purity?: {key: number, value: number, label: number};
    unit_weight?: number;
    making_charges?: number;
    worker_compensation?: number;
    stone_charges?: number;
    quantity?: number;
    item_price?: number;
    discount?: number;
  }

export const InvoiceEdit = () => {
    const { formProps, saveButtonProps, queryResult } = useForm({
        meta: {
            populate: ["taxes", "invoice_items", "invoice_items.purity", "invoice_items.product_type", 
            "invoice_items.product_type.product",
            "invoice_items.product_type.type", "customer"]
        }
    });
    const postData = queryResult?.data?.data;
    const itemsData = postData?.invoice_items;
    const updateInvoiceItems = useUpdate();
    const updateInvoice = useUpdate();
    const deleteInvoiceItems = useDelete();

    const initialEntries = new Set();
    const createInvoiceItem = useCreate();

    const { data: types }  = useList({
        resource: "producttypes",
    })
    itemsData?.forEach((item: any) => initialEntries.add(parseInt(item?.id)));
    const [entries, setEntries] = useState<Entry[]>([]);
    useEffect(()=>{
        const entry: any= [];
        itemsData?.forEach((item: any) => {
            entry.push({
                id: item?.id,
                product_type: {
                    key: item?.product_type?.id,
                    value: item?.product_type?.type?.id, 
                    label: `${item?.product_type.type?.type} ${item?.product_type?.product?.name}`
                },
                unit_weight: item?.unit_weight,
                making_charges: item?.making_charges,
                worker_compensation: item?.worker_compensation,
                stone_charges: item?.stone_charges,
                quantity: item?.quantity,
                item_price: item?.item_price,
                purity: {
                    key: item?.purity?.id,
                    value: item?.purity?.id,
                    label: item?.purity?.purity_percentage
                },
                discount: item?.discount
            })
        })
        setEntries(entry);
    },[itemsData])

    console.log(initialEntries)
    const taxes = postData?.taxes?.map((tax: any) => (tax?.id));
    //console.log(postData);
    const initialValues = {
        invoice_no: postData?.invoice_no,
        salesman: postData?.salesman,
        taxes: taxes,
        customer: {value: postData?.customer?.id,
            label: postData?.customer?.name},
    }

  const { selectProps: purityProps } = useSelect({
    resource: "productpurities",
    optionLabel: "purity_percentage",
    optionValue: "id",
  });
  let defaultPurityKey = 0;
  let defaultPurityLabel = 0; 
  const options = purityProps?.options;
  if(purityProps?.options){
    defaultPurityKey = parseFloat(`${purityProps?.options[0]?.value}`)
    defaultPurityLabel = parseFloat(`${purityProps?.options[0]?.label}`)
  }
  const { selectProps: taxesProps } = useSelect({
    resource: "producttaxes",
    optionLabel: "name",
    optionValue: "id"
  });
  const { selectProps: customerProps } = useSelect({
    resource: "customers",
    optionLabel: "name",
    optionValue: "id",
  });
  const { data: productData }  = useList({
    resource: "product-types",
    meta: {
        populate: ["product", "type"]
    }
  })

  const productTypes = productData?.data;
  const productOptions = productTypes?.map((item: any) => ({
        value: `${item.id} ${item?.type?.id}`,
        label: `${item?.type?.type} ${item?.product?.name}`,
  })) 
  let defaultOption = "";
  let defaultKey = 0;
  let defaultValue = 0;
  let defaultLabel = "";
  if (productTypes){
    defaultOption = `${productTypes[0]?.id} ${productTypes[0]?.type?.id}`
    defaultKey = parseFloat(`${productTypes[0]?.id}`)
    defaultValue = parseFloat(`${productTypes[0]?.type?.id}`)
    defaultLabel = `${productTypes[0]?.type?.type} ${productTypes[0]?.product?.name}`
  }

    const handleAddEntry = () => {
        setEntries([
          ...entries,
          {
            id: "",
            product_type: { key: defaultKey, value: defaultValue, label: defaultLabel },
            unit_weight: 0,
            making_charges: 0,
            worker_compensation: 0,
            stone_charges: 0,
            quantity: 0,
            item_price: 0,
            purity: { key: defaultPurityKey, value: defaultPurityKey, label: defaultPurityLabel },
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
        label: number = 0
      ) => {
        const updatedEntries = [...entries];
        if (field === "product_type" && typeof value === "string"){
            const keyString = value.substr(0, value.indexOf(" "));
            const valueString = value.substr(value.indexOf(" ") + 1);
            const key = typeof keyString === "string" ? parseInt(keyString) : keyString;
            const Value = typeof valueString === "string" ? parseInt(valueString) : valueString;
            console.log(updatedEntries[index]);
            
            updatedEntries[index] = {
                ...updatedEntries[index],
                [field]: {
                    key: key,
                    value: Value,
                    label: `${key}`
                }
            };
            console.log(updatedEntries);
            
        } else if (field === "purity" && typeof value === "string"){

            const updatedValue = typeof value === "string" ? parseFloat(value) : value;
            updatedEntries[index] = {
                ...updatedEntries[index],
                [field]: {
                    key: updatedValue,
                    value: updatedValue,
                    label: label
                }
            };
        }
        else{
            const updatedValue = typeof value === "string" ? parseFloat(value) : value;
            updatedEntries[index] = {
            ...updatedEntries[index],
            [field]: updatedValue,
            };
        }
        console.log(updatedEntries)
        setEntries(updatedEntries);
      };

      const handleOnFinish = async (values: any) => {
        try {
            //console.log(values);
            const id: any = postData?.id == undefined ? 0 : postData?.id;
            await updateInvoice.mutate({
                resource: "productinvoices",
                id,
                values: {
                    invoice_no: `${values.invoice_no}`,
                    salesman: `${values.salesman}`,
                    taxes: {
                        connect: values?.taxes
                    },
                    customer: {
                        connect: [values?.customer?.value]
                    }
                }
            });
            handleUpdateInvoiceItems(id);
            console.log('Form submitted successfully');
          } catch (error: any) {
            console.error('Error submitting form:', error.message);
          }
      };

      const handleUpdateInvoiceItems = async (invoiceId: number) => {
        try {
          entries.forEach(async (item) => {
            //console.log(invoiceId);
            const id = item?.id;
            const units_weight = (item?.unit_weight !== undefined ? item?.unit_weight : 0) * (item?.quantity !== undefined ? item?.quantity : 0);
            let rate = 0;
            types?.data?.forEach((type) => {
                if(type?.id === item?.product_type?.value){
                    rate = type?.rate;
                }
            })
            const units_price = rate * units_weight * (item?.purity?.label !== undefined ? item?.purity?.label : 0) / 100;
            const wcCharges = units_price * (item?.worker_compensation !== undefined ? item?.worker_compensation : 0) / 100;
            const mcCharges = units_weight * (item?.making_charges !== undefined ? item?.making_charges : 0);
    
            //TODO: need to confirm discount on which price
            const discount = units_price * (item?.discount !== undefined ? item?.discount : 0) / 100;
            const item_price = units_price + wcCharges + mcCharges + (item?.stone_charges !== undefined ? item?.stone_charges : 0) - discount;
            if (initialEntries.has(id)){
              initialEntries.delete(id);
            }
            try {
            await updateInvoiceItems.mutate({
                resource: "productsells", 
                id,
                values: {
                    product_type: {
                        connect: [item?.product_type?.key]
                    },
                    purity: {
                        connect: [item?.purity?.key]
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
                        connect: [invoiceId]
                    }
                },
                errorNotification: false,
                successNotification: false
              },
                {
                    onError: async (error)=>{
                      await createInvoiceItem.mutate({
                        resource: "productsells",
                        values: {
                          product_type: {
                            connect: [item?.product_type?.key]
                        },
                        purity: {
                            connect: [item?.purity?.key]
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
                            connect: [invoiceId]
                        }
                        },
                        errorNotification: false,
                        successNotification: false
                      })
                    },
                    onSuccess:(response)=>{
                    },
                },
            )}catch(error){
              console.log(error);
            }
          });
          if (initialEntries.size !== 0){
              initialEntries?.forEach(async (id: any) => {
                await deleteInvoiceItems.mutate({
                  resource: "productsells",
                  id,
                  errorNotification: false,
                  successNotification: false
                })
              })
          }
        } catch (error) {
          console.error("Error creating Invoice Items:", error);
        }
      };
    // console.log(entries);
  console.log(entries);
    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form {...formProps} onFinish={handleOnFinish} layout="vertical" initialValues={initialValues}>
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
        <Form.Item
          label="Salesman"
          name="salesman"
          rules={[
            {
              required: false,
              message: "Please enter Salesman",
            },
          ]}
        >
          <Input/>
        </Form.Item>
        <Form.Item>
          <Table
            dataSource={entries}
            bordered
            size="small"
            style={{ marginBottom: "0" }}
          >
            <Table.Column
              title="Product"
              dataIndex="product_type"
              key="product_type"
              render={(text, record, index) => (
                <Select
                  style={{ width: "100%"}}
                  defaultValue={`${text?.label}`}
                  options={productOptions}
                  onChange={(value) => {
                    handleFieldChange(
                      value.toString(),
                      "product_type",
                      index 
                    )}
                  }
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
              render={(text, record, index) => (
                <Input
                    style={{width: "max(100%, 50px)"}}
                  value={text || "0"}
                  onChange={(e) => {
                    handleFieldChange(
                      e.target.value,
                      "quantity",
                      index
                    );
                  }}
                />
              )}
            />
            <Table.Column
              title="Unit Weight"
              dataIndex="unit_weight"
              key="unit_weight"
              render={(text, record, index) => (
                <Input
                  value={text || "0"}
                  onChange={(e) => {
                    handleFieldChange(
                      e.target.value,
                      "unit_weight",
                      index
                    );
                  }}
                />
              )}
            />
            <Table.Column
              title="Purity"
              dataIndex="purity"
              key="purity"
              render={(text, record, index) => (
                <Select
                  {...purityProps}
                  style={{ width: "90px" }}
                  defaultValue={text?.label}
                  onChange={(value, option: any) =>{
                    handleFieldChange(
                      value.toString(),
                      "purity",
                      index,
                      parseFloat(option?.label)
                    )}
                  }
                />
              )}
            />
            <Table.Column
              title="WC(%)"
              dataIndex="worker_compensation"
              key="worker_compensation"
              render={(text, record, index) => (
                <Input
                  value={text || "0"}
                  onChange={(e) => {
                    console.log(e.target.value);
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
              render={(text, record, index) => (
                <Input
                  value={text || "0"}
                  onChange={(e) =>
                    handleFieldChange(
                      e.target.value,
                      "making_charges",
                      index
                    )
                  }
                />
              )}
            />
            <Table.Column
              title="St. Charges"
              dataIndex="stone_charges"
              key="stone_charges"
              render={(text, record, index) => (
                <Input
                  value={text || "0"}
                  onChange={(e) =>
                    handleFieldChange(
                      e.target.value,
                      "stone_charges",
                      index
                    )
                  }
                />
              )}
            />
            <Table.Column
              title="Discount"
              dataIndex="discount"
              key="discount"
              render={(text, record, index) => (
                <Input
                  value={text || "0"}
                  onChange={(e) =>
                    handleFieldChange(
                      e.target.value,
                      "discount",
                      index
                    )
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
              render={(text, record, index) => (
                <Button
                  style={{ backgroundColor: "red", color: "white" }}
                  onClick={() => handleRemoveEntry(index)}
                >
                  Remove
                </Button>
              )}
            />
          </Table>
          <Button type="primary" 
            onClick={handleAddEntry}
          >
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
            </Form>
        </Edit>
    );
};

function onFinish(arg0: { invoice_no: string; salesman: string; taxes: { connect: any; }; customer: { connect: any[]; }; }) {
    throw new Error("Function not implemented.");
}
