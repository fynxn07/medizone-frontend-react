import { useEffect, useState } from "react";

const slides = [
  {
    img: "/slide2.jpeg"
  },
  {
    img: "/slide3.jpeg"
  },
  {
    img: "/slide1.jpeg"

  },
];

function Slides() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % slides.length); 
    }, 3000);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div className=" bg-black flex items-center justify-center ">
      <div className="relative w-full  py-0 max-w-4xl h-[400px] rounded-2xl overflow-hidden shadow-2xl">

        <img
          src={slides[index].img}
          alt="Slide"
          className="w-full h-full object-cover transition-opacity duration-700"
        />




      </div>

    </div>

  );
}

export default Slides;