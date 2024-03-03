import React from "react";

export const FoodImgCarousel = ({ post }) => {
  return (
    <>
      <div className="w-70 carousel rounded-box">
        <div className="carousel-item w-full">
          <img
            src={post.image_url}
            className="w-full"
            alt="Tailwind CSS Carousel component"
          />
        </div>
        <div className="carousel-item w-full" id="item1">
          <img
            src="https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg"
            className="w-full"
            alt="Tailwind CSS Carousel component"
          />
        </div>
        <div className="carousel-item w-full" id="item2">
          <img
            src="https://daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg"
            className="w-full"
            alt="Tailwind CSS Carousel component"
          />
        </div>
        <div className="carousel-item w-full" id="item3">
          <img
            src="https://daisyui.com/images/stock/photo-1494253109108-2e30c049369b.jpg"
            className="w-full"
            alt="Tailwind CSS Carousel component"
          />
        </div>
        <div className="carousel-item w-full" id="item4">
          <img
            src="https://daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.jpg"
            className="w-full"
            alt="Tailwind CSS Carousel component"
          />
        </div>
        <div className="carousel-item w-full">
          <img
            src="https://daisyui.com/images/stock/photo-1559181567-c3190ca9959b.jpg"
            className="w-full"
            alt="Tailwind CSS Carousel component"
          />
        </div>
        <div className="carousel-item w-full">
          <img
            src="https://daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.jpg"
            className="w-full"
            alt="Tailwind CSS Carousel component"
          />
        </div>
      </div>
      <div className="flex justify-center w-full py-2 gap-2">
        <a
          href="#item1"
          className="btn-xs shadow-lg btn bg-white border-none  hover:bg-gray-400 hover:text-white hover:scale-110 transition duration-300 ease-in-out transform"
        >
          1
        </a>
        <a
          href="#item2"
          className="btn-xs shadow-lg btn bg-white border-none  hover:bg-gray-400 hover:text-white hover:scale-110 transition duration-300 ease-in-out transform"
        >
          2
        </a>
        <a
          href="#item3"
          className="btn-xs shadow-lg btn bg-white border-none  hover:bg-gray-400 hover:text-white hover:scale-110 transition duration-300 ease-in-out transform"
        >
          3
        </a>
        <a
          href="#item4"
          className="btn-xs shadow-lg btn bg-white border-none  hover:bg-gray-400 hover:text-white hover:scale-110 transition duration-300 ease-in-out transform"
        >
          4
        </a>
      </div>
    </>
  );
};
