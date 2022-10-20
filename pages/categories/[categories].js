import Head from "next/head"
import Link from "next/link"
import config from "../../config"
import { getCateIds, getCatePost } from "../../lib/cate"
import styles from "../../styles/cate.module.css"

export default function Categories({ cate }) {
    return (
        <>
            <Head>
                <title>{ config.title} - {cate.categories}</title>
            </Head>
            <main>
                <div className={styles.head}>
                    <h1>
                        { cate.categories }
                        <sup className={styles.sup}>category</sup>
                    </h1>
                </div>
                <div className="stickybg"></div>
                <div className={styles.posts}>
                    {
                        cate.posts.map(post => {
                            return (
                                <article key={post.title}>
                                    <h2>
                                        <Link href={'/posts/' + post.id}>{post.title}</Link>
                                        <sup className={styles.sup}>{ cate.categories }</sup>
                                    </h2>
                                    <div>{post.date}</div>
                                    <div>
                                        {
                                            typeof post.tags === 'string' ? 
                                            <span className={styles.tag}><Link href={'/tags/' + post.tags}>{post.tags}</Link></span> :
                                            post.tags.map(tag => {
                                                return (
                                                    <span key={tag} className={styles.tag}>
                                                        <Link href={'/tags/' + tag}>{tag}</Link>
                                                    </span>
                                                )
                                            })
                                        }
                                    </div>
                                </article>
                            )
                        })
                    }
                </div>
            </main>
        </>
    )
}

export async function getStaticPaths() {
    const id = getCateIds();
    console.log(id)
    return {
        paths: id,
        fallback: false
    }
}
export async function getStaticProps({ params }) {
    const cate = getCatePost(params.categories);
    return {
        props: {
            cate
        }
    }
}


