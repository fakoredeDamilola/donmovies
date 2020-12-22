import Movie from "../components/Movie"

const MovieContainer = ({ array, page }) => {

    return (
        <div>

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