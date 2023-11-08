/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createContext, useState } from "react";
import Layout from "./components/layout/Layout";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { UserEntity } from "./api/auth/authType";
import { SnackbarProvider } from "notistack";

interface UserInfo {
  userInfo: UserEntity | null;
  setUserInfo: React.Dispatch<React.SetStateAction<UserEntity | null>>;
}

export const UserContext = createContext<UserInfo | null>(null);

function App() {
  const [userInfo, setUserInfo] = useState<UserEntity | null>(() => {
    if (!sessionStorage.getItem("userInfo")) return null;
    return JSON.parse(sessionStorage.getItem("userInfo")!);
  });

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      <Layout>
        <SnackbarProvider />
        <ScrollRestoration />
        <Outlet />
      </Layout>
    </UserContext.Provider>
  );
}

export default App;
