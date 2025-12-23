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
    <div className="bg-black flex items-center justify-center mt-4">
      <div className="relative w-full max-w-5xl h-[260px] sm:h-[320px] md:h-[400px] rounded-2xl overflow-hidden shadow-2xl">
        <img
          src={slides[index].img}
          className="w-full h-full object-cover"
        />
      </div>
    </div>


  );
}

export default Slides;