import Head from 'next/head'
import Header from "./header";
import Footer from "./Footer";

export default function Layout( { children }) {
    return (
        <>
            <Head>
                <link rel="icon" href="/img/kartjim.png"/>
            </Head>
            <Header></Header>
            { children }
            <Footer></Footer>
        </>
    )
}