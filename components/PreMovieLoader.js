import MovieLoader from "../components/MovieLoader"
import utils from "../utils/utils.module.css"
import { useEffect } from "react"
const PreMovieLoader = () => {
    useEffect(() => {
        let rally = document.querySelectorAll(".movieRail")
        Array.from(rally).forEach(ral => ral.scrollLeft = 200)
    }, [])
    return (
        <div className={utils.indexPreMovieLoader}>
            <MovieLoader />
            <MovieLoader />
            <MovieLoader />
            <MovieLoader />
            <MovieLoader />
            <MovieLoader />
            <MovieLoader />
            <MovieLoader />
            <MovieLoader />
        </div>

    )


}
export default PreMovieLoader