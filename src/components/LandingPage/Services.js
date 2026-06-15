// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "./Services.css";

const Services = ({ data }) => {
  const ServicesData = data?.services;
  return (
    <div className="landing-pages">
      <h2>Our Services</h2>
      <Swiper
        modules={[Navigation]}
        spaceBetween={24}
        slidesPerView={3}
        navigation
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        className="projects-swiper"
      >
        {ServicesData?.map((p, index) => (
          <SwiperSlide key={index}>
            <div className="plot-card card Services-card">
              <div className="plot-img">
                <img src={p.image} alt="" />
              </div>
              <div className="plot-details">
                <h3>{p.title}</h3>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Services;
