import { getAllPostIds, getPostData } from "../../lib/getPosts";
import styles from "../../styles/posts.module.css";

export default function Posts({ posts }) {
  return (
    <main className={styles.postsmain}>
      <div className={styles.postsinnerbox}>
        <article  className={styles.postsbox} 
            dangerouslySetInnerHTML={{
            __html: posts.contentHtml,
            }}
        ></article>
        <aside className={styles.postsaside}>
            aside
            <div>
            </div>
        </aside>
      </div>
    </main>
  );
}
export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const posts = await getPostData(params.id);
  return {
    props: {
      posts,
    },
  };
}
