import { SwiperSlide, Swiper } from "swiper/react";
import MovieCard from "../MovieCard";
import "./index.scss";
import { useGetMovieListQuery } from "../../store/services/movieCore";
import { category, movieType, tvType } from "../../store/services/types";
import Loading from "../Common/Loading";

interface Props {
  id?: number | string;
  type: movieType | tvType;
  category?: category | string;
}

const MovieList = ({ type, category }: Props) => {
  const { data, isFetching } = useGetMovieListQuery({
    movieType: type,
    category,
    page: 1,
  });
  const items = data?.results;

  if (isFetching) return <Loading />;

  return (
    <div className="movie-list">
      <Swiper grabCursor={true} spaceBetween={12} slidesPerView={"auto"}>
        {items?.map((item, i) => (
          <SwiperSlide key={i}>
            <MovieCard item={item} category={category} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieList;
