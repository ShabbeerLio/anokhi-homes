// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "./Testimonial.css"
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";


const Testimonial = () => {
    const ServicesData = [
        {
            id: 1,
            title: "Anokhi homes 1",
            desig: "CEO & Co-Founder",
            images: "https://i.pravatar.cc/80?img=1",
            description: "this is the description of the testimonal 1 this is the description of the testimonal 1 this is the description of the testimonal 1.  this is the description of the testimonal 1. this is the description of the testimonal 1 this is the description of the testimonal 1 this is the description of the testimonal 1 "
        },
        {
            id: 2,
            title: "Anokhi homes 2",
            desig: "CEO & Co-Founder",
            images: "https://i.pravatar.cc/80?img=1",
            description: "this is the description of the testimonal 2 this is the description of the testimonal 2 this is the description of the testimonal 2this is the description of the testimonal 2this is the description of the testimonal 2this is the description of the testimonal 2this is the description of the testimonal 2this is the description of the testimonal 2"
        },
        {
            id: 3,
            title: "Anokhi homes 3",
            desig: "CEO & Co-Founder",
            images: "https://i.pravatar.cc/80?img=1",
            description: "this is the description of the testimonal 3 this is the description of the testimonal 2this is the description of the testimonal 2this is the description of the testimonal 2this is the description of the testimonal 2this is the description of the testimonal 2this is the description of the testimonal 2this is the description of the testimonal 2"
        },
        {
            id: 4,
            title: "Anokhi homes 4",
            desig: "CEO & Co-Founder",
            images: "https://i.pravatar.cc/80?img=1",
            description: "this is the description of the testimonal 4 this is the description of the testimonal 2this is the description of the testimonal 2this is the description of the testimonal 2this is the description of the testimonal 2this is the description of the testimonal 2this is the description of the testimonal 2this is the description of the testimonal 2"
        },
    ];
    return (
        <div className="landing-pages">
            <h2>Testimonial</h2>
            <Swiper
                modules={[Navigation]}
                spaceBetween={24}
                slidesPerView={2}
                navigation
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                    },
                    640: {
                        slidesPerView: 2,
                    }
                }}
                className="projects-swiper"
            >
                {ServicesData.map((p, index) => (
                    <SwiperSlide key={index}>
                        <div className="Testimonial-card card">
                            <div className="Testimonial-details">
                                <FaQuoteLeft className="svg-left" />
                                <p>{p.description}</p>
                                <FaQuoteRight className="svg-right" />
                            </div>
                            <div className="Testimonial-img">
                                <img src={p.images} alt="" />
                                <div className="testimonial-title">
                                    <h3>{p.title}</h3>
                                    <p>{p.desig}</p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Testimonial;
