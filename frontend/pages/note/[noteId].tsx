import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import Head from 'next/head'
import Router, { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import Layout from '../../component/layout'
import { API_URL } from '../../constants'
import styles from '../../styles/Home.module.css'
import parseJsonResponse from '../../utils/parse-json-response'

export interface Props {
  loggedIn: boolean;
}

const NoteById: NextPage<Props> = ({loggedIn}: Props) => {
  const router = useRouter();
  const {noteId} = router.query;
  const [note, setNote] = useState<{id: string, text: string}>();
  const requestPending = useRef(false);
  useEffect(() => {
    if(!noteId) {
      return;
    }
    const abortController = new AbortController();
    fetch(`${API_URL}/note/${noteId}`, {
      credentials: "include",
      signal: abortController.signal,
    })
    .then(parseJsonResponse)
    .then(setNote);
    return () => {
      if(requestPending) {
        abortController.abort();
      }
    };
  }, [noteId]);
  return <Layout loggedIn={loggedIn}>
      <Head>
        <title>{`Note ${noteId}`}</title>
        <meta name="description" content="A (broken) NextJS application for testing" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <h1 className={styles.title}>
          Note: {noteId}
        </h1>

        {note ? <p className={styles.description} dangerouslySetInnerHTML={{__html: note?.text || ''}} /> : <></>}
    </Layout>;
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  return {props: {
    loggedIn: !!context.req.cookies.token,
  }};
}

export default NoteById;
