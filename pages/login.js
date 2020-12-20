import Link from "next/link"
import LoginForm from "../components/LoginForm"
import Layout from "../components/Layout"
const Login = () => {
    return (
        <Layout>
            <div>
                <div className="container my-5">
                    <div className="text-center">
                        <h2>Login</h2>
                        <p className="mt-2 text-center">
                            Don't have an account <Link href="/signup">signup</Link>
                        </p>
                    </div>
                    <div className="mt-4 row">
                        <div className="col-lg-4"></div>
                        <div className="col-lg-4"> <LoginForm /></div>
                        <div className="col-lg-4"></div>

                    </div>
                </div>
            </div>

        </Layout>
    )
}
export default Login