import { NextPage } from "next";
import { Layout } from '../components/layouts';
import { Hola } from './auth/Hola';
import NextLink from 'next/link';
import { Link } from '@mui/material';


const HomePage: NextPage = () => {
  return (
    <Layout menuItems={['']} menuItemsGeneral={['']}>
      Go to <NextLink href="/auth/login" passHref>
        <Link>LogIn</Link>
      </NextLink>
    </Layout>
  );
}

export default HomePage;
