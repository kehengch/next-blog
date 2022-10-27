import Link from "next/link"
import styles from "./header.module.css"

export default function Header() {
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <div className={styles.innernav}>
                    <section className={styles.navleft}>
                        <div className={styles.navitem}>
                            <Link href="/">我的 Next 博客</Link>
                        </div>
                        <div className={styles.navitem}>
                            <Link href="/tag">标签</Link>
                        </div>
                        <div className={styles.navitem}>
                            <Link href="/category">分类</Link>
                        </div>
                        <div className={styles.navitem}>
                            <Link href="/archives">存档</Link>
                        </div>
                        <div className={styles.navitem}>
                            <Link href="/apilist">API List</Link>
                        </div>
                    </section>
                    <section className={styles.navright}>
                    </section>
                </div>
            </nav>
            <div className={styles.navbg}>
                <div className={styles.stickybg}></div>
                <section></section>
            </div>
        </header>
    )
}