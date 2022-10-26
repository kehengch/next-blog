import Head from "next/head";
import Link from "next/link";
import config from "../config";
import styles from "../styles/cate.module.css";
import { getCategory } from "../lib/cate";

export default function Category({ categories }) {
  // 递归数据，生成节点
  const allcategory = (obj, depth = 1) => {
    if (!obj) return "";

    const ans = [];
    for (const cate in obj) {
      const id = obj[cate].id;
      ans.push(
        <div
          className={styles["cate" + depth]}
          style={{
            paddingLeft: "20px",
          }}
        >
          <div className={styles.catetitle}>&#128214; {cate}</div>
          <div className={styles.catelist}>
            {id.map((post) => (
              <Link key={post} href={"/posts/" + post}>
                {post}
              </Link>
            ))}
          </div>
          <div className={styles.catechildren}>
            {allcategory(obj[cate].children, depth + 1)}
          </div>
        </div>
      );
    }
    return ans;
  };

  return (
    <>
      <Head>
        <title>{config.title} - 文章列表</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.head}>
          <h1>Categories</h1>
        </div>
        <div className="stickybg"></div>
        <article className={styles.article}>
          <div className={styles.catebox}>
            {allcategory(categories.categories)}
          </div>
          {/* <pre> {JSON.stringify(categories, null, 4)} </pre> */}
        </article>
      </main>
    </>
  );
}
export function getStaticProps() {
  const categories = getCategory();
  return {
    props: {
      categories,
    },
  };
}
