import React, { useState, useEffect, useCallback, useRef } from "react";
import { useLocation, useParams, useNavigate } from "react-router";

import styles from "./index.module.scss";

import Button, { OutlineButton } from "../Common/Button";
import { category, Movie, movieType } from "../../store/services/types";
import MovieCard from "../MovieCard";
import {
  useLazyGetMovieBySearckKeyWordsQuery,
  useLazyGetMovieListQuery,
} from "../../store/services/movieCore";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  clearMoviesList,
  setPage,
  setToSetAllMovies,
} from "../../store/slices/movieListSlice";
import Input from "../Common/Input";
import _ from "lodash";

type Props = {
  category?: category | string;
};

const MovieGrid = ({ category }: Props) => {
  const page = useAppSelector((state) => state.movieListReducer.page);
  const totalPages = useAppSelector(
    (state) => state.movieListReducer.total_pages
  );
  const movies = useAppSelector((state) => state.movieListReducer.entities);

  const { keyword } = useParams();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [triggerGetMoreMovies] = useLazyGetMovieListQuery();
  const [triggerGetSearchMovies] = useLazyGetMovieBySearckKeyWordsQuery();

  // const debouncedSearch = React.useRef(
  //   _.debounce((keyword) => {
  //     triggerGetSearchMovies({
  //       keyword: encodeURI(keyword),
  //       category,
  //       page,
  //     });
  //   }, 2000)
  // ).current;

  useEffect(() => {
    if (keyword) {
      // debouncedSearch(keyword);
      triggerGetSearchMovies({
        keyword: encodeURI(keyword),
        category,
        page,
      });
    } else {
      triggerGetMoreMovies({
        movieType: movieType.popular,
        category,
        page,
      });
    }
  }, [page, category, movieType, keyword]);

  useEffect(() => {
    dispatch(clearMoviesList());
    dispatch(setPage(1));
  }, [location.pathname]);

  useEffect(() => {
    dispatch(setToSetAllMovies(true));
    return () => {
      dispatch(setPage(1));
      dispatch(setToSetAllMovies(false));
      dispatch(clearMoviesList());
    };
  }, []);

  if (!movies) return <h1>'Loading....'</h1>;

  return (
    <>
      <div className="section mb-3">
        <MovieSearch category={category} keyword={keyword} />
      </div>
      {Object.values(movies).length > 0 ? (
        <div className={styles.grid}>
          {Object.values(movies).map((item, i) => (
            <MovieCard category={category} item={item} key={i} />
          ))}
        </div>
      ) : (
        <h1 style={{ textAlign: "center", margin: "100px 0" }}>
          Nothing was found for your request
        </h1>
      )}

      <div
        className={styles.grid__loadmore}
        style={{
          display: `${page >= totalPages ? "none" : ""}`,
        }}
      >
        <OutlineButton
          className="small"
          onClick={() => dispatch(setPage(page + 1))}
        >
          Load more
        </OutlineButton>
      </div>
    </>
  );
};

interface SearchProps {
  keyword?: string;
  category?: category | string;
}

const MovieSearch = (props: SearchProps) => {
  const navigation = useNavigate();
  const [keyword, setKeyword] = useState(props.keyword ? props.keyword : "");

  const goToSearch = useCallback(() => {
    if (keyword.trim().length > 0) {
      navigation(`/${props.category}/search/${keyword}`);
    }
  }, [keyword, props.category, navigation]);

  useEffect(() => {
    const enterEvent = (e: any) => {
      e.preventDefault();
      if (e.keyCode === 13) {
        goToSearch();
      } else if (keyword === "") {
        _.debounce(() => {
          navigation(`/${props.category}`);
        }, 1000)();
      }
    };
    document.addEventListener("keyup", enterEvent);
    return () => {
      document.removeEventListener("keyup", enterEvent);
    };
  }, [keyword, goToSearch]);

  return (
    <div className={styles.search}>
      <Input
        type="text"
        placeholder="Enter keyword"
        value={keyword}
        onChange={setKeyword}
      />
      <Button small onClick={goToSearch}>
        Search
      </Button>
    </div>
  );
};

export default MovieGrid;
