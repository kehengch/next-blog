import Head from "next/head";
import { getTagData } from "../lib/getPosts";
import styles from "../styles/tag.module.css";

export default function Tag({ data }) {
  return (
    <>
      <Head>
        <title>tag</title>
      </Head>
      <main>
        <div className={styles.taghead}>
          <h1>tag</h1>
        </div>
        <div className="stickybg"></div>
        <section className={styles.tagsbox}>
          {data.tags.map((tag) => {
            return (
              <span
                key={tag[0]}
                style={{
                  // FIXME 写一个算法！！
                  fontSize: 14 + tag[1] * 4 + "px",
                }}
              >
                <a
                  href={`/tags/${tag[0]}`}
                  style={{
                    color: `rgba(${125 + tag[1] * 10}, 125, 125)`,
                  }}
                >
                  {tag[0]}
                </a>
              </span>
            );
          })}
        </section>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const data = getTagData();
  return {
    props: {
      data,
    },
  };
}
