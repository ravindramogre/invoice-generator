import {
  Document,
  Image,
  Page,
  StyleSheet,
  View,
  Text,
  PDFViewer,
} from "@react-pdf/renderer";

export const PdfLayout = ({ record }: any) => {
  
  const trimIndex = record?.createdAt?.indexOf("T");
  const invoiceDate = record?.createdAt?.substring(0, trimIndex);

  const totalItems: any = [];
  let cnt = 0;
  const items = record?.invoiceitems;
  let total_price = 0;
  items?.forEach((element: any) => {
    total_price += element?.item_price;
    totalItems.push(++cnt);
  });

  //TODO grand total calculation
  let grand_total = total_price;
  record?.taxes?.forEach((tax: any) => {
    grand_total += (total_price * tax?.percentage/ 100);
  });
  console.log(grand_total);
  const GT_Before = grand_total;
  grand_total = Math.floor(grand_total);
  const round_off = Math.round((GT_Before - grand_total) * 100) / 100;
  console.log(round_off);

  return (
    <PDFViewer style={styles.viewer}>
      <Document>
        <Page style={styles.page} size="A4" orientation="landscape">
          <View>
            <View style={styles.invoiceTextNumberContainer}>
              <Text>{`GSTIN: GUH123561H123671`}</Text>
              <Text>{`Invoice Id:${record?.id}`}</Text>
            </View>
          </View>
          <View style={styles.dividerLG} />

          <View style={{ marginBottom: "2", paddingBottom: "2" }}>
            <View style={{ textAlign: "center" }}>
              <Text style={{ fontSize: "20" }}>
                PRAKASH BANKERS AND JWELLERS
              </Text>
            </View>
            <View style={{ textAlign: "center" }}>
              <Text style={{ fontSize: "10" }}>
                NO.29/1, HEHRU ROAD, KULLAPPA CIRCLE, KAMAMANAHALLI BANGALORE
              </Text>
            </View>
            <View style={{ textAlign: "center" }}>
              <Text style={{ fontSize: "10" }}>560084, Ph. XXX-XXXX79XX</Text>
            </View>
          </View>

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
                Tax Invoice
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
                  Bill To:
                </Text>
                <Text
                  style={{ fontSize: "10", paddingBottom: "1" }}
                >{`${record?.customer?.name}`}</Text>
                <Text
                  style={{ fontSize: "10", paddingBottom: "1" }}
                >{`${record?.customer?.address_line_1}`}</Text>
                <Text
                  style={{ fontSize: "10", paddingBottom: "1" }}
                >{`${record?.customer?.state}, ${record?.customer?.pincode}`}</Text>
              </div>
              {/* </Text> */}
              {/* <Text style={[styles.tableHeaderItem, { width: "50%" }]}> */}
              <div style={{ display: "block", width: "50%", padding: "2" }}>
                <Text
                  style={{ fontSize: "10", paddingBottom: "1" }}
                >{`Invoice No.: ${record?.invoice_no}`}</Text>
                <Text
                  style={{ fontSize: "10", paddingBottom: "1" }}
                >{`Invoice Dt: ${invoiceDate}`}</Text>
                <Text
                  style={{ fontSize: "10", paddingBottom: "1" }}
                >{`Pay To:  ${record?.salesman}`}</Text>
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
                {items?.map((item: any) => (
                  <Text
                    style={{ fontSize: "10", paddingBottom: "2" }}
                  >{`${item?.producttype?.type?.type} ${item?.producttype?.product?.name}`}</Text>
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
                {items?.map((item: any) => (
                  <Text style={{ fontSize: "10", paddingBottom: "1" }}>
                    {item?.producttype?.hsn}
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
                {items?.map((item: any) => (
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
                {items?.map((item: any) => (
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
                {items?.map((item: any) => (
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
                {items?.map((item: any) => (
                  <Text style={{ fontSize: "10", paddingBottom: "1" }}>
                    {item?.purity?.purity_percentage}
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
                {items?.map((item: any) => (
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
                {items?.map((item: any) => (
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
                {items?.map((item: any) => (
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
                {items?.map((item: any) => (
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
                {items?.map((item: any) => (
                  <Text style={{ fontSize: "10", paddingBottom: "1" }}>
                    {item?.discount}
                  </Text>
                ))}
              </div>
              <div style={{ width: "70%", padding: "2" }}>
                {items?.map((item: any) => (
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
                  <Text style={{ fontSize: "11" }}>Payment Method : G Pay</Text>
                </div>
                <div style={{ justifyContent: "space-between", width: "70%", padding: "2", textAlign: "right" }}>
                  <Text
                    style={styles.footerItems}
                  >
                    {`Taxable Amount:    ${total_price.toFixed(2)}`}
                  </Text>
                  {
                    record?.taxes?.map((tax: any) => (
                      <Text
                      style={styles.footerItems}
                      >
                        {`${tax?.name} @ ${tax?.percentage}       ${(Math.round(total_price * tax?.percentage) / 100)}`}
                      </Text>
                    ))
                  }
                  {/* <Text
                    style={styles.footerItems}
                  >
                    {`${record?.taxes[0]?.name} @ ${record?.taxes[0]?.percentage}       23`}
                  </Text>
                  <Text style={styles.footerItems}>
                    {`${record?.taxes[1]?.name} @ ${record?.taxes[1]?.percentage}:      23`}
                  </Text> */}
                  <Text
                    style={styles.footerItems}
                  >
                    {`Round Off:   ${round_off}`}
                  </Text>
                  <Text
                    style={styles.footerItems}
                  >
                    {`Grand Total   ${grand_total}`}
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
                {`Payable Amount: ${grand_total}`}
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
