import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Hero from '../components/Hero';
import Grid from '../components/Grid';
import PoolDashboard from '../components/PoolDashboard';
import { useAccount } from 'wagmi';

const Home: NextPage = () => {
  const { isConnected, address } = useAccount();

  return (
    <div className={styles.container}>
      <Head>
        <meta
          content="chipz"
          name="chipz"
        />
        <link href="/static/logo.svg" rel="icon" />
        <title>chipz</title>
      </Head>

      <div>
      <main className="container min-h-lvh mx-auto px-4">
        <Hero title="Pool Admin Dashboard" subtitle={"Welcome " + address} />
        <PoolDashboard />
      </main>
    </div>
    </div>
  );
};

export default Home;
