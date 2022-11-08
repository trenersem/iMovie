import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import MovieGrid from "../../components/MovieGrid";
import PageHeader from "../../components/PageHeader";
import { useAuth } from "../../hooks/use-auth";
import { category as cate } from "../../store/services/types";

const Catalog = () => {
  const { category } = useParams();
  const navigateTo = useNavigate();
  const { isAuth } = useAuth();

  useEffect(() => {
    !isAuth && navigateTo("/login");
  }, [isAuth]);

  return (
    <>
      <PageHeader>
        {category === cate.movie ? "Movies" : "TV Series"}
      </PageHeader>
      <div className="container">
        <div className="section mb-3">
          <MovieGrid category={category} />
        </div>
      </div>
    </>
  );
};

export default Catalog;
