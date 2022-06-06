import { Box } from "@mui/material";
import Head from "next/head";
import React, { FC, useEffect, useState } from "react";
import { Navbar, Sidebar } from "../ui";
import { Toolbar } from "@mui/material";
import { fontWeight, display } from "@mui/system";
import { IUser } from "../../interfaces";
import UserService from "../../services/UsersService";
import { Loading } from '../ui/Loading';

interface Props {
  title?: string;
  children?: React.ReactNode;
}

export const Layout: FC<Props> = ({ title = "Virtual Doc", children }) => {
  const { getUser } = new UserService();
  const [user, setUser] = useState<IUser>(null);

  const getCurrentUser = async () => {
    const { user } = await getUser();
    setUser(user);
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <Box sx={{ flexFlow: 1 }}>
      {/* {console.log("j")} */}
      <Head>
        <title>{title}</title>
      </Head>

      <Navbar user={user} />

      <Sidebar user={user} />

      <Box sx={{ padding: "10px 20px" }}>{children}</Box>

    </Box>
      
  );
};
