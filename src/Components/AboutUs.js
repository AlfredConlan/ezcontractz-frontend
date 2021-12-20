import React from "react";
import { Github, Linkedin, EnvelopeFill } from "react-bootstrap-icons";
import Carmen from "../Assets/img/Carmen.jpg";
import Al from "../Assets/img/Al.jpg";

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
          <div className="card text-center clean-card ratio-1x1">
            <img
              className="card-img-top w-100 d-block"
              alt="Profile"
              src="data:image/jpeg;base64,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"
            />
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
          <div className="card text-center clean-card ratio-1x1">
            <img className="card-img-top w-100 d-block" alt="Profile" src={Carmen} />
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
          <div className="card text-center clean-card ratio-1x1">
            <img className="card-img-top w-100 d-block" alt="Profile" src={Al} />
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
