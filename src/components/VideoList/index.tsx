import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import styles from "./index.module.scss";
import { useGetVideosByIdQuery } from "../../store/services/movieCore";
import { Videos } from "../../store/services/types";

type Props = {
  id: number;
};

const VideoList = ({ id }: Props) => {
  const { category } = useParams();

  const { data } = useGetVideosByIdQuery({ category, movie_id: id });
  return (
    <>
      {data?.results.slice(0, 3).map((item, i) => (
        <Video key={i} item={item} />
      ))}
    </>
  );
};

type VideoProps = {
  item: Videos;
};
const Video = ({ item }: VideoProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      const height = (iframeRef.current.offsetWidth * 9) / 16 + "px";
      iframeRef.current.setAttribute("height", height);
    }
  }, []);

  return (
    <div className={styles.video}>
      <div className={styles.video__title}>
        <h2>{item.name}</h2>
      </div>
      <iframe
        src={`https://www.youtube.com/embed/${item.key}`}
        ref={iframeRef}
        width="100%"
        title="video"
      ></iframe>
    </div>
  );
};

export default VideoList;
