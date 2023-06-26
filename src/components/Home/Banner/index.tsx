import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import style from "./style.module.css";
import clsx from "clsx";
import Container from "../../Container";
import { Autoplay, Pagination } from "swiper";
import "swiper/css/pagination";

export default function Banner() {
  return (
    <Container>
      <Swiper
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        slidesPerView={"auto"}
        spaceBetween={30}
        modules={[Autoplay, Pagination]}
        pagination
      >
        <SwiperSlide
          className={clsx("mt-4 rounded-xl border", style.bannerSwiperSlide)}
          style={{
            backgroundImage:
              "url('/full-table-italian-meals-ai-generated-image.jpg')",
          }}
        ></SwiperSlide>
        <SwiperSlide
          className={clsx("mt-4 rounded-xl border", style.bannerSwiperSlide)}
          style={{
            backgroundImage:
              "url('/friends-toasting-with-beer-restaurant.jpg')",
          }}
        ></SwiperSlide>
        <SwiperSlide
          className={clsx("mt-4 rounded-xl border", style.bannerSwiperSlide)}
          style={{
            backgroundImage:
              "url('/side-view-mix-cookies-with-walnut-chocolate-chips-cottage-cheese-puff-pastry-vanilla-sugar-powder.jpg')",
          }}
        ></SwiperSlide>
      </Swiper>
    </Container>
  );
}
