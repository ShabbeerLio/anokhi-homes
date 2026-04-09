import React from "react";
import "./Footer.css";
import { FaEnvelope, FaFacebook, FaLinkedin, FaPhoneAlt } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";
import { FaLocationDot, FaXTwitter } from "react-icons/fa6";
import Logo from "../../Assets/Logo/Anokhi Homes.png"

const Footer = () => {
    return (
        <footer className="footer">
            {/* TOP */}
            <div className="footer-top landing-pages">
                {/* Company */}
                <div className="footer-col">
                    <img className="footer-logo" src={Logo} alt="" />
                    {/* <div className="footer-logo">
                        <Logo />
                    </div> */}
                    <p>
                        At Anokhi Homes, we don't just sell plots we help you own a piece of your future, where your dreams take root and your legacy begins.
                    </p>

                </div>

                {/* Useful Links */}
                <div className="footer-col">
                    {/* <h4>Useful Links</h4> */}
                    <ul className="footer-navitems">
                        <li><NavLink to="/contact">Contact Us</NavLink></li>
                        <li><NavLink to="/">Career</NavLink></li>
                        <li><NavLink to="/privacy-policy">Privacy Policy</NavLink></li>
                        <li><NavLink to="/term-condition">Terms & Conditions</NavLink></li>
                        <li><NavLink to="/cancellation-refund">Cancellation and Refund Policy</NavLink></li>
                    </ul>
                </div>

                {/* Contact */}
                <div className="footer-col">
                    {/* <h4>Contact Us</h4> */}
                    <ul className="footer-contact">
                        <li><FaPhoneAlt /> +91 99999 99999</li>
                        <li><FaEnvelope /> anokhihomesprivetlimted@gmail.com</li>
                        <li><FaLocationDot /> Patna, Bihar</li>
                    </ul>
                </div>
                <div className="footer-col">
                    {/* <h4>Follow Us</h4> */}
                    <div className="social-icons">
                        <Link><FaFacebook /></Link>
                        <Link><AiFillInstagram /></Link>
                        <Link><FaLinkedin /></Link>
                        <Link><FaXTwitter /></Link>
                    </div>
                </div>
            </div>

            {/* BOTTOM */}
            <div className="footer-bottom landing-pages">
                <p>© 2026 Anokhi Homes Private Limited | All rights reserved.</p>
                <p>Developed by : <span>Digital Dezire</span></p>
            </div>
        </footer>
    );
};

export default Footer;