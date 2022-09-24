import Head from "next/head";
import React, { ReactElement } from "react";
import styles from '../styles/Layout.module.css'
import { getCookie } from 'cookies-next';
import { GetServerSideProps, GetServerSidePropsContext } from "next";


export interface Props {
  children: ReactElement[],
  loggedIn: boolean,
}
export default function Layout({children, loggedIn}: Props): ReactElement {
  return <div className={styles.container}>
    <main className={styles.main}>
      <header>
        <nav>
          <a href="/">Home</a>
          <a href="/search">Search</a>
          <a href="/login">Login</a>
          {loggedIn && <a href="/profile">Profile</a>}
        </nav>
      </header>
      {children}
    </main>

    <footer className={styles.footer}>
      <a href="https://nextjs.org">Powered by Next.js</a>
    </footer>
  </div>;
}
