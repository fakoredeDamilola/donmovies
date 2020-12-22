// import { getTVsID, getTV, getTVRecommendation, getTVCredit } from "../../api/getData"
import Layout from "../../components/Layout"
import utils from "../../utils/utils.module.css"
import MovieContainer from "../../components/MovieContainer"
import MovieNavHeader from "../../components/MovieNavHeader"
import PreMovieLoader from "../../components/PreMovieLoader"
import Footer from "../../components/Footer"
export async function getStaticProps({ params }) {
    // let movie = await getTV(params.id)
    let dataTV = await fetch(`https://api.themoviedb.org/3/tv/${params.id}?api_key=a6274c5c4a9c16954e5a86efccdd0bef&language=en-US`)

    let movieResult = await dataTV.json()
    console.log(movieResult.last_episode_to_air)
    // let movieResult = movie.res
    // let recommendation = await getTVRecommendation(params.id)
    let dataRecommendation = await fetch(`https://api.themoviedb.org/3/tv/${params.id}/recommendations?api_key=a6274c5c4a9c16954e5a86efccdd0bef&language=en-US&page=1`)
    let resRecommendation = await dataRecommendation.json()
    let recommendation = resRecommendation.results

    // let credits = await getTVCredit(params.id)
    let dataCredit = await fetch(`https://api.themoviedb.org/3/tv/${params.id}/credits?api_key=a6274c5c4a9c16954e5a86efccdd0bef&language=en-US`)

    let resCredit = await dataCredit.json()
    let credits = resCredit.cast
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

    // const paths = await getTVsID()
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
const TVData = ({ movie, recommendation, credits, params }) => {
    console.log(movie)
    return (
        <Layout>
            <div>
                <MovieNavHeader params={params} clicked="1" type="tv" />
                <div className={utils.singleMovieWrapper} style={{ backgroundImage: `linear-gradient( to right, rgba(3, 37, 65, 0.8) 0%, rgba(3, 37, 65, 0.5) 100%),url(https://image.tmdb.org/t/p/w500/${movie.poster_path})` }}>
                    <div className={`${utils.singleMovieContainer} row py-5`}>
                        <div className="col-lg-4">
                            <div className={utils.singleMovieImage}>
                                <img src={`https://image.tmdb.org/t/p/w220_and_h330_face/${movie.backdrop_path}`} alt="movie image" />
                            </div>

                        </div>
                        <div className="col-lg-8">
                            <div className={utils.singleMovieInfo}>
                                <h2><a href={`${movie.homepage}`} target="_blank">{movie.name}</a></h2>
                                <p>{movie.genres.map(genre => {
                                    return (
                                        <span key={genre.id}>{genre.name},</span>
                                    )
                                }
                                )}</p>
                            </div>

                            <div className={utils.singleMovieTagLine}>
                                <h3>{movie.tagline}</h3>
                            </div>
                            <div className={`${utils.singleMovieOverview} my-5 text-white`}>
                                <h3>Overview</h3>
                                <div>
                                    {movie.overview}
                                </div>
                                <div className={utils.singleMovieAdditionInfo}>
                                    <div>Status : <span>{movie.status}</span></div>
                                    <div>Episode runtime : <span>{movie.episode_run_time[0]} minutes</span></div>
                                    <div>vote average : <span>{movie.vote_average}</span></div>
                                    <div>First air date : <span>{movie.first_air_date}</span></div>

                                </div>
                                {movie.next_episode_to_air ?
                                    <div>
                                        <h3 className="my-3">Next epsiode to air</h3>
                                        <div className={utils.singleMovieAdditionInfo}>

                                            <div>air date : <span>{movie.next_episode_to_air.air_date}</span></div>
                                            <div>Episode number : <span>{movie.next_episode_to_air.episode_number}</span></div>
                                            <div>Season number : <span>{movie.next_episode_to_air.season_number}</span></div>
                                            <div>name : <span>{movie.next_episode_to_air.name}</span></div>

                                        </div>

                                    </div>

                                    : null

                                }
                                <div>
                                    <h3 className="my-3">Last epsiode to air</h3>
                                    <div className={utils.singleMovieAdditionInfo}>

                                        <div>air date : <span>{movie.last_episode_to_air.air_date}</span></div>
                                        <div>Episode number : <span>{movie.last_episode_to_air.episode_number}</span></div>
                                        <div>Season number : <span>{movie.last_episode_to_air.season_number}</span></div>
                                        <div>name : <span>{movie.last_episode_to_air.name}</span></div>

                                    </div>

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

export default TVData