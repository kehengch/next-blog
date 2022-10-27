import Head from "next/head"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function APIList() {
    const [state, setState] = useState({})

    useEffect(() => {
        fetch("/api/posts")
            .then(res => res.json())
            .then(res => setState({posts_data: res}))
            .catch(console.log)
        .catch(console.log);
    })

    return (
        <>
            <Head></Head>
            <main>
                <h1>API</h1>
                <section>
                    <ul>
                        <li>
                            <Link href="/api/hello">
                                <a target="_blank">hello</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/api/posts">
                                <a target="_blank">posts</a>
                            </Link>
                        </li>
                        <li></li>
                    </ul>
                    <pre>
                        {
                            JSON.stringify(state, null, 4)
                        }
                    </pre>
                </section>
            </main>
        </>
    )
}
