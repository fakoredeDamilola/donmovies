import utils from "../utils/utils.module.css"
import Link from "next/link"
const Movie = ({ movie }) => {
    let percent = Math.round((movie.vote_average / movie.vote_count) * 100)
    let value = percent <= 9 ? `0${percent}` : percent
    let imageUrl = movie.backdrop_path || movie.profile_path
    return (
        //  href={}
        <Link href={movie.media_type === "tv" ? `/tv/${movie.id}` : `/movie/${movie.id}`}>
            <div className={utils.movieContainer}>
                <div className={utils.movieImage}>
                    <img src={`https://image.tmdb.org/t/p/w220_and_h330_face/${imageUrl}`} alt="movie image" />
                </div>

                <div className={utils.movieInfo}>
                    {/* <div>
                        {value} <span>%</span>
                    </div> */}
                    <div className="movieName">
                        {movie.title || movie.name}
                    </div>
                    <div className="movieDate">
                        {movie.release_date || movie.first_air_date}
                    </div>
                </div>
            </div>

        </Link>
    )
}
export default Movie