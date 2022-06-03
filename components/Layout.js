import Head from "next/head";
import Script from "next/dist/client/script";
import Link from "next/dist/client/link";
import HomeStyle from "../styles/Home.module.css";
import { Container } from "@nextui-org/react";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Blend</title>
      </Head>

      <Container>
        <Link href="/">
          <h2 className={HomeStyle.logo}>blend</h2>
        </Link>
        {children}
      </Container>
    </>
  );
};

export default Layout;
