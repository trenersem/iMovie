import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { OutlineButton } from "../../components/Common/Button";
import HeroSlide from "../../components/HeroSlide";
import MovieList from "../../components/MovieList";
import { useAuth } from "../../hooks/use-auth";
import { category, movieType, tvType } from "../../store/services/types";

const HomePage = () => {
  const navigateTo = useNavigate();
  const { isAuth } = useAuth();

  useEffect(() => {
    !isAuth && navigateTo("/login");
  }, [isAuth]);

  return (
    <>
      <HeroSlide />
      <div className="contrainer">
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Trending Movies</h2>
            <Link to="/movie">
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <MovieList type={movieType.popular} category={category.movie} />
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Top Rated Movies</h2>
            <Link to="/movie">
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.movie} type={movieType.top_rated} />
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Trending TV</h2>
            <Link to="/tv">
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.tv} type={tvType.popular} />
        </div>
      </div>
    </>
  );
};

export default HomePage;
