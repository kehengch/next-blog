import { getAllPostIds, getPostData } from "../../lib/getPosts";
import styles from "../../styles/posts.module.css";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";

export default function Posts({ posts }) {
  return (
    <>
    <Head>
      <title>{ posts.title }</title>
    </Head>
    <div className="stickybg"></div>
    <main className={styles.postsmain}>
      <section className={styles.postsinfo}>
        <div className={styles.infocate}>
          <div className={styles.catelink}>
            <Link href="/">Home</Link>
          </div>
          {
            typeof posts.categories === 'string' ?
            <div>{posts.categories}</div> : 
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
          <div className={styles.postsbox} dangerouslySetInnerHTML={{
            __html: posts.contentHtml,
            }}></div>
          <hr />
          <section className={styles.poststags}>
            {
              typeof posts.tags === "string" ?
              (<span>
                <code>
                  <Link href={`/tags${posts.tags}`}>{posts.tags}</Link>
                </code>
              </span>) :
              posts.tags.map(tag => {
                return (
                  <span key={tag}>
                    <code>
                      <Link href={`/tags/${tag}`}>{tag}</Link>
                    </code>
                  </span>
                )
              })
            }
          </section>
        </article>
        <aside className={styles.postsaside}>
            <div>
              {/* toc */}
            </div>
            <section className={styles.info}>
              <div className={styles.infologo}>
               <Image src="/img/kartjim.gif" alt="logo" 
                width={140} height={140} />
              </div>
              <h1>Next!</h1>
            </section>
        </aside>
      </div>
    </main>
    </>
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
