import React, { useState } from "react";
import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Button, { OutlineButton } from "../Common/Button";
import { useNavigate } from "react-router";
import styles from "./index.module.scss";
import "swiper/css";
import {
  useGetMovieQuery,
  useGetVideosByIdQuery,
} from "../../store/services/movieCore";
import { useOriginalImg, usew500Image } from "../../hooks/use-img";
import { Movie } from "../../store/services/types";
import MyModal from "../Common/Modal";
import Loading from "../Common/Loading";

const HeroSlide = () => {
  const { data, isFetching } = useGetMovieQuery();
  const movieItems = data?.results.slice(1, 9);
  SwiperCore.use([Autoplay]);

  if (isFetching) return <Loading />;

  return (
    <div className={styles.hero_slide}>
      <Swiper
        modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        // autoplay={{delay: 4000}}
      >
        {movieItems?.map((item: Movie, i: number) => (
          <SwiperSlide key={i}>
            {({ isActive }) => (
              <HeroSlideItem
                item={item}
                className={`${isActive ? styles.active : ""}`}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

interface Props {
  item: Movie;
  className?: string;
}

const HeroSlideItem = ({ item, className }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: videos } = useGetVideosByIdQuery({ movie_id: item.id });
  let navigation = useNavigate();

  const background = useOriginalImg(
    item.backdrop_path ? item.backdrop_path : item.poster_path
  );
  const poster = usew500Image(item.poster_path);

  return (
    <div
      className={`${styles.item} ${className}`}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className={`${styles.item__content} container`}>
        <div className={styles.item__content__info}>
          <h2 className={styles.title}>{item.title}</h2>
          <div className={styles.overview}>{item.overview}</div>
          <div className={styles.btns}>
            <Button onClick={() => navigation("/movie/" + item.id)}>
              Watch now
            </Button>
            <OutlineButton onClick={() => setIsModalOpen(!isModalOpen)}>
              Watch trailer
            </OutlineButton>
          </div>
        </div>
        <div className={styles.item__content__poster}>
          <img src={poster} alt="poster" />
        </div>
      </div>
      {isModalOpen && (
        <MyModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(!isModalOpen)}
        >
          <iframe
            src={`https://www.youtube.com/embed/${videos?.results[0].key}`}
            width="100%"
            height="500px"
            title="trailer"
          ></iframe>
        </MyModal>
      )}
    </div>
  );
};

export default HeroSlide;
