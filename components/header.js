import Link from "next/link"
import styles from "./header.module.css"

export default function Header() {

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <section className={styles.navleft}>
                    <div className={styles.navitem}>
                        <Link href="/">logo</Link>
                    </div>
                    <div className={styles.navitem}>posts</div>
                    <div className={styles.navitem}>about</div>
                </section>
                <section className={styles.navright}>
                    <div className={styles.navitem}>☀️</div>
                    <div className={styles.navitem}><input type="text" /></div>
                </section>
            </nav>
            <div className={styles.navbg}>
                <section></section>
            </div>
        </header>
    )
}