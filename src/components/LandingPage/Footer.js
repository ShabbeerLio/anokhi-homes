import React from "react";
import "./Footer.css";
import { FaEnvelope, FaFacebook, FaLinkedin, FaPhoneAlt, FaTwitter } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { Link } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import logo from "../../Assets/Anokhi-Homes-horizontal.png"

const Footer = () => {
    return (
        <footer className="footer">
            {/* TOP */}
            <div className="footer-top landing-pages">
                {/* Company */}
                <div className="footer-col">
                    <img className="footer-logo" src={logo} alt="" />
                    <p>
                        At Anokhi Homes, we don't just sell plots we help you own a piece of your future, where your dreams take root and your legacy begins.
                    </p>
                    <div className="footer-col">
                        {/* <h4>Follow Us</h4> */}
                        <div className="social-icons">
                            <Link><FaFacebook /></Link>
                            <Link><FaTwitter /></Link>
                            <Link><FaLinkedin /></Link>
                            <Link><AiFillInstagram /></Link>
                        </div>
                    </div>
                </div>

                {/* Useful Links */}
                <div className="footer-col">
                    <h4>Useful Links</h4>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/plot">Plots</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </div>

                {/* Contact */}
                <div className="footer-col">
                    <h4>Contact Us</h4>
                    <ul className="footer-contact">
                        <li><FaLocationDot/> 406,4th Floor, Pandey Plaza, Exhibition Road, Patna - 800001</li>
                        <li><FaPhoneAlt/> +91 99999 99999</li>
                        <li><FaEnvelope/> anokhihomesprivetlimted@gmail.com</li>
                    </ul>
                </div>
            </div>

            {/* BOTTOM */}
            <div className="footer-bottom landing-pages">
                <p>© 2026 Anokhi Homes Private Limited All rights reserved.</p>
                <p>Designed by : <span>Digital Dezire</span></p>
            </div>
        </footer>
    );
};

export default Footer;