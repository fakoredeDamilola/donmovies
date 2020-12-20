import { useRequireAuth } from "../hooks/useAuth"
import Layout from "../components/Layout"
import utils from "../utils/utils.module.css"
import Button from "../components/Button"
const DashboardPage = () => {

    const auth = useRequireAuth()
    if (!auth.user) return null;
    return (
        <Layout>
            <div>
                <div className={`${utils.dashboardbg} py-5`}>
                    <div className="container">
                        <div className={utils.dashboardImage}>
                            <div>
                                {auth.user.name !== undefined ? auth.user.name.split("")[0] : ""}

                            </div>
                        </div>
                        <div className={`${utils.dashboardUserInfo} my-5`}>
                            <h2>{auth.user.name}</h2>
                        </div>
                    </div>

                </div>
                <div className="container">
                    <div className="mt-4" onClick={() => auth.signOut()}>
                        <Button title="Logout" type="submit" />
                    </div>
                </div>

            </div>

        </Layout>
    )
}
export default DashboardPage