import { getAllPostIds, getPostData } from "../../lib/getPosts";
import styles from "../../styles/posts.module.css";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Posts({ posts }) {
  const content = useRef();
  const [toc, setToc] = useState([]);

  useEffect(() => {
    // toc: h2\h3\h4
    const headings = content.current.querySelectorAll("h2, h3, h4");
    const strs = [];
    headings.forEach(heading => {
      // scrollTop
      if(heading.tagName == "H2") {
        strs.push([heading.id, []])
      }
      if(heading.tagName == "H3") {
        strs[strs.length - 1][1].push([heading.id, []])
      }
      if(heading.tagName == "H4") {
        const t = strs[strs.length - 1][1];
        t[t.length - 1][1].push(heading.id)
      }
    })
    setToc(strs);
  }, [content])

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
          <div ref={content} className={styles.postsbox} dangerouslySetInnerHTML={{
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
            <section className={styles.info}>
              <div className={styles.infologo}>
               <Image src="/img/kartjim.gif" alt="logo" 
                width={140} height={140} />
              </div>
              <h1>Next!</h1>
            </section>
            <section className={styles.tocbox}>
              {/* toc */}
              <ul>
                {
                  toc.map(h2 => {
                    return (
                      <li key={h2[0]}>
                        <a href={'#' + h2[0]}>{h2[0]}</a>
                        {
                          h2[1].length ? (
                            <ul>
                              {
                                h2[1].map(h3 => {
                                  return (
                                    <li key={h3[0]}>
                                      <a href={'#' + h3[0]}>{h3[0]}</a>
                                      {
                                        h3[1].length ? (
                                          <ul>
                                            {
                                              h3[1].map(h4 => {
                                                return (
                                                  <li key={h4}>
                                                    <a href={'#' + h4}>{h4}</a>
                                                  </li>
                                                )
                                              })
                                            }
                                          </ul>
                                        ) : ''
                                      }
                                    </li>
                                  )
                                })
                              }
                            </ul>
                          ) : ''
                        }
                      </li>
                    )
                  })
                  // console.log(toc)
                }
              </ul>
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
