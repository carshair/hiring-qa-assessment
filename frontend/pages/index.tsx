import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import Layout from '../component/layout'
import { API_URL } from '../constants'
import styles from '../styles/Home.module.css'
import parseJsonResponse from '../utils/parse-json-response'

export interface Props {
  loggedIn: boolean;
}

const Home: NextPage<Props> = ({loggedIn}: Props) => {
  const [homepageContent, setHomepageContent] = useState("");
  const requestPending = useRef(false);
  useEffect(() => {
    const abortController = new AbortController();
    fetch(`${API_URL}/hello`, {
      signal: abortController.signal,
    })
    .then(parseJsonResponse)
    .then(setHomepageContent);
    return () => {
      abortController.abort();
    };
  }, []);
  return <Layout loggedIn={loggedIn}>
      <Head>
        <title>Testing Application</title>
        <meta name="description" content="A (slightly broken) NextJS application for testing" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <h1 className={styles.title}>
          Testing!
        </h1>

        <p className={styles.description}>{homepageContent}</p>
    </Layout>;
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  return {props: {
    loggedIn: !!context.req.cookies.token,
  }};
}

export default Home
