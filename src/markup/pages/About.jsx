import React from 'react'
import Weare from '../components/reuse/weare/Weare';
import  WhyChoose from '../components/reuse/whychoose/WhyChoose';
import Schedule from '../components/reuse/schedule/Schedule';
import Experience from '../components/reuse/experience/Experience';
//import backgroundImage from '../../assets/template_assets/images/background/bg-1.jpg'; // Update path if needed
import backgroundImage from '../../assets/images/banner/path_banner.jpg'; // Update path if needed

//import tireImg from "../../assets/template_assets/images/resource/image-5.jpg"; // Adjust path accordingly
import tireImg from "../../assets/images/banner/car-tires-showcased.jpg"; // Adjust path accordingly

function About() {
  return (
    <>
  <div className="page-wrapper">
      <section className="video-section">
        <div
          data-parallax='{"y": 50}'
          className="sec-bg"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        ></div>
        <div className="auto-container">
          {/* <h5>Working since 1992</h5> */}
          <h2>About Us</h2>
          <div className="video-box">
            <div className="video-btn">
              <a
                href="https://www.youtube.com/watch?v=nfP5N9Yc72A&t=28s"
                className="overlay-link lightbox-image video-fancybox ripple"
              >
                <i className="flaticon-play"></i>
              </a>
            </div>
            <div className="text">
              Home <br /> About Us
            </div>
          </div>
        </div>
      </section>

      <div className="page-wrapper">
        <section className="about-section">
          <div className="auto-container">
            <div className="row align-items-center">
              
              {/* Left Column - Text */}
              <div className="col-lg-7 pr-lg-5">
              <div className="sec-title no-bg">
  <h2>We are highly skilled mechanics<br />for your car repair</h2>
  <div className="text">
    <p>
      We provide top-notch automotive repair services backed by years of hands-on experience and technical expertise. Our mechanics are trained to handle a wide range of car issues efficiently and professionally.
    </p>
    <p>
      Whether it's routine maintenance or complex engine diagnostics, you can count on us to deliver reliable, honest, and affordable service every time. Your satisfaction and safety are our top priorities.
    </p>
  </div>
</div>
              </div>

              {/* Right Column - Image */}
              <div className="col-lg-5">
                <div className="image-box">
                  <img src={tireImg} alt="Tire" />
                  
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>

      <Experience/>
<WhyChoose/>
      <Weare/>
      <Schedule/>
        </div>

    </>
  )
}

export default About