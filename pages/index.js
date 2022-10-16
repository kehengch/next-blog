import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import {getSortedPosts} from "../lib/getPosts"; 

export default function Home({ front }) {
  return (
    <>
      <mian className={styles.main}>
        <div className={styles.Stickybg}></div>
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
      </mian>
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