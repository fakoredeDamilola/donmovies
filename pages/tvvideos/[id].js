import { getTVsID, getTVVideos } from "../../api/getData"
import Layout from "../../components/Layout"
import MovieNavHeader from "../../components/MovieNavHeader"
import Footer from "../../components/Footer"
import utils from "../../utils/utils.module.css"


export async function getStaticProps({ params }) {
    let video = await getTVVideos(params.id)

    return {
        props: {
            video: video.res.results
        }
    }
}
export async function getStaticPaths() {

    const paths = await getTVsID()
    return {
        paths,
        fallback: false
    }
}
const TVVideoData = ({ video, params }) => {
    return (
        <Layout>

            <div>
                <MovieNavHeader params={params} clicked="2" type="tv" />
                <div className={`${utils.movieVideoContainer} container`}>
                    {video.map((video, index) => {
                        return (
                            <div className={utils.movieVideo} key={index}>

                                <iframe src={`https://www.youtube.com/embed/${video.key}`} frameBorder="0" width="400" height="400" className="my-3">No video available</iframe>
                            </div>
                        )
                    })

                    }

                </div>

            </div>
            <Footer />
        </Layout>

    )

}

export default TVVideoData