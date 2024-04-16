import { Refine, WelcomePage } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  Layout,
  useNotificationProvider,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerProvider, {
  NavigateToResource,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router-v6";
import { DataProvider } from "@refinedev/strapi-v4";
import { App as AntdApp, ConfigProvider } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { authProvider, axiosInstance } from "./authProvider";
import { API_URL } from "./constants";
import {
  InvoiceCreate,
  InvoiceEdit,
  InvoiceList,
  InvoiceShow,
} from "./pages/invoice";
import { ProductCreate, ProductEdit, ProductList, ProductShow } from "./pages/product";
import { PurityCreate, PurityEdit, PurityList, PurityShow } from "./pages/purity";
import { TaxCreate, TaxEdit, TaxList, TaxShow } from "./pages/tax";
import { TypeCreate, TypeEdit, TypeList, TypeShow } from "./pages/type";

function App() {
  return (
    <ConfigProvider>
      <BrowserRouter>
        <Refine
          dataProvider={DataProvider(API_URL)}
          routerProvider={routerProvider}
          Title={()=><h1 style={{color:'#fff',padding:'0.5rem',textAlign:'center',paddingBottom:'0'}}>Invoice Generator</h1>}
          resources={[
            {
              name: "productinvoices",
              list: "/productinvoices",
              create: "/productinvoices/create",
              edit: "/productinvoices/edit/:id",
              show: "/productinvoices/show/:id",
              meta: {
                label: "Invoices",
              },
            },
            {
              name: "products",
              list: "/products",
              create: "/products/create",
              edit: "/products/edit/:id",
              show: "/products/show/:id",
            },
            {
              name: "productpurities",
              list: "/productpurities",
              create: "/productpurities/create",
              edit: "/productpurities/edit/:id",
              show: "/productpurities/show/:id",
              meta: {
                label: "Purities",
              },
            },
            {
              name: "producttaxes",
              list: "/producttaxes",
              create: "/producttaxes/create",
              edit: "/producttaxes/edit/:id",
              show: "/producttaxes/show/:id",
              meta: {
                label: "Taxes",
              },
            },
            {
              name: "producttypes",
              list: "/producttypes",
              create: "/producttypes/create",
              edit: "/producttypes/edit/:id",
              show: "/producttypes/show/:id",
              meta: {
                label: "Material",
              },
            },
          ]}
          notificationProvider={useNotificationProvider}
          options={{
            warnWhenUnsavedChanges: true,
            syncWithLocation: true,
          }}
        >
          <Routes>
            <Route
              element={
                <Layout>
                  <Outlet />
                </Layout>
              }
            >
              <Route
                index
                element={<NavigateToResource resource="productinvoices" />}
              />

              <Route path="productinvoices">
                <Route index element={<InvoiceList />} />
                <Route path="create" element={<InvoiceCreate />} />
                <Route path="edit/:id" element={<InvoiceEdit />} />
                <Route path="show/:id" element={<InvoiceShow />} />
              </Route>
              <Route path="products">
                <Route index element={<ProductList />} />
                <Route path="create" element={<ProductCreate />} />
                <Route path="edit/:id" element={<ProductEdit />} />
                <Route path="show/:id" element={<ProductShow />} />
              </Route>
              <Route path="productpurities">
                <Route index element={<PurityList />} />
                <Route path="create" element={<PurityCreate />} />
                <Route path="edit/:id" element={<PurityEdit />} />
                <Route path="show/:id" element={<PurityShow />} />
              </Route>
              <Route path="producttaxes">
                <Route index element={<TaxList />} />
                <Route path="create" element={<TaxCreate />} />
                <Route path="edit/:id" element={<TaxEdit />} />
                <Route path="show/:id" element={<TaxShow />} />
              </Route>
              <Route path="producttypes">
                <Route index element={<TypeList />} />
                <Route path="create" element={<TypeCreate />} />
                <Route path="edit/:id" element={<TypeEdit />} />
                <Route path="show/:id" element={<TypeShow />} />
              </Route>
              <Route path="*" element={<ErrorComponent />} />
            </Route>
          </Routes>
          {/* <UnsavedChangesNotifier />
            <DocumentTitleHandler /> */}
        </Refine>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
