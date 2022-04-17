import { Skeleton } from "@mantine/core";
import React, { useEffect, useRef, useState } from "react";
import { SwiperSlide } from "swiper/react";

const DataCollectedSlide = ({
  dataCollectedImage,
  dataCollectedDate,
  dataCollectedLocation,
  dataCollectedTime,
  dataCollectedDescription,
}) => {
  const [img, setImg] = useState();

  const mountedRef = useRef(true);

  useEffect(() => {
    const image = new Image();
    image.src = dataCollectedImage;
    console.log(image);
    image.onload = () => {
      setTimeout(() => {
        if (mountedRef.current) {
          setImg(image);
        }
      }, 300);
    };
    return () => {
      setTimeout(() => {
        mountedRef.current = false;
      }, 400);
    };
  }, []);

  return (
    <>
      {img ? (
        <div className="data-collected__content--wrapper">
          <div className="data__collected--image">
            <img src={img?.src} alt="" />
          </div>
          <div>date_created: {dataCollectedDate}</div>
          <div>Location Collected: {dataCollectedLocation}</div>
          <div>Time Collected:{dataCollectedTime}</div>
          <div>Description:{dataCollectedDescription}</div>
        </div>
      ) : (
        <>
          <Skeleton
            animate={false}
            height={700}
            width="90%"
            mb="md"
            mx="auto"
          />
          <Skeleton animate={false} height={20} width="80%" mb="md" mx="auto" />
          <Skeleton animate={false} height={20} width="80%" mb="md" mx="auto" />
          <Skeleton animate={false} height={20} width="60%" mb="md" mx="auto" />
          <Skeleton animate={false} height={20} width="80%" mb="md" mx="auto" />
        </>
      )}
    </>
  );
};

export default DataCollectedSlide;
