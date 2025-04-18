import { ArrowRightOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Carousel } from 'antd';
import { useRef, useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';

const carouselData = [
  {
    image: '/img/homepage-hero-kids.jpg',
    title: 'For Kids',
    description: 'All about how the body works, homework help, and more—just for kids',
    linkText: 'Kid Site',
    linkUrl: '#',
  },
  {
    image: '/img/teens.jpg',
    title: 'For Teens',
    description: 'Explore health, fitness, and study tips tailored for teens',
    linkText: 'Teen Site',
    linkUrl: '#',
  },
];

const LandingPage = () => {
  const carouselRef = useRef(null);
  const [isProcessing, setIsProcessing] = useState(false); 
  const swipeVelocityRef = useRef(0); 

  
  const handleSlideChange = (direction) => {
    if (!isProcessing) {
      setIsProcessing(true);
      if (direction === 'next') {
        carouselRef.current.next();
      } else {
        carouselRef.current.prev();
      }
      
      setTimeout(() => setIsProcessing(false), 1000); 
    }
  };

  const handlePrev = () => handleSlideChange('prev');
  const handleNext = () => handleSlideChange('next');

  
  const swipeHandlers = useSwipeable({
    onSwiping: ({ velocity }) => {
      swipeVelocityRef.current = velocity; 
    },
    onSwipedLeft: () => {
      
      if (!isProcessing && swipeVelocityRef.current < 1.5) {
        handleNext();
      }
    },
    onSwipedRight: () => {
      if (!isProcessing && swipeVelocityRef.current < 1.5) {
        handlePrev();
      }
    },
    delta: 50, 
    preventDefaultTouchmoveEvent: true,
    trackTouch: true,
    trackMouse: false, 
  });

  
  useEffect(() => {
    let isScrolling = false;

    const handleWheel = (event) => {
      if (isScrolling || isProcessing) return;

      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
        event.preventDefault();
        isScrolling = true;

        if (event.deltaX > 30) {
          handleNext();
        } else if (event.deltaX < -30) {
          handlePrev();
        }

        setTimeout(() => {
          isScrolling = false;
        }, 1000); 
      }
    };

    const carouselElem = document.querySelector('.ant-carousel');
    carouselElem?.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      carouselElem?.removeEventListener('wheel', handleWheel);
    };
  }, [isProcessing]);

  return (
    <div
      className="relative"
      {...swipeHandlers}
      style={{ touchAction: 'none' }}
    >
      <Carousel
        ref={carouselRef}
        dots={{ className: 'custom-dots' }}
        effect="scrollx"
        className="w-full"
        
        waitForAnimate 
        speed={1000} 
      >
        {carouselData.map((slide, index) => (
          <div key={index}>
            <div
              className="relative w-full aspect-[5/2] bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute w-full max-w-[300px] text-white top-1/2 -translate-y-1/2 left-30  ">
                <div className="flex flex-col items-start p-4 div-layout">
                  <img
                    src="/img/squiggly-line-png.png"
                    alt="squiggly line"
                    className="w-[120px] h-[40px] object-contain mb-3 sm:w-[150px] sm:h-[50px]"
                  />
                  <h2 className="mb-2 font-semibold">{slide.title}</h2>
                  <p className="mb-3">{slide.description}</p>
                  <a
                    href={slide.linkUrl}
                    className="flex items-center gap-2 text-white hover:text-gray-200 transition-colors"
                  >
                    <span className=" ">{slide.linkText}</span>
                    <ArrowRightOutlined className="link-icon-move" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>

      <div className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 z-20">
        <Button
          shape="circle"
          onClick={handlePrev}
          className="bg-white bg-opacity-70 hover:bg-opacity-90 transition-all"
        >
          <LeftOutlined className="text-gray-800" />
        </Button>
      </div>
      <div className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 z-20">
        <Button
          shape="circle"
          onClick={handleNext}
          className="bg-white bg-opacity-70 hover:bg-opacity-90 transition-all"
        >
          <RightOutlined className="text-gray-800" />
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;