import React from "react";
import Head from "next/head";
import Footer from "@components/Footer";
import Image from "next/image";
import headerIcon from "@icons/favicon-32x32.png";
import styles from "./styles.module.css";

const Layout = ({ children }) => (
  <>
    <Head>
      <title>Interactive comments section</title>
    </Head>
    <header className={styles.header}>
      <Image src={headerIcon} width={50} height={50} />
    </header>
    <main className={styles.main}>{children}</main>
    <Footer />
  </>
);

export default Layout;
