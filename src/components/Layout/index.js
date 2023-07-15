import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Header from "@components/Layout/Header";
import Footer from "@components/Layout/Footer";
import styles from "./styles.module.css";

const Layout = ({ children, logOut }) => {
  const router = useRouter();
  const isOnCommentsPage = router.pathname === "/comments";

  return (
    <>
      <Head>
        <title>Interactive comments section</title>
      </Head>
      <Header isOnCommentsPage={isOnCommentsPage} logOut={logOut} />
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
