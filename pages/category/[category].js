import Layout from "../../components/Layout"
import utils from "../../utils/utils.module.css"
import MovieContainer from "../../components/MovieContainer"
import Footer from "../../components/Footer"
import { useState } from 'react'
import { getWholePageData } from "../../api/getData"
import PreMovieLoader from "../../components/PreMovieLoader"

const categoryData = ({ movie, url, category }) => {
    let [movieData, setMovieData] = useState(movie)
    let [number, setNumber] = useState(1)
    const nextPage = async (category) => {

        number += 1
        setNumber(number)
        let data = await getWholePageData(category, number)
        // let data = await fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=a6274c5c4a9c16954e5a86efccdd0bef&language=en-US&page=${number}`)
        // const res = await data.json()
        // let result = res.results
        let result = data.result
        setMovieData(result)


    }
    const prevPage = async (category) => {
        if (number > 1) {
            number -= 1
            setNumber(number)
            let data = await getWholePageData(category, number)
            // let data = await fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=a6274c5c4a9c16954e5a86efccdd0bef&language=en-US&page=${number}`)
            // const res = await data.json()
            // let result = res.results
            let result = data.result
            setMovieData(result)
        } else return



    }
    return (
        <Layout>
            <div className={`${utils.indexContainer} mb-5`} style={{ backgroundImage: `linear-gradient( to right, rgba(3, 37, 65, 0.8) 0%, rgba(3, 37, 65, 0.5) 100%),url(https://image.tmdb.org/t/p/w500/${url})` }}>
                <h1>
                    Welcome.
        </h1>
                <h3 className="my-4">
                    Millions of movies, TV shows and people to discover. Explore now.
        </h3>
                <div className={`${utils.indexInput} mt-5`}>
                    <input type="text" />
                    <button>Search</button>
                </div>
            </div>
            <div>
                <div className={utils.categoryMovieWrapper}>
                    <div className={utils.categoryMovieSection}>
                        {!movie || movie.length === 0 ?
                            <div>
                                <PreMovieLoader />
                            </div> :
                            <MovieContainer array={movieData} />
                        }
                    </div>

                </div>
                <div className={`${utils.buttonWrapper} mt-4 py-3`}>
                    <button onClick={() => prevPage(category)}>previous</button>
                    <button onClick={() => nextPage(category)}>next</button>
                </div>
            </div>
            <Footer />
        </Layout>
    )
}
export const getStaticPaths = () => {
    return {
        paths: [
            { params: { category: "popular" } },
            { params: { category: "upcoming" } },
        ],
        fallback: false
    }
}
export const getStaticProps = async ({ params }) => {
    let data = await getWholePageData(params.category, 1)
    // let data = await fetch(`https://api.themoviedb.org/3/movie/${params.category}?api_key=a6274c5c4a9c16954e5a86efccdd0bef&language=en-US&page=1`)
    // const res = await data.json()
    // let result = res.results
    let result = data.result
    let random = Math.round(Math.random() * 20)
    let url = result[random].backdrop_path
    return {
        props: {
            movie: result,
            url,
            category: params.category
        }
    }
}
export default categoryData