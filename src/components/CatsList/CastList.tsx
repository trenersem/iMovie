import { useParams } from "react-router";
import { usew500Image } from "../../hooks/use-img";
import { useGetCastByIdQuery } from "../../store/services/movieCore";
import styles from "./index.module.scss";

type Props = {
  id: number;
};
const CastList = ({ id }: Props) => {
  const { category } = useParams();
  const { data } = useGetCastByIdQuery({ movie_id: id, category });

  return (
    <div className={styles.casts}>
      {data?.cast?.slice(0, 5).map((item, i) => (
        <div key={i} className={styles.casts__item}>
          <div
            className={styles.casts__item__img}
            style={{
              backgroundImage: `url(${usew500Image(item.profile_path)})`,
            }}
          ></div>
          <p className={styles.casts__name}>{item.name}</p>
        </div>
      ))}
    </div>
  );
};

export default CastList;
