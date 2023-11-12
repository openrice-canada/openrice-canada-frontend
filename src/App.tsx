import Layout from "./components/layout/Layout";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <Layout>
      <SnackbarProvider />
      <ScrollRestoration />
      <Outlet />
    </Layout>
  );
}

export default App;
