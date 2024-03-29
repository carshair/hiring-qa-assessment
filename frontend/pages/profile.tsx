import { getCookie } from 'cookies-next'
import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FormEvent, useEffect, useState } from 'react'
import Layout from '../component/layout'
import { API_URL } from '../constants'
import styles from '../styles/Search.module.css'
import parseJsonResponse from '../utils/parse-json-response'
const PAGE_SIZE = 20;


export interface Props {
  loggedIn: boolean;
}

async function fetchProfile() {
  return fetch(`${API_URL}/profile`, {
    credentials: "include",
  })
  .then(parseJsonResponse);
}

const Profile: NextPage<Props> = ({loggedIn}: Props) => {
  const token = getCookie('token');
  const router = useRouter();
  useEffect(()=>{
    if(!token) {
      router.push("/");
    } else {
      fetchProfile()
      .then((profile)=>{
        setOwnerId(profile.user.id);
        setNotes(profile.notes);
      });
    }
  }, [token, router]);


  const [ownerId, setOwnerId] = useState();
  const [notes, setNotes] = useState<{
    id: string;
    text: string;
    user: string;
  }[]>([]);
  
  async function submit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.target as HTMLFormElement;
    // Create the note
    await fetch(`${API_URL}/note`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        userId: form.ownerId.value,
        text: form.noteText.value,
      }),
      headers: {
        "Content-Type": "application/json",
      }
    });
    form.noteText.value = "";

    // Fetch the updated profile
    await fetchProfile()
    .then((profile)=>{
      setOwnerId(profile.user.id);
      setNotes(profile.notes);
    });
  }

  return (
    <Layout loggedIn={loggedIn}>
      <Head>
        <title>Profile</title>
        <meta name="description" content="Search notes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className={styles.title}>
        Profile
      </h1>

      <h2>New Public Note</h2>
      <form action="#" onSubmit={submit}>
        <label htmlFor="noteText">Note Content<br/>
        <textarea id="noteText" name="noteText" required maxLength={255} />
        </label><br />
        <input type="hidden" name="ownerId" value={ownerId || ''} />
        <input type="submit" disabled={!ownerId}/>
      </form>

      <h2>Previous Notes</h2>
      <div className={styles.grid}>
        {notes.map(note=>{
          const shortNote = note.text.split('\n')[0].substr(0,255);
          const noteElipsised = shortNote !== note.text;
          return <a key={note.id} href={`/note/${note.id}`} className={styles.card}>
            <h2>Note {`${note.id}`} &rarr;</h2>
            <h4>Owner: {ownerId}</h4>
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

export default Profile;
