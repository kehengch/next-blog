import Head from "next/head"
import config from "../../config"
import { getCateIds, getCatePost } from "../../lib/cate"

export default function Categories({ cate }) {
    return (
        <>
            <Head>
                <title>{ config.title} - {"..."}</title>
            </Head>
            <main>
                <pre>
                {
                    JSON.stringify(cate, null, 4)
                }
                </pre>
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


