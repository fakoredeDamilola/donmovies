import Layout from "../components/Layout"
import Footer from "../components/Footer"
import MovieContainer from "../components/MovieContainer"
import PreMovieLoader from "../components/PreMovieLoader"
import utils from "../utils/utils.module.css"
import { getAllMovieData } from "../api/getData"
import { useState } from 'react'
import Link from 'next/link'
const Index = ({
  mostPopular,
  upcoming,
  trendingMovie,
  trendingTV
}) => {
  const [mostPopularData, setMostPopularData] = useState(mostPopular)
  const [upcomingData, setUpcomingData] = useState(upcoming)
  const [trendingMovieData, setTrendingMovieData] = useState(trendingMovie)
  const [trendingTVData, setTrendingTVData] = useState(trendingTV)
  let random = Math.round(Math.random() * 20)
  let url = trendingTVData[random].backdrop_path
  let url2 = mostPopularData[random].backdrop_path

  // change media window
  const changeValue = async (e) => {
    let children = e.target.parentElement.children
    Array.from(children).forEach(child => child.classList.remove(utils.active))
    e.target.className = utils.active
    let value = e.target.innerHTML
    let id = e.target.dataset.id

    let result = await fetch(`https://api.themoviedb.org/3/trending/${id}/${value}?api_key=a6274c5c4a9c16954e5a86efccdd0bef`)
    let res = await result.json()
    let data = res.results

    if (id === "movie") {

      setTrendingMovieData(data)
    } else if (id === "tv") {
      setTrendingTVData(data)
    }

  }



  return (
    <Layout>
      <div className={utils.indexContainer} style={{ backgroundImage: `linear-gradient( to right, rgba(3, 37, 65, 0.8) 0%, rgba(3, 37, 65, 0.5) 100%),url(https://image.tmdb.org/t/p/w500/${url})` }}>
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

      <div className={`${utils.indexMoviesContainer} container`}>
        <div className="pt-5">
          <h3 className={`${utils.textHeading} mb-2 ml-3`}><Link href={`/category/popular`}><a>What's Popular</a></Link></h3>
          <div className={utils.indexMoviesSection}>
            {!mostPopular || mostPopular.length === 0 ?
              <div>
                <PreMovieLoader />
              </div> :
              <MovieContainer array={mostPopularData} />
            }
          </div>
        </div>

        <div className="pt-5 text-white" style={{
          backgroundImage: `linear-gradient( to right, rgba(3, 37, 65, 0.8) 0%, rgba(3, 37, 65, 0.5) 100%),url(https://image.tmdb.org/t/p/w500/${url2})`
        }}>
          <h3 className={`${utils.textHeading} mb-2 ml-3 `}><Link href={`/category/upcoming`}><a className="text-white">Upcoming</a></Link></h3>
          <div className={utils.indexMoviesSection}>
            {!upcoming || upcoming.length === 0 ?
              <div>
                <PreMovieLoader />
              </div> :
              <MovieContainer array={upcomingData} />
            }
          </div>
        </div>
        <div className="pt-5">
          <h3 className={`${utils.textHeading} mb-2 ml-3`}>Trending Movie</h3>
          <div className={utils.buttonGroup} onClick={changeValue} >
            <button className={utils.active} data-id="movie">day</button>
            <button data-id="movie">week</button>
          </div>

          <div className={utils.indexMoviesSection}>
            {!trendingMovie || trendingMovie.length === 0 ?
              <div>
                <PreMovieLoader />
              </div> :
              <MovieContainer array={trendingMovieData} />
            }
          </div>
        </div>
        <div className="pt-5">
          <h3 className={`${utils.textHeading} mb-2 ml-3`}>Trending TV</h3>
          <div className={utils.buttonGroup} onClick={changeValue} >
            <button className={utils.active} data-id="tv">day</button>
            <button data-id="tv">week</button>
          </div>
          <div className={utils.indexMoviesSection}>
            {!trendingTV || trendingTV.length === 0 ?
              <div>
                <PreMovieLoader />
              </div> :

              <MovieContainer array={trendingTVData} />

            }
          </div>
        </div>




      </div>

      <Footer />

    </Layout >
  )


}
export const getStaticProps = async function () {
  // const { mostPopular, upcoming, trendingMovie, trendingTV } = await getAllMovieData()
  const [mostPopular, upcoming, trendingMovie, trendingTV] = await Promise.all([
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=a6274c5c4a9c16954e5a86efccdd0bef&language=en-US&page=1`).then(res => res.json()),
    fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=a6274c5c4a9c16954e5a86efccdd0bef&language=en-US&page=1`).then(res => res.json()),
    fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=a6274c5c4a9c16954e5a86efccdd0bef`).then(res => res.json()),
    fetch(`https://api.themoviedb.org/3/trending/tv/day?api_key=a6274c5c4a9c16954e5a86efccdd0bef`).then(res => res.json()),

  ])
  return {
    props: {
      mostPopular: mostPopular.results,
      upcoming: upcoming.results,
      trendingMovie: trendingMovie.results,
      trendingTV: trendingTV.results
    }

  }


}


export default Index