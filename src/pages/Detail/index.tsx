import { useParams } from "react-router";
import styles from "./index.module.scss";
import { useOriginalImg, usew500Image } from "../../hooks/use-img";
import { useGetMovieByIdQuery } from "../../store/services/movieCore";
import CastList from "../../components/CatsList/CastList";
import VideoList from "../../components/VideoList";

const Detail = () => {
  const { category, id } = useParams();

  const { data: item } = useGetMovieByIdQuery({
    category,
    movie_id: Number(id),
  });

  const banner = useOriginalImg(
    item ? item?.backdrop_path || item?.poster_path : ""
  );
  const poster = usew500Image(
    item ? item.poster_path || item.backdrop_path : ""
  );

  return (
    <>
      {item && (
        <>
          <div
            className={styles.banner}
            style={{
              backgroundImage: `url(${banner})`,
            }}
          />
          <div className={`${styles.content} container mb-3`}>
            <div className={styles.content__poster}>
              <div
                className={styles.content__poster__img}
                style={{
                  backgroundImage: `url(${poster})`,
                }}
              />
            </div>
            <div className={styles.content__info}>
              <h1 className={styles.title}>
                {item.title || item.original_title}
              </h1>
              <div className={styles.genres}>
                {item.genres &&
                  item.genres.slice(0, 5).map((genre, i) => (
                    <span key={i} className={styles.genres__item}>
                      {genre.name}
                    </span>
                  ))}
              </div>
              <p className="overview">{item.overview}</p>
              <div className={styles.cast}>
                <div className="section__header">
                  <h2>Casts</h2>
                </div>
                <CastList id={item.id} />
              </div>
            </div>
          </div>
          <div className="container">
            <div className="section mb-3">
              <VideoList id={item.id} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Detail;
