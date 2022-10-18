import Head from 'next/head';
import config from "../config";
import styles from "../styles/cate.module.css";
import { getDateCategory } from "../lib/cate";

export default function Category({ categories }) {
    return (
        <>
            <Head>
                <title>{ config.title } - 文章列表</title>
            </Head>
            <min>
                <div className={styles.head}>
                    <h1>Categories</h1>
                </div>
                <div className="stickybg"></div>
                <article>
                    Category
                    <pre>
                        {
                            JSON.stringify(categories, null, 4)
                        }
                    </pre>
                </article>
            </min>
        </>
    )
}
export function getStaticProps() {
    const categories = getDateCategory();
    return {
        props: {
            categories
        }
    }
}
