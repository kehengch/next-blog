import Head from 'next/head'
import Header from "../components/header";

export default function Layout( { children }) {
    return (
        <>
            <Head>
                <link rel="icon" href="/img/kartjim.png"/>
            </Head>
            <Header></Header>
            { children }
        </>
    )
}