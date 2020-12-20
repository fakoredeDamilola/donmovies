import Head from 'next/head'
import Navbar from "./Navbar"
import utils from "../utils/utils.module.css"
const Layout = ({ children }) => {
    return (
        <div>

            <Head>
                <title>Movie app</title>
                <link rel="icon" href="/favicon.ico" />
                <link
                    rel="stylesheet"
                    href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
                    integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z"
                    crossOrigin="anonymous"
                />
                <script
                    src="https://kit.fontawesome.com/da014721b9.js"
                    crossOrigin="anonymous"
                ></script>
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Langar&family=Mulish:wght@300&display=swap" rel="stylesheet" />
            </Head>

            <Navbar title="Movies" />
            <div>
                <div className={utils.wrapper}>
                    {children}
                </div>
            </div>
        </div>

    )
}
export default Layout