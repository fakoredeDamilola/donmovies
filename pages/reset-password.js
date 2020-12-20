import Link from 'next/link';
import ResetPasswordForm from '../components/ResetPasswordForm';
import Layout from "../components/Layout"
const ResetPasswordPage = () => {
    return (
        <Layout>
            <div className="container mt-5">
                <div >
                    <div className="text-center ">
                        <h2 className="mt-3">
                            Reset password
     </h2>
                        <p className="mt-2 text-center">
                            {"Didn't forgot? "}
                            <Link href="/login">
                                <a href="#">
                                    Login
       </a>
                            </Link>
                        </p>
                    </div>
                    <div className="mt-4 row">
                        <div className="col-lg-4"></div>
                        <div className="col-lg-4"><ResetPasswordForm /></div>
                        <div className="col-lg-4"></div>

                    </div>
                </div>
            </div>

        </Layout>
    );
};
export default ResetPasswordPage;