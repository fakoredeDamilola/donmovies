import Movie from "../components/Movie"
import { useEffect } from "react"
const MovieContainer = ({ array }) => {

    useEffect(() => {
        let rally = document.querySelectorAll(".movieRail")
        Array.from(rally).forEach(ral => ral.scrollLeft = 200)
    }, [])
    return (
        <div className="movieRail">

            {array.map((movie, index) => {
                return (

                    <Movie movie={movie} key={index} />

                )
            })

            }
        </div>

    )
}
export default MovieContainer