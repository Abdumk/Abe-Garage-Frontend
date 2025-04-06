import React from 'react';
    import backgroundImage from "../../assets/images/banner/banner.jpg";
import Experience from '../components/reuse/experience/Experience';
import Ourservices from '../components/reuse/ourservices/Ourservices';
import Weare from '../components/reuse/weare/Weare';
import  WhyChoose from '../components/reuse/whychoose/WhyChoose';
import Schedule from '../components/reuse/schedule/Schedule';
import QualityService from '../components/reuse/qualityservice/QualityService';
   

function Home() {
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
          <h5>Working since 1992</h5>
          <h2>
           Tuneup your car <br /> to Next Level   
          </h2>
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
              Watch intro video <br /> about us
            </div>
          </div>
        </div>
      </section>
    </div>
    
      <Experience/>
      <Ourservices />
      <QualityService />
      < WhyChoose/>
      <Weare/>
      <Schedule/>
    </>
  )
}

export default Home