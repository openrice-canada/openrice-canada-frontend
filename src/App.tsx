import { Outlet, ScrollRestoration } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import Layout from "./components/layout/Layout";

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
