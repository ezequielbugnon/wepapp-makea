import React from "react";
import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";
import styles from "../../login/page.module.css";
import Link from "next/link";

interface Props {
  title: string;
  url: string;
  children: React.ReactNode;
}

export default function CardForm({ title, url, children }: Props) {
  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <div className={styles.containerimg}>
          <Image src="/mueble.jpg" alt="me" width="400" height="400" />
        </div>
        <div className={styles.containerform}>
          <h4>{title}</h4>
          {children}
          <Link href={`/${url}`}> {url} </Link>;
        </div>
      </div>
    </main>
  );
}
