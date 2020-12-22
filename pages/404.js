import Footer from "../components/Footer"
import Layout from "../components/Layout"
import MovieContainer from "../components/MovieContainer"
import PreMovieLoader from "../components/PreMovieLoader"
import utils from "../utils/utils.module.css"
import { getAllMovieData } from "../api/getData"
import Link from "next/link"
const custom404 = ({ mostPopular }) => {

    return (
        <Layout>
            <div className={utils.indexContainer} style={{ backgroundImage: `linear-gradient( to right, rgba(3, 37, 65, 0.8) 0%, rgba(3, 37, 65, 0.5) 100%),url(https://image.tmdb.org/t/p/w500/2b0s0iMNl9CgrCMz0VGKlMw3vZw.jpg)` }}>
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
            <h4 className="text-center py-3 bg-danger text-white" >Sorry this url does not exist</h4>
            <div className="container">

                <div className="pt-5">
                    <h4 className={`${utils.textHeading} mb-2 ml-3`}><Link href={`/category/popular`} ><a>What's Popular</a></Link></h4>
                    <div className={utils.indexMoviesSection}>
                        {!mostPopular || mostPopular.length === 0 ?
                            <div>
                                <PreMovieLoader />
                            </div> :
                            <MovieContainer array={mostPopular} />
                        }
                    </div>
                </div>

            </div>

            <Footer />
        </Layout>

    )
}
export const getStaticProps = async function () {
    // const { mostPopular } = await getAllMovieData()
    const mostPopular =
        await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=a6274c5c4a9c16954e5a86efccdd0bef&language=en-US&page=1`).then(res => res.json())

    return {
        props: {
            mostPopular: mostPopular.results,
        }

    }


}
export default custom404