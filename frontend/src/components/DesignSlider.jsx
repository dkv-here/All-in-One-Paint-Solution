import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import designimg1 from "./designimg1.jpg";
import designimg2 from "./designimg2.jpg";
import designimg3 from "./designimg3.jpg";
import { useState } from 'react';
import { ShoppingCartIcon, CubeIcon } from "@heroicons/react/24/outline";
import { FaPaintRoller } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';



const DesignSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const settings = {
    dots: true,              
    infinite: true,          
    speed: 500,           
    slidesToShow: 1,      
    slidesToScroll: 1,     
    autoplay: true,        
    autoplaySpeed: 3000,
    pauseOnHover: false,
    beforeChange: (current, next) => {
      setCurrentIndex(next);
    },
  };

  const images = [
    designimg1,
    designimg2,
    designimg3,
    
  ];

  const slideContents = [
    { 
      title: "A New Look Starts Here", 
      text: "Find top-tier paint products that will transform your space, whether you're refreshing a room or creating something new.", 
      buttonText: "Explore Our Collection",
      icon: <ShoppingCartIcon className="w-12 h-12 text-white mb-4" />,
      route: "/shop"
    },
    { 
      title: "Design Your Dream Space in 3D", 
      text: "Not sure how a paint will look? See it in 3D! Try our 3D room visualizer to experiment with endless design possibilities.", 
      buttonText: "Start Designing",
      icon: <CubeIcon className="w-12 h-12 text-white mb-4" />,
      route: "/customize"
    },
    { 
      title: "Transform Your Space with Expert Care", 
      text: "Our professional painting services are designed to bring precision and perfection. Let us help you create a flawless finish with minimal hassle.", 
      buttonText: "Book a Service",
      icon: <FaPaintRoller className="w-11 h-11 text-white mb-4" />,
      route: "/service" 
    },
  ];

  return (
    <div className="relative w-full h-[600px]">
      <div className="absolute top-0 bottom-1/2 w-full h-full bg-gradient-to-b from-black/90 to-transparent z-10 pointer-events-none"></div>

      {/* Dynamic Text and Button */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-center">
        <div className="mb-6">
          {slideContents[currentIndex].icon}
        </div>
        <h1 className="text-white text-4xl font-bold mb-4">{slideContents[currentIndex].title}</h1>
        <p className="text-white text-lg mb-6">{slideContents[currentIndex].text}</p>
        <button className="bg-pink-500 text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:bg-pink-600"
        onClick={() => navigate(slideContents[currentIndex].route)}>
          {slideContents[currentIndex].buttonText}
        </button>
      </div>

      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className='h-[600px]'>
            <img 
              src={image} 
              alt={`Slide ${index + 1}`} 
              className="w-full" 
            />
            <div className="bg-gradient-to-l from-black/10 to-transparent"></div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default DesignSlider;
