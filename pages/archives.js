import Head from "next/head";
import { getDateSortedpostsData } from "../lib/getArchives";
import styles from "../styles/archive.module.css";

export default function Archives({ data }) {
  const getPosts = (posts) => {
    const ans = [];
    for (let post of posts) {
      ans.push(
        <section key={post.year} className={styles.postsyear}>
          <div className={styles.yeartitle}>{post.year}</div>
          <div className={styles.yearposts}>
            {post.data.map((list) => {
              return (
                <a
                  key={list.id}
                  className={styles.items}
                  href={"/posts/" + list.id}
                >
                  <span>{list.date.substring(5, 10)}</span>
                  <span>{list.title}</span>
                </a>
              );
            })}
          </div>
        </section>
      );
    }
    return ans;
  };

  return (
    <>
      <Head>
        <title>存档</title>
      </Head>
      <main>
        <div className={styles.head}>
          <h1>
            所有文章
            <sup className={styles.sup}>{data.nums}</sup>
          </h1>
        </div>
        <div className="stickybg"></div>
        <div className={styles.postbox}>{getPosts(data.posts)}</div>
      </main>
    </>
  );
}
export async function getStaticProps() {
  const data = getDateSortedpostsData();
  return {
    props: {
      data,
    },
  };
}
