import React from "react";
import sell from "../../Assets/icons/sell.png"
import "./CTA.css"
import { TextQuote } from "lucide-react";

const CTA = () => {
    return (
        <div className="landing-pages">
            <div className="testimonial-box">
                <div className="testimonial-box-left">
                    <img src={sell} alt="" />
                </div>
                <div className="testimonial-box-right">
                    <h2>Looking To Sell Your Property</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure ipsam est quidem molestiae esse eaque animi eligendi velit at nulla ab quam, soluta natus perferendis.</p>
                    <button className="btn primary"> <TextQuote />Get Quote</button>
                </div>
            </div>
        </div>
    );
};

export default CTA;
