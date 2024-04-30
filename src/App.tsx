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
import { CustomerCreate, CustomerEdit, CustomerList, CustomerShow } from "./pages/customer";

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
              name: "invoices",
              list: "/invoices",
              create: "/invoices/create",
              edit: "/invoices/edit/:id",
              show: "/invoices/show/:id",
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
              name: "purities",
              list: "/purities",
              create: "/purities/create",
              edit: "/purities/edit/:id",
              show: "/purities/show/:id",
              meta: {
                label: "Purities",
              },
            },
            {
              name: "taxes",
              list: "/taxes",
              create: "/taxes/create",
              edit: "/taxes/edit/:id",
              show: "/taxes/show/:id",
              meta: {
                label: "Taxes",
              },
            },
            {
              name: "types",
              list: "/types",
              create: "/types/create",
              edit: "/types/edit/:id",
              show: "/types/show/:id",
              meta: {
                label: "Material",
              },
            },
            {
              name: "customers",
              list: "/customers",
              create: "/customers/create",
              edit: "/customers/edit/:id",
              show: "/customers/show/:id",
              meta: {
                label: "Customers",
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
                element={<NavigateToResource resource="invoices" />}
              />
              <Route path="customers">
                <Route index element={<CustomerList />} />
                <Route path="create" element={<CustomerCreate />} />
                <Route path="edit/:id" element={<CustomerEdit />} />
                <Route path="show/:id" element={<CustomerShow />} />
              </Route>
              <Route path="invoices">
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
              <Route path="purities">
                <Route index element={<PurityList />} />
                <Route path="create" element={<PurityCreate />} />
                <Route path="edit/:id" element={<PurityEdit />} />
                <Route path="show/:id" element={<PurityShow />} />
              </Route>
              <Route path="taxes">
                <Route index element={<TaxList />} />
                <Route path="create" element={<TaxCreate />} />
                <Route path="edit/:id" element={<TaxEdit />} />
                <Route path="show/:id" element={<TaxShow />} />
              </Route>
              <Route path="types">
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
