import axios from "axios";
import { GalleryType, MoviesType, SeriesDetailsType } from "../types";
import { GenreListType } from "../types";
import { ColletionType } from "../types";
import { SeriesType } from "../types";
import { DetailMovieVideosType } from "../types";

const KEY = "?api_key=83b174aa40f2489ec6f979357073b778"
const API_URL = "https://api.themoviedb.org/3/"

const http = axios.create({
  baseURL: API_URL,
});

export const apiMovieService = {

  getMovies: async () => {
    const response = await http.get(API_URL + `movie/popular${KEY}&language=pt-br`)
    return response.data.results as MoviesType[]
  },

  getGenere: async () => {
    const response = await http.get<GenreListType>(API_URL + `genre/movie/list${KEY}&language=pt-br`);
    return response.data
  },

  getAllFilms: async (page: number, genres?: string) => {
    let url = `discover/movie${KEY}&language=pt-br&page=${page}`;
    if (genres) {
      url += `&with_genres=${genres}`;
    }
    const response = await http.get(url);
  return response.data.results as MoviesType[];
  },

  getDetailsFilmes: async (id: number) => {
    const response = await http.get(`movie/${id + KEY}&language=pt-br`)
    return response.data
  },

  getColections: async (idColection: number) => {
    const response = await http.get<ColletionType>(API_URL + `collection/${idColection}${KEY}&language=pt-br`)
    return response.data
  },

  getVideoFilms: async (id: number) => {
    const response = await http.get(`movie/${id}/videos${KEY}&language=pt-br`)
    return response.data.results as DetailMovieVideosType[]
  },

  getImagesMovies: async (id: number) => {
    const response = await http.get(`movie/${id}/images${KEY}`)
    return response.data as GalleryType
  },

  getSearchMovie: async () => {
    const response = await http.get(`search/movie${KEY}&language=pt-br`)
    return response.data
  },

  getTopFilms: async () => {
    const response = await http.get(`movie/top_rated${KEY}&language=pt-br`)
    return response.data.results as MoviesType[]
  },

  getSoonRelease: async () => {
    const response = await http.get(`movie/upcoming${KEY}&language=pt-br`)
    return response.data.results as MoviesType[]
  },

  getAllMovies: async (page: number, genres?: string) => {
    let url = `discover/movie${KEY}&language=pt-br&page=${page}`;
    if (genres) {
      url += `&with_genres=${genres}`;
    }
    const response = await http.get(url);
  return response.data.results as MoviesType[];
  },

  getSeriesRecents: async (page: number) => {
    const response = await http.get(`discover/tv${KEY}&with_networks=&language=pt-br&page=${page}`)
    return response.data.results as SeriesType[]
  },

  getDetailSeries: async (id: number) => {
    const response = await http.get(`tv/${id + KEY}&language=pt`)
    return response.data as SeriesDetailsType
  },

  getOriginaisNetflix: async () => {
    const response = await http.get(`discover/tv${KEY}&with_networks=213&language=pt`)
    return response.data.results as SeriesType[]
  },

  getImagesSeries: async (id: number) => {
    const response = await http.get(`tv/${id}/images${KEY}`)
    return response.data as GalleryType
  },

  getVideoSeries: async (id: number) => {
    const response = await http.get(`tv/${id}/videos${KEY}&language=pt-br`)
    return response.data.results as DetailMovieVideosType[]
  },



}
