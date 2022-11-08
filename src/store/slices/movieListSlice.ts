import {
  createSlice,
  createEntityAdapter,
  PayloadAction,
} from "@reduxjs/toolkit";
import { Movie } from "../services/types";
import { RootState } from "../store";

interface MovieListState {
  movies: Movie[];
  page: number;
  total_pages: number;
  toSetAllMovies: boolean;
}

const movieAdapter = createEntityAdapter<Movie>({
  selectId: (movie) => movie.popularity,
});

const initialStateToPass: MovieListState = {
  movies: [],
  page: 1,
  total_pages: 1,
  toSetAllMovies: false,
};

const initialState = movieAdapter.getInitialState({
  ...initialStateToPass,
});

const movieListSlice = createSlice({
  name: "movieList",
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
    setTotalPage(state, action) {
      state.total_pages = action.payload;
    },
    setAllMovie(state, action: PayloadAction<Array<Movie>>) {
      movieAdapter.setAll(state, action.payload);
    },
    upsertManyMovies(state, action: PayloadAction<Array<Movie>>) {
      movieAdapter.upsertMany(state, action.payload);
    },
    clearMoviesList(state) {
      movieAdapter.removeAll(state);
    },
    setToSetAllMovies(state, action: PayloadAction<boolean>) {
      state.toSetAllMovies = action.payload;
    },
  },
});

export const {
  setPage,
  setTotalPage,
  setAllMovie,
  upsertManyMovies,
  setToSetAllMovies,
  clearMoviesList,
} = movieListSlice.actions;

const selectSelf = (state: RootState) => state.movieListReducer;

export const { selectAll: selectAllMovie } = movieAdapter.getSelectors(
  (state: RootState) => selectSelf(state)
);

export default movieListSlice.reducer;
