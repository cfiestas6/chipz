import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Hero from '../components/Hero';
import GameGrid from '../components/GameGrid';

const Sports: NextPage = () => {
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

      <main className="container min-h-lvh mx-auto px-4">
        <Hero title="Sport Active Pools" subtitle="Upcoming games" />
        <GameGrid />
      </main>
    </div>
  );
};

export default Sports;

declare global {
    interface Window {
        ethereum?: any;
    }
}