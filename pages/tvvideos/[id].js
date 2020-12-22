// import { getTVsID, getTVVideos } from "../../api/getData"
import Layout from "../../components/Layout"
import MovieNavHeader from "../../components/MovieNavHeader"
import Footer from "../../components/Footer"
import utils from "../../utils/utils.module.css"


export async function getStaticProps({ params }) {
    // let video = await getTVVideos(params.id)
    let data = await fetch(
        `https://api.themoviedb.org/3/tv/${id}/videos?api_key=a6274c5c4a9c16954e5a86efccdd0bef&language=en-US`
    )
    let video = await data.json()
    return {
        props: {
            video: video.results
        }
    }
}
export async function getStaticPaths() {
    const trendingTV = await fetch(`https://api.themoviedb.org/3/trending/tv/day?api_key=a6274c5c4a9c16954e5a86efccdd0bef`).then(res => res.json())

    const totalArray = [...trendingTV.results]
    let paths = totalArray.map(tv => {
        return {
            params: {
                id: `${tv.id}`
            }
        }
    })
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