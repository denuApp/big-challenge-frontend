import { NextPage } from "next";
import { Layout } from '../components/layouts';
import NextLink from 'next/link';
import { Link } from '@mui/material';


const HomePage: NextPage = () => {
  return (
    <Layout menuItems={['']} menuItemsGeneral={['']}>
      Go to <NextLink href="/patient/dashboard" passHref>
        <Link>Dashboard</Link>
      </NextLink>
    </Layout>
  );
}

export default HomePage;
