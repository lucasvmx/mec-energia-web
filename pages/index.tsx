import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Button } from "@mui/material";
import Header from "../src/components/Header";

const Home: NextPage = () => {
  return (
    <>
      <Header />
    </>
  );
};

export default Home;
