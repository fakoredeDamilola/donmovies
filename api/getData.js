export const getAllMovieData = async () => {

    const [mostPopular, upcoming, trendingMovie, trendingTV] = await Promise.all([
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=a6274c5c4a9c16954e5a86efccdd0bef&language=en-US&page=1`).then(res => res.json()),
        fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=a6274c5c4a9c16954e5a86efccdd0bef&language=en-US&page=1`).then(res => res.json()),
        fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=a6274c5c4a9c16954e5a86efccdd0bef`).then(res => res.json()),
        fetch(`https://api.themoviedb.org/3/trending/tv/day?api_key=a6274c5c4a9c16954e5a86efccdd0bef`).then(res => res.json()),

    ])
        ;
    return {
        mostPopular: mostPopular.results,
        upcoming: upcoming.results,
        trendingMovie: trendingMovie.results,
        trendingTV: trendingTV.results,

    }

}
export const getWholePageData = async (category, no) => {
    const data = await fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=a6274c5c4a9c16954e5a86efccdd0bef&language=en-US&page=${no}`)
    const res = await data.json()
    let result = res.results
    return {
        result
    }
}

export const getMoviesID = async () => {

    const [mostPopular, upcoming, trendingMovie] = await Promise.all([
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=a6274c5c4a9c16954e5a86efccdd0bef&language=en-US&page=1`).then(res => res.json()),
        fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=a6274c5c4a9c16954e5a86efccdd0bef&language=en-US&page=1`).then(res => res.json()),
        fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=a6274c5c4a9c16954e5a86efccdd0bef`).then(res => res.json()),

    ])
    const [mostPopular2, upcoming2] = await Promise.all([
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=a6274c5c4a9c16954e5a86efccdd0bef&language=en-US&page=2`).then(res => res.json()),
        fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=a6274c5c4a9c16954e5a86efccdd0bef&language=en-US&page=2`).then(res => res.json()),

    ])
    const [mostPopular3, upcoming3] = await Promise.all([
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=a6274c5c4a9c16954e5a86efccdd0bef&language=en-US&page=3`).then(res => res.json()),
        fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=a6274c5c4a9c16954e5a86efccdd0bef&language=en-US&page=3`).then(res => res.json()),

    ])
    const totalArray = [
        ...mostPopular.results,
        ...upcoming.results,
        ...trendingMovie.results,
        ...mostPopular2.results,
        ...mostPopular3.results,
        ...upcoming2.results,
        ...upcoming3.results
    ]
    return totalArray.map(movie => {
        return {
            params: {
                id: `${movie.id}`
            }
        }
    })
}
export const getTVsID = async () => {

    const trendingTV = await fetch(`https://api.themoviedb.org/3/trending/tv/day?api_key=a6274c5c4a9c16954e5a86efccdd0bef`).then(res => res.json())

    const totalArray = [...trendingTV.results]
    let arrayId = totalArray.map(tv => {
        return {
            params: {
                id: `${tv.id}`
            }
        }
    })
    return arrayId
}
export const getMovie = async (id) => {
    let data = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=a6274c5c4a9c16954e5a86efccdd0bef&language=en-US`)

    let res = await data.json()
    return {
        res
    }
}
export const getMovieVideos = async (id) => {
    let data = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=a6274c5c4a9c16954e5a86efccdd0bef&language=en-US`
    )
    let res = await data.json()
    return {
        res
    }
}
export const getTVVideos = async (id) => {
    let data = await fetch(
        `https://api.themoviedb.org/3/tv/${id}/videos?api_key=a6274c5c4a9c16954e5a86efccdd0bef&language=en-US`
    )
    let res = await data.json()
    return {
        res
    }
}
export const getTV = async (id) => {
    let data = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=a6274c5c4a9c16954e5a86efccdd0bef&language=en-US`)

    let res = await data.json()
    return {
        res
    }
}
export const getMovieRecommendation = async (id) => {
    let data = await fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=a6274c5c4a9c16954e5a86efccdd0bef&language=en-US&page=1`)
    let res = await data.json()
    let result = res.results

    return {
        result
    }
}
export const getTVRecommendation = async (id) => {
    let data = await fetch(`https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=a6274c5c4a9c16954e5a86efccdd0bef&language=en-US&page=1`)
    let res = await data.json()
    let result = res.results

    return {
        result
    }
}
export const getMovieCredit = async (id) => {
    let data = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=a6274c5c4a9c16954e5a86efccdd0bef&language=en-US`)

    let res = await data.json()
    let result = res.cast
    return {
        result
    }
}
export const getTVCredit = async (id) => {
    let data = await fetch(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=a6274c5c4a9c16954e5a86efccdd0bef&language=en-US`)

    let res = await data.json()
    let result = res.cast
    return {
        result
    }
}