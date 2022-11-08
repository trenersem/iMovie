import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setTotalPage, upsertManyMovies } from "../slices/movieListSlice";
import { RootState } from "../store";
import {
  category,
  GetCredits,
  GetVideos,
  movieType,
  PopularMovies,
  tvType,
  VideoDetails,
  Videos,
} from "./types";

const key = import.meta.env.VITE_BASE_API_KEY;

export const movieCoreApi = createApi({
  reducerPath: "movieCoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_API,
    // prepareHeaders: (headers) => {
    //   headers.set("api_key", key );
    //   return headers;
    // },
  }),
  endpoints: (builder) => ({
    getMovie: builder.query<PopularMovies, void>({
      query: () =>
        `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`,
    }),
    getVideosById: builder.query<
      GetVideos,
      { movie_id: number; category?: category | string }
    >({
      query: ({ movie_id, category = "movie" }) =>
        `https://api.themoviedb.org/3/${category}/${movie_id}/videos?api_key=${key}&language=en-US`,
    }),
    getMovieById: builder.query<
      VideoDetails,
      { movie_id: number; category?: category | string }
    >({
      query: ({ movie_id, category = "movie" }) =>
        `https://api.themoviedb.org/3/${category}/${movie_id}?api_key=${key}&language=en-US`,
    }),
    getCastById: builder.query<
      GetCredits,
      { movie_id: number; category?: category | string }
    >({
      query: ({ movie_id, category = "movie" }) =>
        `https://api.themoviedb.org/3/${category}/${movie_id}/credits?api_key=${key}&language=en-US`,
    }),

    getMovieList: builder.query<
      PopularMovies,
      {
        movieType: movieType | tvType;
        category?: category | string;
        page?: number;
      }
    >({
      query: ({ movieType, category, page }) =>
        `https://api.themoviedb.org/3/${category}/${movieType}?api_key=${key}&language=en-US&page=${page}`,
      async onQueryStarted(_arg, { dispatch, queryFulfilled, getState }) {
        try {
          const { data } = await queryFulfilled;
          const currentState = getState() as RootState;
          if (currentState.movieListReducer.toSetAllMovies) {
            dispatch(setTotalPage(data.total_pages));
            dispatch(upsertManyMovies(data.results));
          }
        } catch (err) {
          console.log(err);
        }
      },
    }),
    getMovieBySearckKeyWords: builder.query<
      PopularMovies,
      { keyword: string; page: number; category?: category | string }
    >({
      query: ({ keyword, page, category }) =>
        `https://api.themoviedb.org/3/search/${category}/?api_key=${key}&language=en-US&query=${keyword}&page=${page}&include_adult=false`,
      async onQueryStarted(_arg, { dispatch, queryFulfilled, getState }) {
        try {
          const { data } = await queryFulfilled;
          const currentState = getState() as RootState;
          if (currentState.movieListReducer.toSetAllMovies) {
            dispatch(setTotalPage(data.total_pages));
            dispatch(upsertManyMovies(data.results));
          }
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const {
  useGetMovieQuery,
  useLazyGetMovieByIdQuery,
  useGetMovieByIdQuery,
  useGetCastByIdQuery,
  useGetVideosByIdQuery,
  useGetMovieListQuery,
  useLazyGetMovieListQuery,
  useLazyGetMovieBySearckKeyWordsQuery,
} = movieCoreApi;
