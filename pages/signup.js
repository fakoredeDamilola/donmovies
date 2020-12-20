import Link from "next/link"
import SignupForm from "../components/SignupForm"
import Layout from "../components/Layout"
const SignupPage = () => {
    return (
        <Layout>

            <div>
                <div className="container">
                    <div className="mt-5 text-center">
                        <h2>Signup</h2>
                        <p className="text-center">
                            already have an account <Link href="/login">login</Link>
                        </p>
                    </div>
                    <div className="mt-4 row">
                        <div className="col-lg-4"></div>
                        <div className="col-lg-4"><SignupForm /></div>
                        <div className="col-lg-4"></div>

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default SignupPage