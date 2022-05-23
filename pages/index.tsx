import { NextPage } from "next";
import { Layout } from '../components/layouts';
import NextLink from 'next/link';
import { Link } from '@mui/material';


const HomePage: NextPage = () => {
  return (
    <Layout >
      Go to <NextLink href="" passHref>
        <Link>Dashboard</Link>
      </NextLink>
    </Layout>
  );
}

export default HomePage;
