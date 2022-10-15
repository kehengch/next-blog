import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import {getSortedPosts} from "../lib/getPosts"; 

export default function Home({ front }) {
  return (
    <>
      <mian className={styles.main}>
        <article className={styles.article}>
          <Image src="/img/kartjim.gif" alt="" 
            width={140} height={140} 
          />
          <h1>Next!</h1>
          <ul>
            {
              front.map(item => (
                <li key={item.date}>
                  <Link href={`/posts/${item.id}`}>{ item.title }</Link>
                </li>
              ))
            }
          </ul>
          {
            JSON.stringify(front)
          }
        </article>
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