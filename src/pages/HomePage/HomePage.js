import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import MailingList from '../../components/MailingList/MailingList';
import Footer from '../../components/Footer/Footer';

import './HomePage.scss';

const featuredPhotos = [
  null,
  'featured-photo-2.png',
  'featured-photo-3.png',
  'featured-photo-4.png',
  'featured-photo-5.png',
  'featured-photo-1.png',
  null,
];

// const animationTime = 500;

const HomePage = () => {
  const navigate = useNavigate();

  const [imageSliderState, setImageSliderState] = useState({
    startingImageIndex: 0,
    isFromLeft: false,
    isFromRight: false,
  });

  const [formEmail, setFormEmail] = useState('');
  const [formName, setFormName] = useState('');
  const [formSubject, setFormSubject] = useState('');
  const [formMessage, setFormMessage] = useState('');

  const getNextStartingIndex = (change) => {
    const newIndex = imageSliderState.startingImageIndex + change;
    if (newIndex < 0 || newIndex > featuredPhotos.length - 5) {
      return imageSliderState.startingImageIndex;
    }
    return newIndex;
  };

  const handleArrowClick = (change) => {
    if (change === -1) {
      const newIndex = getNextStartingIndex(-1);
      if (newIndex === imageSliderState.startingImageIndex) {
        return;
      }

      setImageSliderState({
        startingImageIndex: getNextStartingIndex(-1),
        isFromLeft: true,
        isFromRight: false,
      });
    }
    if (change === 1) {
      const newIndex = getNextStartingIndex(1);
      if (newIndex === imageSliderState.startingImageIndex) {
        return;
      }

      setImageSliderState({
        startingImageIndex: getNextStartingIndex(1),
        isFromLeft: false,
        isFromRight: true,
      });
    }
  };

  const renderFeaturedPhotos = () => {
    // return featuredPhotos.map((fileName) => <img src={`/images/${fileName}`} />);

    const renderedFeaturedPhotos = [];

    // for (let i = startImageIndex; i < startImageIndex + 4; i++) {
    //   const isFinalClass = i === startImageIndex + 3 ? 'final' : '';
    //   renderedFeaturedPhotos.push(
    //     <img className={`s2-img-slider-img ${isFinalClass}`} src={`/images/${featuredPhotos[i]}`} />
    //   );
    // }
    const fromLeftClass = imageSliderState.isFromLeft ? 'from-left' : '';
    const fromRightClass = imageSliderState.isFromRight ? 'from-right' : '';

    for (let i = 0; i < 5; i++) {
      if (imageSliderState.startingImageIndex === 0 && i === 0) {
        //Fake image div to balance out positioning, is never in view.
        renderedFeaturedPhotos.push(
          <div className="s2-img-slider-img s2-img-slider-fake-img-div"></div>
        );
        continue;
      }

      renderedFeaturedPhotos.push(
        <img
          alt="slider"
          className={`s2-img-slider-img ${fromLeftClass} ${fromRightClass} ${imageSliderState.startingImageIndex}`}
          src={`/images/${
            featuredPhotos[i + imageSliderState.startingImageIndex]
          }`}
          key={+new Date() + i}
        />
      );
    }

    return renderedFeaturedPhotos;
  };

  const renderFeaturedPhotosArrows = () => {
    return (
      <div className="hp-s2-photo-arrows">
        <svg
          className="sp-arrow-left"
          onClick={() => {
            handleArrowClick(-1);
          }}
          width="39"
          height="39"
          viewBox="0 0 39 39"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="0.5" y="0.5" width="38" height="38" stroke="#8D8A8A" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M29.4324 19.4998C29.4324 19.8221 29.3016 20.1313 29.0687 20.3592C28.8359 20.5871 28.5201 20.7152 28.1908 20.7152H13.8055L19.137 25.9315C19.2524 26.0445 19.344 26.1787 19.4065 26.3263C19.4689 26.474 19.5011 26.6322 19.5011 26.792C19.5011 26.9518 19.4689 27.1101 19.4065 27.2577C19.344 27.4053 19.2524 27.5395 19.137 27.6525C19.0215 27.7655 18.8845 27.8551 18.7337 27.9163C18.5828 27.9774 18.4212 28.0089 18.2579 28.0089C18.0947 28.0089 17.933 27.9774 17.7822 27.9163C17.6313 27.8551 17.4943 27.7655 17.3789 27.6525L9.92922 20.3603C9.8136 20.2474 9.72186 20.1133 9.65926 19.9656C9.59667 19.818 9.56445 19.6597 9.56445 19.4998C9.56445 19.34 9.59667 19.1817 9.65926 19.034C9.72186 18.8863 9.8136 18.7522 9.92922 18.6393L17.3789 11.3471C17.612 11.1189 17.9282 10.9907 18.2579 10.9907C18.5876 10.9907 18.9038 11.1189 19.137 11.3471C19.3701 11.5754 19.5011 11.8849 19.5011 12.2076C19.5011 12.5304 19.3701 12.8399 19.137 13.0681L13.8055 18.2844H28.1908C28.5201 18.2844 28.8359 18.4125 29.0687 18.6404C29.3016 18.8683 29.4324 19.1775 29.4324 19.4998Z"
            fill="#8D8A8A"
          />
        </svg>
        <svg
          className="sp-arrow-right"
          onClick={() => {
            handleArrowClick(1);
          }}
          width="39"
          height="39"
          viewBox="0 0 39 39"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="-0.5"
            y="0.5"
            width="38"
            height="38"
            transform="matrix(-1 0 0 1 38 0)"
            stroke="#8D8A8A"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.56762 19.4998C9.56762 19.8221 9.69843 20.1313 9.93128 20.3592C10.1641 20.5871 10.4799 20.7152 10.8092 20.7152H25.1945L19.863 25.9315C19.7476 26.0445 19.656 26.1787 19.5935 26.3263C19.5311 26.474 19.4989 26.6322 19.4989 26.792C19.4989 26.9518 19.5311 27.1101 19.5935 27.2577C19.656 27.4053 19.7476 27.5395 19.863 27.6525C19.9785 27.7655 20.1155 27.8551 20.2663 27.9163C20.4172 27.9774 20.5788 28.0089 20.7421 28.0089C20.9053 28.0089 21.067 27.9774 21.2178 27.9163C21.3687 27.8551 21.5057 27.7655 21.6211 27.6525L29.0708 20.3603C29.1864 20.2474 29.2781 20.1133 29.3407 19.9656C29.4033 19.818 29.4355 19.6597 29.4355 19.4998C29.4355 19.34 29.4033 19.1817 29.3407 19.034C29.2781 18.8863 29.1864 18.7522 29.0708 18.6393L21.6211 11.3471C21.388 11.1189 21.0718 10.9907 20.7421 10.9907C20.4124 10.9907 20.0962 11.1189 19.863 11.3471C19.6299 11.5754 19.4989 11.8849 19.4989 12.2076C19.4989 12.5304 19.6299 12.8399 19.863 13.0681L25.1945 18.2844H10.8092C10.4799 18.2844 10.1641 18.4125 9.93128 18.6404C9.69843 18.8683 9.56762 19.1775 9.56762 19.4998Z"
            fill="#8D8A8A"
          />
        </svg>
      </div>
    );
  };

  const handleContactUsSubmit = (e) => {
    e.preventDefault();
    return;
  };

  return (
    <div className="home-page">
      <NavBar />
      <div className="section-1-container">
        <div className="section-1">
          <div className="hp-1-images-container">
            <img
              src="/images/clouds-photo-2.png"
              alt="skylight-photography"
              className="hp-1-image-under"
            />
            <img
              src="/images/finger-photo-2.png"
              alt="skylight-photography"
              className="hp-1-image-over"
            />
          </div>
          <div className="hp-1-content-right">
            <div className="hp-1-welcome-text">Welcome To</div>
            <div className="hp-1-sp">Skylight Photography</div>
            <div className="hp-1-description">
              Profesional Photography Services centered in the Norfolk Rocklands
              St Peter area. Check out our digital shop or read more about us
              below.
            </div>
            <button
              className="button-orange hp-1-shop-button"
              onClick={() => {
                navigate('/shop');
              }}
            >
              Shop
            </button>
          </div>
        </div>
      </div>
      <div className="sp-section-2-container">
        <div className="sp-section-2">
          <div className="sp-s2-content-left">
            <div className="sp-s2-title">Featured Photos</div>
            <div className="sp-s2-description">
              We specialise in Landscape Photography which can be seen
              throughout our shop. We vary from beautfiul river scapes to the
              streets of Milan. These featured photos are available for purchase
              in the shop.
            </div>
            <button className="button-orange sp-s2-shop-all-button">
              <Link to="/shop">Shop All</Link>
            </button>
          </div>
          <div className="sp-s2-content-right">
            <div className="sp-s2-photo-slider">
              <>{renderFeaturedPhotos()}</>
            </div>
            <div> {renderFeaturedPhotosArrows()}</div>
          </div>
        </div>
      </div>
      <div className="section-3-container">
        <div className="section-3">
          <div className="s3-about-us-container">
            <div className="s3-about-us-title">About Us</div>
            <div className="s3-about-us-text s3-about-us-text-1">
              Skylight Photography is a Proud small business centered in the
              Norfolk Rocklands St Peter area! We not only sell our own
              photographs but also are avaliable for private event photography.
              See our contact us section below for more details.
            </div>
            <div className="s3-about-us-text s3-about-us-text-2">
              {/* Skylight Photography isn’t just a business but a family of photographers. We take the wellbeing and
              happiness of both our staff and clients with great pride. CEO, and Lead Photographer George Ward has been
              looking after Skylight Photography for nearly 5 years now, and is at the forefront of the business still
              to this day. */}
            </div>
          </div>
          <div className="s3-images-container">
            <img
              className="s3-image-behind"
              alt="skylight-photography"
              src="/images/s3-behind.png"
            />
            <img
              className="s3-image-top"
              alt="skylight-photography"
              src="/images/s3-front.png"
            />
          </div>
        </div>
      </div>
      <div className="section-4-container">
        <div className="section-4">
          <div className="s4-line s4-line-top"></div>
          <div className="s4-title">Contact Us</div>
          <div className="s4-contact-us-container">
            <form className="s4-cu-form" onSubmit={handleContactUsSubmit}>
              <input
                className="s4-cu-form-input"
                name="email"
                type="email"
                placeholder="E-mail Address"
                value={formEmail}
                onChange={(e) => {
                  setFormEmail(e.target.value);
                }}
              />
              <input
                className="s4-cu-form-input"
                name="name"
                type="text"
                placeholder="Name"
                value={formName}
                onChange={(e) => {
                  setFormName(e.target.value);
                }}
              />
              <input
                className="s4-cu-form-input"
                name="subject"
                type="text"
                placeholder="Subject"
                value={formSubject}
                onChange={(e) => {
                  setFormSubject(e.target.value);
                }}
              />
              <input
                className="s4-cu-form-input"
                name="message"
                type="text"
                placeholder="Message"
                value={formMessage}
                onChange={(e) => {
                  setFormMessage(e.target.value);
                }}
              />
              <button
                className="button-orange s4-cu-submit-button"
                type="submit"
              >
                Send
              </button>
            </form>
            <div className="s4-cu-right">
              <div className="s4-cu-subtitle">Let’s Connect</div>
              <div className="s4-cu-text">
                Here at Skylight Photography we provide a range of services
                including private event photography. We specialise in aerial,
                weddings, sports, events, product, food and much more! If you
                have any questions please contact the team now and we will get
                back to you as soon as possible.
              </div>
              <div className="s4-cu-text">
                If you want to keep up to date with the latest Skylight
                Photography news then subscribe to our Mailing List below to get
                Newsletters and more!
              </div>
            </div>
          </div>
          <div className="s4-line s4-line-bottom"></div>
        </div>
        <MailingList />
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
