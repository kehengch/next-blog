import Head from "next/head"
import Link from "next/link"
import { getTagsIds, getTagPost } from "../../lib/getPosts"
import styles from "../../styles/tag.module.css"

export default function Tags({ posts }) {
    return (
        <>
            <Head>
                <title>tags - { posts.id }</title>
            </Head>
            <main>
                <div className={styles.taghead}>
                    <h1>
                        { posts.id }
                        <sup className={styles.sup}>tag</sup>
                    </h1>
                </div>
                <div className="stickybg"></div>
                <div className={styles.list}>
                    {
                        posts.posts.map((post, i) => {
                            return (
                                <article key={post.title}>
                                    <h3>
                                        <Link href={`/posts/${posts.paths[i]}`}>
                                            {post.title}
                                        </Link>
                                        <sup className={styles.sup}>{ posts.id }</sup>
                                    </h3>
                                    <p>{post.date}</p>
                                </article>
                            )
                        })
                    }
                </div>
                {/* <pre>
                {
                    JSON.stringify(posts, null, 4)
                }
                </pre> */}
            </main>
        </>
    )
}

export async function getStaticPaths() {
    const tags = getTagsIds();
    return {
        paths: tags,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const posts = getTagPost(params.tag);
    return {
        props: {
            posts
        }
    }
}
