import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import Layout from '../component/layout'
import { API_URL } from '../constants'
import styles from '../styles/Search.module.css'
import parseJsonResponse from '../utils/parse-json-response'

export interface Props {
  loggedIn: boolean;
}

const Login: NextPage<Props> = ({loggedIn}: Props) => {
  const router = useRouter();
  const [error, setError] = useState("");
  async function logIn(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.target as HTMLFormElement;
    await fetch(`${API_URL}/login`, {
      method: "POST",
      body: JSON.stringify({
        email: form.email.value,
        password: form.password.value,
      }),
      headers: {
        "Content-Type": "application/json",
      }
    }).then(async response => {
      const login = await parseJsonResponse(response);
      if(login.authenticated) {
        setError("");
        document.cookie = `token=${login.token}`;
        router.push('/');
      } else {
        setError("Your username or password was incorrect. Please try again.");
      }
    });
    return false;
  }
  return (
    <Layout loggedIn={loggedIn}>
      <Head>
        <title>Login</title>
        <meta name="description" content="Log into the site" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className={styles.title}>
        Login
      </h1>

      <p className={styles.description}>
        Log into the site using your credentials. Since this is a test assignment, you can use these credentials:<br />
        * Username: tester@shair.co<br />
        * Password: secure-password-for-assessment<br />
      </p>

      <form action="#" onSubmit={logIn} method="POST">
        <label htmlFor="email">Email<br />
        <input type="email" id="email" name="email" />
        </label><br />
        <label htmlFor="password">Password<br />
        <input type="password" name="password" />
        </label><br />
        {error && <><b>{error}</b><br/></>}
        <label htmlFor="submit">Submit<br />
        <input type="submit" name="submit" />
        </label><br />
      </form>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  return {props: {
    loggedIn: !!context.req.cookies.token,
  }};
}

export default Login;
