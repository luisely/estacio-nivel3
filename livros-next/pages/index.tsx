import { Inter } from 'next/font/google'
import Head from 'next/head';
import { Menu } from '@/components/Menu';
import styles from '../styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Loja Next</title>
      </Head>

      <Menu paginaAtiva='home' />

      <main className={styles.main}>
        <h1 className={styles.title}>Página Inicial</h1>
      </main>
    </div>
  );
}
