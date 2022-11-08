import { Link } from "react-router-dom";
import "./index.scss";
import Button from "../Common/Button";
import { usew500Image } from "../../hooks/use-img";
import { category, Movie } from "../../store/services/types";

interface Props {
  item?: Movie ;
  category?: category | string;
}

const MovieCard = ({ item, category }: Props) => {
  const link = "/" + category + "/" + item?.id;
  const bg = usew500Image(item ? item.poster_path || item?.backdrop_path : '');

  return (
    <Link to={link}>
      <div className="card" style={{ backgroundImage: `url(${bg})` }}>
        <Button className="card_btn">
          <i className="bx bx-play"></i>
        </Button>
      </div>
      <h3>{item?.title || item?.original_title}</h3>
    </Link>
  );
};

export default MovieCard;
