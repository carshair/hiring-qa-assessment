import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import Head from 'next/head'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import Layout from '../component/layout'
import { API_URL } from '../constants'
import styles from '../styles/Search.module.css'
import parseJsonResponse from '../utils/parse-json-response'
const PAGE_SIZE = 20;
export interface Props {
  loggedIn: boolean;
}
const Search: NextPage<Props> = ({loggedIn}: Props) => {
  const [page, setPage] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [searchOwner, setSearchOwner] = useState("");
  const [notes, setNotes] = useState<{
    id: string;
    text: string;
    user: string;
  }[]>([]);

  // No pending request to start
  const requestPending = useRef(false)
  useEffect(()=>{
    const searchEntries = [];
    searchEntries.push(["text", searchText]);
    if(page) {
      searchEntries.push(["skip", PAGE_SIZE * page]);
    }
    if(PAGE_SIZE) {
      searchEntries.push(["size", PAGE_SIZE]);
    }
    if(searchOwner) {
      searchEntries.push(["owner", searchOwner]);
    }
    const abortController = new AbortController();
    const signal = abortController.signal;
    requestPending.current = true;
    fetch(`${API_URL}/search`, {
      signal: signal,
      method: "POST",
      body: JSON.stringify(Object.fromEntries(searchEntries)),
      headers: {
        "Content-Type": "application/json",
      }
    }).then(async response => {
      const notes = await parseJsonResponse(response);
      requestPending.current = false; 
      setNotes(notes);
    }).catch(err => {
      console.error(err);
      // If not aborted and needing response, rethrow
      if(requestPending.current) {
        throw err;
      }
    });
    return ()=>{
      // Aborted request, no more pending request
      requestPending.current = false;
      abortController.abort();
    };
  }, [searchText, searchOwner, page]);
  
  function changeSearch(ev: ChangeEvent<HTMLInputElement>) {
    setPage(0);
    setSearchText(ev.target.value);
  }
  
  function changeOwner(ev: ChangeEvent<HTMLInputElement>) {
    setPage(0);
    setSearchOwner(ev.target.value);
  }

  return (
    <Layout loggedIn={loggedIn}>
      <Head>
        <title>Search</title>
        <meta name="description" content="Search notes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className={styles.title}>
        Search public notes
      </h1>

      <p className={styles.description}>
        Use the API to search public notes
      </p>

      <form action="#" style={{textAlign: "center"}}>
        <label htmlFor="searchText">Search by Text<br/>
        <input type="text" id="searchText" name="searchText" onChange={changeSearch} />
        </label><br />
        <label htmlFor="searchOwner">Search by Owner<br/>
        <input type="text" name="searchOwner" onChange={changeOwner}/>
        </label><br />
      </form>

      <div className={styles.grid}>
        {notes.map(note=>{
          const shortNote = note.text.split('\n')[0].substr(0,255);
          const noteElipsised = shortNote !== note.text;
          return <a key={note.id} href={`/notes/${note.id}`} className={styles.card}>
            <h2>Note {`${note.id}`} &rarr;</h2>
            <h4>Owner: {`${note.user}`}</h4>
            <p>{shortNote}{noteElipsised ? <>&hellip;</> : ''}</p>
          </a>;
        })}
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  return {props: {
    loggedIn: !!context.req.cookies.token,
  }};
}
export default Search;
