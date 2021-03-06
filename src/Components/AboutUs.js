import React from "react";
import { Github, Linkedin, EnvelopeFill } from "react-bootstrap-icons";
import Carmen from "../Assets/img/Carmen.jpg";
import Al from "../Assets/img/Al.jpg";
import Jake from "../Assets/img/Jake.jpg";
import "./aboutUs.css";

export default function AboutUs() {
  return (
    <div className="container">
      <div className="block-heading">
        <p className=" h1 blue-text text-center p-4 ">About Us</p>
        <p className=" h5 text-center p-4 mb-5 blue-text">
          We are a team of full-stack web developers working on a way to make finding contractors and managing work needed for your home a breeze!
        </p>
      </div>
      <div className="row justify-content-center">
        <div className="col-sm-6 col-lg-4">
          {/* Jake's Card */}
          <div className="card text-center clean-card ratio-1x1 h-75 p-2 ms-2 me-2">
            <img className="card-img-top d-block resize .img-fluid" alt="Profile" src={Jake} />
            <div className="card-body info">
              <h4 className="card-title">Jake Jenkins</h4>
              <p className="card-text">Full-Stack Web Developer with DigitalCrafts</p>
              <a href="mailto: jake.jenkins9510@gmail.com" target="_blank" rel="noreferrer">
                <EnvelopeFill size={40} className="p-1" />
              </a>
              <a href="https://github.com/jakejenk" target="_blank" rel="noreferrer">
                <Github size={40} className="p-1" />
              </a>
              <a href="https://www.linkedin.com/in/jakesjenkins/" target="_blank" rel="noreferrer">
                <Linkedin size={36} className="p-1" />
              </a>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-lg-4">
          {/* Carmen's Card */}
          <div className="card text-center clean-card ratio-1x1 h-75 p-2 ms-2 me-2">
            <img className="card-img-top d-block resize .img-fluid" alt="Profile" src={Carmen} />
            <div className="card-body info">
              <h4 className="card-title">Carmen Kesho</h4>
              <p className="card-text">Full-Stack Web Developer with DigitalCrafts</p>
              <a href="mailto: miss.cdv@gmail.com" target="_blank" rel="noreferrer">
                <EnvelopeFill size={40} className="p-1" />
              </a>
              <a href="https://github.com/CVKesho82" target="_blank" rel="noreferrer">
                <Github size={40} className="p-1" />
              </a>
              <a href="https://www.linkedin.com/in/carmenvkesho/" target="_blank" rel="noreferrer">
                <Linkedin size={36} className="p-1" />
              </a>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-lg-4">
          {/* Al's Card */}
          <div className="card text-center clean-card ratio-1x1 h-75 p-2 ms-2 me-2">
            <img className="card-img-top resize .img-fluid" alt="Profile" src={Al} />
            <div className="card-body info">
              <h4 className="card-title">Al Conlan</h4>
              <p className="card-text">Full-Stack Web Developer with DigitalCrafts</p>
              <a href="mailto: alfred.h.conlan@gmail.com" target="_blank" rel="noreferrer">
                <EnvelopeFill size={40} className="p-1" />
              </a>
              <a href="https://github.com/AlfredConlan" target="_blank" rel="noreferrer">
                <Github size={40} className="p-1" />
              </a>
              <a href="https://www.linkedin.com/in/alconlan/" target="_blank" rel="noreferrer">
                <Linkedin size={36} className="p-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
