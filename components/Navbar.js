import styles from './Navbar.module.css'

import Link from "next/link"
import React from "react"
class Navbar extends React.Component {
    constructor(props) {
        super(props)
        this.menuToggle = React.createRef()
    }
    showNav = () => {
        this.menuToggle.current.classList.add(styles.active)
    }
    closeMenu = () => {
        this.menuToggle.current.classList.remove(styles.active)
    }
    render() {
        return (
            <header>
                <div className={styles.header}>
                    <div className={styles.headerTop}>
                        <div className={styles.logo}>
                            <Link href="/">
                                <a style={{ fontFamily: "'Langar', cursive" }}>
                                    Donmovies
                        </a>
                            </Link>

                        </div>

                        <div className={styles.menuToggle}>
                            <div className={styles.barsText} onClick={this.showNav} >
                                <div className={styles.bars}></div>
                                <div className={styles.bars}></div>
                                <div className={styles.bars}></div>
                            </div>
                        </div>
                    </div>

                    <nav>
                        <ul className={`${styles.menu}`} ref={this.menuToggle}>
                            <li className={styles.closeMenu}>
                                <div onClick={this.closeMenu}>X</div>
                            </li>
                            <li>
                                <Link href="/category/popular">
                                    <a>POPULAR</a>
                                </Link>

                                <div className={styles.animation}></div>
                            </li>
                            <li>
                                <Link href="/category/upcoming">
                                    <a>UPCOMING</a>
                                </Link>

                                <div className={styles.animation}></div>
                            </li>
                            <li>
                                <Link href="/login">
                                    <a>LOGIN</a>
                                </Link>

                                <div className={styles.animation}></div>
                            </li>
                            <li>
                                <Link href="/signup">
                                    <a>SIGNUP</a>
                                </Link>

                                <div className={styles.animation}></div>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
        )
    }

}
export default Navbar