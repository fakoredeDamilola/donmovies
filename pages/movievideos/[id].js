import { getMoviesID, getMovieVideos } from "../../api/getData"
import Layout from "../../components/Layout"
import MovieNavHeader from "../../components/MovieNavHeader"
import Footer from "../../components/Footer"
import utils from "../../utils/utils.module.css"


export async function getStaticProps({ params }) {
    let video = await getMovieVideos(params.id)

    return {
        props: {
            video: video.res.results,
            params: params.id
        }
    }
}
export async function getStaticPaths() {

    const paths = await getMoviesID()
    return {
        paths,
        fallback: false
    }
}
const MovieVideoData = ({ video, params }) => {
    return (
        <Layout>

            <div>
                <MovieNavHeader params={params} clicked="2" type="movie" />
                <div className="container py-5">
                    <div className={`${utils.movieVideoContainer} container`}>
                        {video.map((video, index) => {
                            return (
                                <div className={utils.movieVideo} key={index}>

                                    <iframe src={`https://www.youtube.com/embed/${video.key}`} frameBorder="0" width="400" height="400">No video available</iframe>
                                </div>
                            )
                        })

                        }

                    </div>

                </div>
            </div>
            <Footer />
        </Layout>

    )

}

export default MovieVideoData