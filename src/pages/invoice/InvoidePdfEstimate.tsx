import {
  Document,
  Image,
  Page,
  StyleSheet,
  View,
  Text,
  PDFViewer,
} from "@react-pdf/renderer";
import QRImage from "/qrambika.png";
import AaiMataImage from "/jagdambamata.jpg";
import BIS from "/bis.jpeg";
import { useMany, useOne, useList } from "@refinedev/core";
import Converter from 'number-to-words';

export const PdfLayoutEstimate = ({ invoiceitems, invoice }: any) => {
  const { data: Taxes, isLoading: taxLoading } = useMany({
    resource: "taxes",
    ids: invoice?.taxes ? invoice?.taxes : [0],
  });
  const { data: Customer, isLoading: customerLoading } = useOne({
    resource: "customers",
    id: invoice?.customer ? invoice?.customer : [0],
  });
  const { data: Types, isLoading: typeLoading } = useList({
    resource: "types",
  });
  const { data: Products, isLoading: productLoading } = useList({
    resource: "products",
  });
  if (customerLoading || taxLoading || typeLoading || productLoading) {
    return <p>Loading...</p>;
  }

  console.log(invoice);
  let date = new Date();
  const invoiceDate =
    date.getFullYear() +
    "-" +
    date.getMonth().toString().padStart(2, "0") +
    "-" +
    date.getDate().toString().padStart(2, "0");

  invoiceitems = invoiceitems?.map((item: any) => {
    var hsn;
    const units_weight =
      (item?.unit_weight !== undefined ? item?.unit_weight : 0) *
      (item?.quantity !== undefined ? item?.quantity : 0);
    let rate = 0;
    Types?.data?.forEach((type) => {
      if (type?.id === item?.product_type?.value) {
        rate = type?.rate;
        hsn = type?.hsn;
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
      (units_price * (item?.discount !== undefined ? item?.discount : 0)) / 100;

    const item_price =
      units_price +
      wcCharges +
      mcCharges +
      (item?.stone_charges !== undefined ? item?.stone_charges : 0) -
      discount;
    return { ...item, hsn: hsn, rate: rate, item_price: item_price };
  });
  const totalItems: any = [];
  let cnt = 0;
  let total_price = 0;
  invoiceitems?.forEach((element: any) => {
    total_price += element?.item_price;
    totalItems.push(++cnt);
  });

  //TODO grand total calculation
  let grand_total = total_price;
  Taxes?.data?.forEach((tax: any) => {
    grand_total += (total_price * tax?.percentage) / 100;
  });
  const GT_Before = grand_total;
  grand_total = Math.floor(grand_total);
  const round_off = Math.round((GT_Before - grand_total) * 100) / 100;


  let converted = Converter.toWords(grand_total);
  let words = converted.split(' ');
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
  }
  converted = words.join(' ');
  converted = "Rupees " + words.join(' ') + " Only.";

  return (
    <PDFViewer style={styles.viewer}>
      <Document>
        <Page style={styles.page} size="A4" orientation="landscape">
          <View>
            <View style={styles.invoiceTextNumberContainer}>
              <Text>{`GSTIN: 29AHOPK1389F1ZX`}</Text>
              {/* <Text>{`Invoice Id:${record?.id}`}</Text> */}
            </View>
          </View>
          <View style={styles.dividerLG} />

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "30px",
              marginLeft: "60px",
            }}
          >
            <View>
              <Image style={{ height: "50", width: "50" }} src={AaiMataImage} />
            </View>
            <View>
              <View
                style={{
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: "25" }}>
                  AMBIKA JEWELLERS AND BANKERS
                </Text>
              </View>
              <View
                style={{
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: "12" }}>
                  NO.27, KULLAPPA CIRCLE, NEHRU ROAD, KAMANAHALLI, BANGALORE
                </Text>
              </View>
              <View
                style={{
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: "12" }}>560084, Ph. 9449987873, 9738500095</Text>
              </View>
            </View>
            <View>
              <Image style={{ height: "50", width: "50" }} src={QRImage} />
            </View>
            <View>
              <Image style={{ height: "60", width: "70" }} src={BIS} />
            </View>
          </div>
          <View style={styles.table}>
            <View
              style={[
                styles.tableHeader,
                { height: "20", textAlign: "center" },
              ]}
            >
              <Text
                style={[
                  styles.tableHeaderItem,
                  { width: "100%", padding: "0", marginTop: "6" },
                ]}
              >
                Estimate
              </Text>
            </View>
            <View
              style={[
                styles.tableHeader,
                {
                  height: "70",
                  padding: "0",
                  margin: "0",
                  border: "1px solid black",
                  borderBottom: "none",
                },
              ]}
            >
              {/* <Text style={[styles.tableHeaderItem, {width: "50%"}]}> */}
              <div
                style={{
                  display: "block",
                  width: "50%",
                  padding: "2",
                  borderRight: "1px solid black",
                }}
              >
                <Text
                  style={[
                    styles.textBold,
                    { fontSize: "10", paddingBottom: "1" },
                  ]}
                >
                  Customer Details:
                </Text>
                <Text
                  style={{ fontSize: "10", paddingBottom: "1" }}
                >{`${Customer?.data?.name}`}</Text>
                <Text
                  style={{ fontSize: "10", paddingBottom: "1" }}
                >{`${Customer?.data?.address_line_1}`}</Text>
                <Text
                  style={{ fontSize: "10", paddingBottom: "1" }}
                >{`${Customer?.data?.state}, ${Customer?.data?.pincode}`}</Text>
              </div>
              {/* </Text> */}
              {/* <Text style={[styles.tableHeaderItem, { width: "50%" }]}> */}
              <div style={{ display: "block", width: "50%", padding: "2" }}>
                {/* <Text
                  style={{ fontSize: "10", paddingBottom: "1" }}
                >{`Invoice No.: ${record?.invoice_no}`}</Text> */}
                <Text
                  style={{ fontSize: "10", paddingBottom: "1" }}
                >{`Estimate Date: ${invoiceDate}`}</Text>
                {/* <Text
                    style={{ fontSize: "10", paddingBottom: "1" }}
                  >{`Pay To:  ${record?.salesman}`}</Text> */}
              </div>
              {/* </Text> */}
            </View>
            <View
              style={[
                styles.tableHeader,
                {
                  height: "20",
                  padding: "0",
                  margin: "0",
                  border: "1px solid black",
                  borderBottom: "none",
                },
              ]}
            >
              <div
                style={{
                  display: "block",
                  width: "25%",
                  padding: "2",
                  borderRight: "1px solid black",
                }}
              >
                <Text style={{ fontSize: "10", paddingBottom: "1" }}>SI</Text>
              </div>
              <div
                style={{
                  display: "block",
                  width: "90%",
                  padding: "2",
                  borderRight: "1px solid black",
                }}
              >
                <Text style={{ fontSize: "10", paddingBottom: "1" }}>
                  Product
                </Text>
              </div>
              <div
                style={{
                  display: "block",
                  width: "50%",
                  padding: "2",
                  borderRight: "1px solid black",
                }}
              >
                <Text style={{ fontSize: "10", paddingBottom: "1" }}>HSN</Text>
              </div>
              <div
                style={{
                  display: "block",
                  width: "30%",
                  padding: "2",
                  borderRight: "1px solid black",
                }}
              >
                <Text style={{ fontSize: "10", paddingBottom: "1" }}>Qty.</Text>
              </div>
              <div
                style={{
                  display: "block",
                  width: "50%",
                  padding: "2",
                  borderRight: "1px solid black",
                }}
              >
                <Text style={{ fontSize: "10", paddingBottom: "1" }}>
                  G.W.(gms)
                </Text>
              </div>
              <div
                style={{
                  display: "block",
                  width: "50%",
                  padding: "2",
                  borderRight: "1px solid black",
                }}
              >
                <Text style={{ fontSize: "10", paddingBottom: "1" }}>
                  Nett(gms)
                </Text>
              </div>
              <div
                style={{
                  display: "block",
                  width: "50%",
                  padding: "2",
                  borderRight: "1px solid black",
                }}
              >
                <Text style={{ fontSize: "10", paddingBottom: "1" }}>
                  Purity
                </Text>
              </div>
              <div
                style={{
                  display: "block",
                  width: "50%",
                  padding: "2",
                  borderRight: "1px solid black",
                }}
              >
                <Text style={{ fontSize: "10", paddingBottom: "1" }}>WC%</Text>
              </div>
              <div
                style={{
                  display: "block",
                  width: "50%",
                  padding: "2",
                  borderRight: "1px solid black",
                }}
              >
                <Text style={{ fontSize: "10", paddingBottom: "1" }}>
                  MC/gm
                </Text>
              </div>
              <div
                style={{
                  display: "block",
                  width: "50%",
                  padding: "2",
                  borderRight: "1px solid black",
                }}
              >
                <Text style={{ fontSize: "10", paddingBottom: "1" }}>
                  St. Charges
                </Text>
              </div>
              <div
                style={{
                  width: "50%",
                  padding: "2",
                  borderRight: "1px solid black",
                }}
              >
                <Text style={{ fontSize: "10", paddingBottom: "1" }}>Rate</Text>
              </div>
              <div
                style={{
                  width: "50%",
                  padding: "2",
                  borderRight: "1px solid black",
                }}
              >
                <Text style={{ fontSize: "10", paddingBottom: "1" }}>
                  Dis.(%)
                </Text>
              </div>
              <div style={{ width: "70%", padding: "2" }}>
                <Text style={{ fontSize: "10", paddingBottom: "1" }}>
                  Amount
                </Text>
              </div>
            </View>
            <View
              style={[
                styles.tableHeader,
                {
                  height: "130",
                  padding: "0",
                  margin: "0",
                  border: "1px solid black",
                  borderBottom: "none",
                },
              ]}
            >
              <div
                style={{
                  display: "block",
                  width: "25%",
                  padding: "2",
                  borderRight: "1px solid black",
                }}
              >
                {totalItems?.map((cnt: any) => (
                  <Text style={{ fontSize: "10", paddingBottom: "2" }}>
                    {cnt}
                  </Text>
                ))}
              </div>
              <div
                style={{
                  display: "block",
                  width: "90%",
                  padding: "2",
                  borderRight: "1px solid black",
                }}
              >
                {invoiceitems?.map((item: any) => (
                  <Text
                    style={{ fontSize: "10", paddingBottom: "2" }}
                  >{`${item?.product_type?.label}`}</Text>
                ))}
              </div>
              <div
                style={{
                  display: "block",
                  width: "50%",
                  padding: "2",
                  borderRight: "1px solid black",
                }}
              >
                {invoiceitems?.map((item: any) => (
                  <Text style={{ fontSize: "10", paddingBottom: "1" }}>
                    {item?.hsn}
                  </Text>
                ))}
              </div>
              <div
                style={{
                  display: "block",
                  width: "30%",
                  padding: "2",
                  borderRight: "1px solid black",
                }}
              >
                {invoiceitems?.map((item: any) => (
                  <Text style={{ fontSize: "10", paddingBottom: "1" }}>
                    {item?.quantity}
                  </Text>
                ))}
              </div>
              <div
                style={{
                  display: "block",
                  width: "50%",
                  padding: "2",
                  borderRight: "1px solid black",
                }}
              >
                {invoiceitems?.map((item: any) => (
                  <Text style={{ fontSize: "10", paddingBottom: "1" }}>
                    {item?.unit_weight * item?.quantity}
                  </Text>
                ))}
              </div>
              <div
                style={{
                  display: "block",
                  width: "50%",
                  padding: "2",
                  borderRight: "1px solid black",
                }}
              >
                {invoiceitems?.map((item: any) => (
                  <Text style={{ fontSize: "10", paddingBottom: "1" }}>
                    {item?.unit_weight * item?.quantity}
                  </Text>
                ))}
              </div>
              <div
                style={{
                  display: "block",
                  width: "50%",
                  padding: "2",
                  borderRight: "1px solid black",
                }}
              >
                {invoiceitems?.map((item: any) => (
                  <Text style={{ fontSize: "10", paddingBottom: "1" }}>
                    {item?.purity?.label}
                  </Text>
                ))}
              </div>
              <div
                style={{
                  display: "block",
                  width: "50%",
                  padding: "2",
                  borderRight: "1px solid black",
                }}
              >
                {invoiceitems?.map((item: any) => (
                  <Text style={{ fontSize: "10", paddingBottom: "1" }}>
                    {item?.worker_compensation}
                  </Text>
                ))}
              </div>
              <div
                style={{
                  display: "block",
                  width: "50%",
                  padding: "2",
                  borderRight: "1px solid black",
                }}
              >
                {invoiceitems?.map((item: any) => (
                  <Text style={{ fontSize: "10", paddingBottom: "1" }}>
                    {item?.making_charges}
                  </Text>
                ))}
              </div>
              <div
                style={{
                  display: "block",
                  width: "50%",
                  padding: "2",
                  borderRight: "1px solid black",
                }}
              >
                {invoiceitems?.map((item: any) => (
                  <Text style={{ fontSize: "10", paddingBottom: "1" }}>
                    {item?.stone_charges}
                  </Text>
                ))}
              </div>
              <div
                style={{
                  width: "50%",
                  padding: "2",
                  borderRight: "1px solid black",
                }}
              >
                {invoiceitems?.map((item: any) => (
                  <Text style={{ fontSize: "10", paddingBottom: "1" }}>
                    {item?.rate}
                  </Text>
                ))}
              </div>
              <div
                style={{
                  width: "50%",
                  padding: "2",
                  borderRight: "1px solid black",
                }}
              >
                {invoiceitems?.map((item: any) => (
                  <Text style={{ fontSize: "10", paddingBottom: "1" }}>
                    {item?.discount}
                  </Text>
                ))}
              </div>
              <div style={{ width: "70%", padding: "2" }}>
                {invoiceitems?.map((item: any) => (
                  <Text style={{ fontSize: "10", paddingBottom: "1" }}>
                    {item?.item_price?.toFixed(2)}
                  </Text>
                ))}
              </div>
            </View>
            <View
              style={[
                styles.tableHeader,
                {
                  height: "18",
                  padding: "0",
                  margin: "0",
                  border: "1px solid black",
                  borderBottom: "none",
                },
              ]}
            >
              <div
                style={{ width: "89.7%", padding: "2", textAlign: "center" }}
              >
                <Text style={{ fontSize: "10", paddingBottom: "1" }}>
                  Total Amount:
                </Text>
              </div>
              <div style={{ width: "10.3%", padding: "2" }}>
                <Text style={{ fontSize: "10", paddingBottom: "1" }}>
                  {total_price.toFixed(2)}
                </Text>
              </div>
            </View>
            <View
              style={[
                styles.tableHeader,
                {
                  height: "90",
                  padding: "0",
                  margin: "0",
                  paddingTop: "4",
                  border: "1px solid black",
                  borderBottom: "none"
                },
              ]}
            >
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div
                  style={{
                    width: "30%",
                    paddingLeft: "25",
                    textAlign: "left",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontSize: "11" }}>Payment Method : {invoice?.payment_mode}</Text>
                </div>
                <div
                  style={{
                    justifyContent: "space-between",
                    width: "70%",
                    padding: "2",
                    textAlign: "right",
                  }}
                >
                  <Text style={styles.footerItems}>
                    {`Taxable Amount:    ${total_price.toFixed(2)}`}
                  </Text>
                  {Taxes?.data?.map((tax: any) => (
                    <Text style={styles.footerItems}>
                      {`${tax?.name} @ ${tax?.percentage}       ${
                        Math.round(total_price * tax?.percentage) / 100
                      }`}
                    </Text>
                  ))}
                  {/* <Text
                      style={styles.footerItems}
                    >
                      {`${record?.taxes[0]?.name} @ ${record?.taxes[0]?.percentage}       23`}
                    </Text>
                    <Text style={styles.footerItems}>
                      {`${record?.taxes[1]?.name} @ ${record?.taxes[1]?.percentage}:      23`}
                    </Text> */}
                  <Text style={styles.footerItems}>
                    {`Round Off:   ${round_off}`}
                  </Text>
                  <Text style={styles.footerItems}>
                    {`Grand Total   ${grand_total + '.00'}`}
                  </Text>
                </div>
              </div>
              {/* <div style={{ width: "10.3%", padding: "2" }}>
                  <Text style={{ fontSize: "10", paddingBottom: "12" , paddingRight: "20"}}>
                    {record?.total_price}
                  </Text>
                  <Text style={{ fontSize: "10", paddingBottom: "4" , paddingRight: "20"}}>
                    {record?.total_price * record?.taxes[0]?.percentage / 100}
                  </Text>
                  <Text style={{ fontSize: "10", paddingBottom: "4" , paddingRight: "20"}}>
                    {record?.total_price * record?.taxes[1]?.percentage / 100}
                  </Text>
                  <Text style={{ fontSize: "10", paddingBottom: "4" , paddingRight: "20"}}>
                    {round_off}
                  </Text>
                  <Text style={{ fontSize: "10", paddingBottom: "4" , paddingRight: "20"}}>
                   {record?.total_price * (record?.taxes[0]?.percentage + record?.taxes[1]?.percentage) / 100}
                  </Text>
                </div> */}
            </View>
            <View
              style={[
                styles.tableHeader,
                {
                  padding: "0",
                  paddingLeft: "10",
                  paddingTop: "2",
                  paddingBottom: "2",
                  margin: "0",
                  border: "1px solid black",
                },
              ]}
            ><Text style={{fontSize: '11'}}>{converted}</Text></View>
          </View>

          <View style={styles.signatureTotalContainer}>
            <View style={styles.signatureContainer}>
              <Text style={styles.signatureText}>
                {`Owner's Signature:
  
  
                    ________________`}
              </Text>
            </View>
            <View style={styles.signatureContainer}>
              <Text style={styles.signatureText}>
                {`Customer Signature:
  
  
                    ________________`}
              </Text>
            </View>
            <View style={styles.totalContainer}>
              <Text style={[styles.totalText, { fontSize: "11" }]}>
                {`Payable Amount: ${grand_total + '.00'}`}
              </Text>
              {/* <Text style={styles.totalText}>
                  Total($):
                  {subtotal +
                    (subtotal * (record?.taxes[0].name)) / 100 -
                    (subtotal * (record?.discount)) / 100}
                </Text> */}
            </View>
          </View>
          <View style={styles.footer}>
            {/* <Text style={styles.footerText}>{record?.company.city}</Text>
              <Text style={styles.footerText}>
                {record?.company.address}, {record?.company.country}
              </Text> */}
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

const styles = StyleSheet.create({
  viewer: {
    paddingTop: 32,
    width: "100%",
    height: "80vh",
    border: "none",
  },
  page: {
    display: "flex",
    padding: "0.2in 0.4in",
    fontSize: 12,
    color: "#333",
    backgroundColor: "#fff",
  },
  textBold: {
    fontWeight: "bold",
  },
  invoiceTextNumberContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  invoiceText: {
    color: "#3aabf0",
  },
  invoiceId: {
    textAlign: "center",
  },
  invoiceForFromContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  invoiceForFromTitle: {
    marginBottom: 24,
  },
  invoiceFor: {
    flex: 1.5,
  },
  invoiceFrom: {
    flex: 1,
  },

  footerItems: {
    fontSize: "10",
    paddingBottom: "4",
    paddingRight: "20",
  },
  invoiceForFromText: {
    color: "#787878",
    lineHeight: 1.5,
  },
  dividerSM: {
    width: "100%",
    height: 1,
    marginTop: 12,
    marginBottom: 12,
    backgroundColor: "#e5e5e5",
  },
  dividerLG: {
    width: "100%",
    height: 1,
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: "#e5e5e5",
  },
  table: {
    marginTop: 8,
  },
  tableHeader: {
    display: "flex",
    flexDirection: "row",
    //textAlign: "center",
  },
  tableHeaderItem: {
    paddingVertical: 8,
    border: "1px solid #000",
    borderBottom: "none",
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
  },
  tableCol: {
    paddingVertical: 8,
    paddingHorizontal: 4,
    border: "1px solid #000",
  },
  signatureTotalContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    paddingLeft: 10,
    paddingRight: 10,
  },
  signatureContainer: {},
  totalContainer: {},
  signatureText: {
    marginTop: 17,
    fontSize: "11",
  },
  totalText: {
    marginTop: 10,
    fontSize: "11",
  },
  footer: {
    borderTop: "1px solid #e5e5e5",
    paddingTop: 8,
    marginTop: "auto",
  },
  footerText: {
    color: "#787878",
    lineHeight: 1.5,
  },
});
