import Image from "next/image";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import {getSortedPosts} from "../lib/getPosts"; 
import config from "../config";

export default function Home({ front }) {
  return (
    <>
      <Head>
        <title>{ config.title }</title>
      </Head>
      <main className={styles.main}>
        <div className="stickybg"></div>
        <div className={styles.index}>
          <div className={styles.indexleft}>
            <div>
              {
                front.map(item => {
                  return (
                    <article key={item.id} className={styles.articleitem}>
                      <h3>
                        <Link href={'/posts/' + item.id}>{item.title}</Link>
                      </h3>
                      <div>{item.date}</div>
                      <div>
                        <button type="button">
                          <Link href={'/posts/' + item.id}>More</Link>
                        </button>
                      </div>
                    </article>
                  )
                })
              }
            </div>
          </div>
          <div className={styles.indexright}>
            <section className={styles.info}>
              <div className={styles.infologo}>
               <Image src="/img/kartjim.gif" alt="logo" 
                width={140} height={140} />
              </div>
              <h1>Next!</h1>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
export async function getStaticProps() {
  const front = getSortedPosts();
  return {
    props: {
      front
    }
  }
}