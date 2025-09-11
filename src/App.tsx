import { Refine, Authenticated  } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbarProvider } from "@refinedev/kbar";

import { useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerProvider, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { dataProvider } from "@refinedev/supabase";
import { App as AntdApp } from "antd";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router";
import authProvider from "./authProvider";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { supabaseClient } from "./utility";
import { SkusList } from "./pages/skus";
import { ThemedLayout, AuthPage } from "@refinedev/antd";
import { SkuCreate } from "./pages/skus/create";


function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <AntdApp>
            <DevtoolsProvider>
              <Refine
                notificationProvider={useNotificationProvider}
                dataProvider={dataProvider(supabaseClient)}
                authProvider={authProvider}
                routerProvider={routerProvider}
                resources={[
                  {
                    name: 'skus',
                    list: '/skus',
                    create: '/skus/create',
                  }
                ]}
                options={{
                  syncWithLocation: true,
                }}
              >
                <Routes>
                  <Route element={
                    <Authenticated fallback={<CatchAllNavigate to="/login" />} key='authenticated'>
                      <ThemedLayout>
                        <Outlet />
                      </ThemedLayout>
                    </Authenticated>
                  }>
                    <Route path="/skus" element={<Outlet />}>
                      <Route index element={<SkusList />}></Route>
                      <Route path="/skus/create" element={<SkuCreate />}></Route>
                    </Route>
                  </Route>
                  {/* Login 、Register、ForgotPassword、UpdatePassword */}
                  <Route element={
                    <Authenticated fallback={<Outlet />} key='authenticated1'>
                      <NavigateToResource />
                    </Authenticated>
                  }>
                    <Route path="/login" element={<AuthPage type="login" />}></Route>
                    <Route path="/register" element={<AuthPage type="register" />}></Route>
                    <Route path="/forgot-password" element={<AuthPage type="forgotPassword" />}></Route>
                    <Route path="/update-passowrd" element={<AuthPage type="updatePassword" />}></Route>
                  </Route>
                </Routes>
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
