import { getAllPostIds, getPostData } from "../../lib/getPosts";
import styles from "../../styles/posts.module.css";

export default function Posts({ posts }) {
  return (
    <main className={styles.postsmain}>
      <section className={styles.postsinfo}>
        <div className={styles.infocate}>
          <div>Home</div>
          { 
            posts.categories.map(cate => {
              return <div key={cate}>{cate}</div>
            }) 
          }
        </div>
        <div>
          <h1>{posts.title}</h1>
        </div>
      </section>
      <div className={styles.postsinnerbox}>
        <article  className={styles.posts} >
          <div className={styles.postsStickybg}></div>
          <div className={styles.postsbox} dangerouslySetInnerHTML={{
            __html: posts.contentHtml,
            }}></div>

          <hr />
          <section className={styles.poststags}>
            { posts.tags.map(tag => {
              return <span key={tag}><code>{tag}</code></span>
            })}
          </section>
        </article>
        <aside className={styles.postsaside}>
          <div className={styles.postsStickybg}></div>
            aside
            <div>
              {/* toc */}
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
