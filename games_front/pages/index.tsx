import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import IndexHero from '../components/IndexHero';

const Home: NextPage = () => {
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
        <IndexHero />
      </main>
    </div>
    </div>
  );
};

export default Home;

declare global {
    interface Window {
        ethereum?: any;
    }
}