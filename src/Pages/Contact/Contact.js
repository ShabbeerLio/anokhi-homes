import React, { useEffect } from "react";
import "./Contact.css";
import { Link, useLocation } from "react-router-dom";
import { FaEnvelope, FaFacebook, FaLinkedin, FaPhoneAlt, FaTwitter } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import LBreadcrumb from "../../components/LandingPage/LBreadcrumb";
import Form from "../../components/Form/Form";
import { AiFillInstagram } from "react-icons/ai";

const Contact = () => {
  return (
    <>
      <div className="landing-head">
        <div className="landing-top">
          <h1>Contact Us</h1>
        </div>
        <LBreadcrumb />
      </div>
      <div className="landing-pages">
        <div className="contact-container">
          {/* LEFT IMAGE */}
          <div className="contact-left">
            <img src="https://images.unsplash.com/photo-1591389703635-e15a07b842d7?q=80&w=2833&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Contact" />
            <div className="contact-left-items">
              <Link to="tel:+918792405697" className="contact-bottom-box card">
                {/* <FaPhoneAlt /> */}
                <h5><FaPhoneAlt /> Phone</h5>
                <p>+91 87924 05697</p>
              </Link>
              <Link
                to="mailto:ssadmission732@gmail.com"
                className="contact-bottom-box card"
              >
                {/* <FaEnvelope /> */}
                <h5><FaEnvelope /> E-mail</h5>
                <p>ssadmission732@gmail.com</p>
              </Link>
            </div>
            <div className="contact-socail-box">
              <Link><FaFacebook /></Link>
              <Link><FaTwitter /></Link>
              <Link><FaLinkedin /></Link>
              <Link><AiFillInstagram /></Link>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="contact-right">
            <div className="test-right">
              <span>Contact Us</span>
              <h2>Get in Touch with Us</h2>
              <Form />
            </div>
          </div>
        </div>
        {/* <div className="contact-bottom">
          <Link to="tel:+918792405697" className="contact-bottom-box card">
            <FaPhoneAlt />
            <h5>Call Cs Any Time!</h5>
            <p>+91 87924 05697</p>
          </Link>
          <Link
            to="mailto:ssadmission732@gmail.com"
            className="contact-bottom-box card"
          >
            <FaEnvelope />
            <h5>Send Us E-mail</h5>
            <p>ssadmission732@gmail.com</p>
          </Link>
          <div className="contact-bottom-box card">
            <div className="contact-socail-box">
              <FaFacebook />
              <FaTwitter />
              <FaLinkedin />
              <AiFillInstagram />
            </div>
            <h5>Social Media</h5>
          </div>
        </div> */}
        <div className="contact-bottom">
          <div className="contact-bottom-box card">
            <FaLocationDot />
            <h5>Head Office</h5>
            <p>
              406,4th Floor, Pandey Plaza, Exhibition Road, Patna - 800001
            </p>
          </div>
          <div className="contact-bottom-box card">
            <FaLocationDot />
            <h5>Branch Office 1</h5>
            <p>
              Basement of Najo Bazar, JK Tower, Qamaruddin Gunj, Biharsharif, Nalanda - 803101
            </p>
          </div>
          <div className="contact-bottom-box card">
            <FaLocationDot />
            <h5>Branch Office 2</h5>
            <p>
              Beside Prabha Inn, Baitarani Road Rajgir, Nalanda, Bihar - 803116
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
