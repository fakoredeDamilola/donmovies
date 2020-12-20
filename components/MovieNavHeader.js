import utils from "../utils/utils.module.css"
import Link from "next/link"
import { useEffect } from 'react'

const MovieNavHeader = ({ params, clicked, type }) => {
    useEffect(() => {
        document.querySelector(`[data-id="${clicked}"]`).className = utils.singleMovieNavbarSelected
    }, [])
    return (
        <div className={utils.singleMovieNav}>
            <Link href={type === "movie" ? `/movie/${params}` : `/tv/${params}`}><div data-id="1">Overview</div></Link>
            <Link href={type === "movie" ? `/movievideos/${params}` : `/tvvideos/${params}`}><div data-id="2">videos</div></Link>
        </div>
    )
}

export default MovieNavHeader