// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Icon1 from "../../Assets/icons/Plot Sale Services.png"
import Icon2 from "../../Assets/icons/Liasoning Services.png"
import Icon3 from "../../Assets/icons/Property Services.png"
import Icon4 from "../../Assets/icons/Construction Services.png"
import "./Services.css"

const Services = () => {
    const ServicesData = [
        {
            id: 1,
            title: "Plot Sale Services",
            icons: Icon1
        },
        {
            id: 2,
            title: "Liasoning Services",
            icons: Icon2
        },
        {
            id: 3,
            title: "Property Services",
            icons: Icon3
        },
        {
            id: 4,
            title: "Construction Services",
            icons: Icon4
        },
    ]
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
                {ServicesData.map((p, index) => (
                    <SwiperSlide key={index}>
                        <div className="plot-card card Services-card">
                            <div className="plot-img">
                                <img src={p.icons} alt="" />
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
