import { NextPage } from "next";
import { Layout } from '../components/layouts';
import NextLink from 'next/link';
import { Backdrop, CircularProgress, Link } from '@mui/material';
import { useState, useEffect } from "react";
import { IUser } from "../interfaces";
import UserService from "../services/UsersService";
import { useRouter } from "next/router";
import { Loading } from '../components/ui/Loading';


const HomePage: NextPage = () => {

  const router = useRouter();

  const { getUser } = new UserService();
  const [loading, setLoading] = useState(true);

  const redirect = async () => {
    const {user} = await getUser();

    if (!user) {
      router.push("/auth/login");
    }
    else if(user.role[0].name !== "patient") {
      router.push("/doctor/allSubmissions");
    }
    else{
      router.push("/patient/dashboard");
    }
  }


  useEffect(() => {
    redirect();
  }, []);




  return (
    <Layout >
      <Loading loading={loading} />
    </Layout>
  );
  
}

export default HomePage;
