import { getTVsID, getTV, getTVRecommendation, getTVCredit } from "../../api/getData"
import Layout from "../../components/Layout"
import utils from "../../utils/utils.module.css"
import MovieContainer from "../../components/MovieContainer"
import MovieNavHeader from "../../components/MovieNavHeader"
import PreMovieLoader from "../../components/PreMovieLoader"
import Footer from "../../components/Footer"
export async function getStaticProps({ params }) {
    let movie = await getTV(params.id)
    let movieResult = movie.res
    let recommendation = await getTVRecommendation(params.id)
    let credits = await getTVCredit(params.id)
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

    const paths = await getTVsID()
    return {
        paths,
        fallback: false
    }
}
const TVData = ({ movie, recommendation, credits, params }) => {
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
                                <div>
                                    <h3 className="my-3">Last epsiode to air</h3>
                                    <div className={utils.singleMovieAdditionInfo}>

                                        <div>air date : <span>{movie.last_episode_to_air.air_date}</span></div>
                                        <div>Episode number : <span>{movie.last_episode_to_air.episode_number}</span></div>
                                        <div>Season number : <span>{movie.last_episode_to_air.season_number}</span></div>
                                        <div>name : <span>{movie.last_episode_to_air.name}</span></div>

                                    </div>

                                </div>
                                <div>
                                    <h3 className="my-3">Next epsiode to air</h3>
                                    <div className={utils.singleMovieAdditionInfo}>

                                        <div>air date : <span>{movie.next_episode_to_air.air_date}</span></div>
                                        <div>Episode number : <span>{movie.next_episode_to_air.episode_number}</span></div>
                                        <div>Season number : <span>{movie.next_episode_to_air.season_number}</span></div>
                                        <div>name : <span>{movie.next_episode_to_air.name}</span></div>

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
                            <MovieContainer array={credits.result} />
                        }
                    </div>
                    <hr />
                    <div className={`${utils.indexMoviesSection} py-5`}>
                        <h3 className="mb-2 ml-3">Recommendations</h3>
                        {!recommendation || recommendation.length === 0 ?
                            <div>
                                <PreMovieLoader />
                            </div> :
                            <MovieContainer array={recommendation.result} />
                        }
                    </div>

                </div>
            </div>

            <Footer />

        </Layout>

    )
}

export default TVData