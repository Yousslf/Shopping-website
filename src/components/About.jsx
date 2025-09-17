import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
const About = () => {
  return (
    <div className="about">
      <h2>About Us</h2>
      <p>
        Welcome to our online store! We offer a wide range of products to meet
        your needs.
      </p>
      <p>Our mission is to provide high-quality items at competitive prices.</p>
      <p>Thank you for choosing us!</p>
      <div className="icons">
        <FontAwesomeIcon icon={faFacebook} />
        <FontAwesomeIcon icon={faWhatsapp} />
        <FontAwesomeIcon icon={faTwitter} />
      </div>
    </div>
  );
};

export default About;
