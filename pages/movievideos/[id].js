// import { getMoviesID, getMovieVideos } from "../../api/getData"
import Layout from "../../components/Layout"
import MovieNavHeader from "../../components/MovieNavHeader"
import Footer from "../../components/Footer"
import utils from "../../utils/utils.module.css"


export async function getStaticProps({ params }) {
    // let video = await getMovieVideos(params.id)
    let data = await fetch(
        `https://api.themoviedb.org/3/movie/${params.id}/videos?api_key=a6274c5c4a9c16954e5a86efccdd0bef&language=en-US`
    )
    let res = await data.json()
    return {
        props: {
            video: res.results || [],
            params: params.id
        }
    }
}
export async function getStaticPaths() {

    // const paths = await getMoviesID()

    const [mostPopular, upcoming, trendingMovie] = await Promise.all([
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=a6274c5c4a9c16954e5a86efccdd0bef&language=en-US&page=1`).then(res => res.json()),
        fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=a6274c5c4a9c16954e5a86efccdd0bef&language=en-US&page=1`).then(res => res.json()),
        fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=a6274c5c4a9c16954e5a86efccdd0bef`).then(res => res.json()),

    ])
    const [mostPopular2, upcoming2] = await Promise.all([
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=a6274c5c4a9c16954e5a86efccdd0bef&language=en-US&page=2`).then(res => res.json()),
        fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=a6274c5c4a9c16954e5a86efccdd0bef&language=en-US&page=2`).then(res => res.json()),

    ])
    const [mostPopular3, upcoming3] = await Promise.all([
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=a6274c5c4a9c16954e5a86efccdd0bef&language=en-US&page=3`).then(res => res.json()),
        fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=a6274c5c4a9c16954e5a86efccdd0bef&language=en-US&page=3`).then(res => res.json()),

    ])
    const totalArray = [
        ...mostPopular.results,
        ...upcoming.results,
        ...trendingMovie.results,
        ...mostPopular2.results,
        ...mostPopular3.results,
        ...upcoming2.results,
        ...upcoming3.results
    ]
    let paths = totalArray.map(movie => {
        return {
            params: {
                id: `${movie.id}`
            }
        }
    })

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