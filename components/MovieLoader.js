import utils from "../utils/utils.module.css"
const Movie = () => {
    return (

        <div className={utils.loaderMovieContainer}>
            <div className={utils.loaderMovieImage}>
            </div>

            <div className={utils.loaderMovieInfo}>
                <div className={utils.loaderMovieName}>


                </div>
                <div className={utils.loaderMovieDescription}>


                </div>
            </div>
        </div>
    )
}
export default Movie