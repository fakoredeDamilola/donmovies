// import { getMoviesID, getMovie, getMovieRecommendation, getMovieCredit } from "../../api/getData"
import Layout from "../../components/Layout"
import MovieNavHeader from "../../components/MovieNavHeader"
import utils from "../../utils/utils.module.css"
import MovieContainer from "../../components/MovieContainer"
import Footer from "../../components/Footer"

import { useAuth } from "../../hooks/useAuth"
import { useState } from "react"
export async function getStaticProps({ params }) {
    // let movie = await getMovie(params.id)
    let data = await fetch(`https://api.themoviedb.org/3/movie/${params.id}?api_key=a6274c5c4a9c16954e5a86efccdd0bef&language=en-US`)

    let res = await data.json()
    let movieResult = res

    // let recommendation = await getMovieRecommendation(params.id)
    let dataRecommendation = await fetch(`https://api.themoviedb.org/3/movie/${params.id}/recommendations?api_key=a6274c5c4a9c16954e5a86efccdd0bef&language=en-US&page=1`)
    let resRecommendation = await dataRecommendation.json()
    let recommendation = resRecommendation.results

    // let credits = await getMovieCredit(params.id)
    let dataCast = await fetch(`https://api.themoviedb.org/3/movie/${params.id}/credits?api_key=a6274c5c4a9c16954e5a86efccdd0bef&language=en-US`)

    let resCast = await dataCast.json()
    let credits = resCast.cast
    return {
        props: {
            movie: movieResult,
            recommendation,
            credits,
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

const MovieData = ({ movie, recommendation, credits, params }) => {
    let auth = useAuth()
    let [movieData, setMovie] = useState(movie)
    console.log(recommendation)
    return (
        <Layout>

            <div>
                <MovieNavHeader params={params} clicked="1" type="movie" />
                <div style={{ backgroundImage: `linear-gradient( to right, rgba(3, 37, 65, 0.8) 0%, rgba(3, 37, 65, 0.7) 100%),url(https://image.tmdb.org/t/p/w500/${movieData.poster_path})` }} className={utils.singleMovieWrapper}>
                    <div className={`${utils.singleMovieContainer} row py-5`}>
                        <div className="col-lg-4">
                            <div className={utils.singleMovieImage}>
                                <img src={`https://image.tmdb.org/t/p/w220_and_h330_face/${movieData.backdrop_path}`} alt="movie image" />
                            </div>

                        </div>
                        <div className="col-lg-8">
                            <div className={utils.singleMovieInfo}>
                                <h2><a href={`${movieData.homepage}`} target="_blank">{movieData.title}</a></h2>
                                <p>{movieData.genres.map(genre => {
                                    return (
                                        <span key={genre.id}>{genre.name}, </span>
                                    )
                                }
                                )}</p>
                            </div>

                            <div className={utils.singleMovieTagLine}>
                                <h5><i>{movieData.tagline}</i></h5>
                            </div>
                            <div className={`${utils.singleMovieOverview} my-5 text-white`}>
                                <h3 className="mb-3 ">Overview</h3>
                                <div>
                                    {movieData.overview}
                                </div>
                                <div className={utils.singleMovieAdditionInfo}>
                                    <div>Status : <span>{movieData.status}</span></div>
                                    <div>Runtime : <span>{movieData.runtime} minutes</span></div>
                                    <div>vote average : <span>{movieData.vote_average}</span></div>
                                    <div>Release date : <span>{movieData.release_date}</span></div>

                                </div>
                            </div>

                        </div>


                    </div>
                </div>
                <div className="container">
                    <div className={`${utils.indexMoviesSection} py-5`}>
                        <h3 className="mb-2 ml-3">Credits</h3>
                        {!credits || credits.length === 0 ?
                            <div>
                                <PreMovieLoader />
                            </div> :
                            <MovieContainer array={credits} />
                        }
                    </div>
                    <hr />
                    <div className={`${utils.indexMoviesSection} py-5`}>
                        <h3 className="mb-2 ml-3">Recommendations</h3>
                        {!recommendation || recommendation.length === 0 ?
                            <div>
                                <PreMovieLoader />
                            </div> :
                            <MovieContainer array={recommendation} />
                        }
                    </div>

                </div>
            </div>
            <Footer />
        </Layout>

    )

}

export default MovieData