import React from "react";

export const FoodImgCarousel = ({ post }) => {
  return (
    <div className="w-70 carousel rounded-box">
      <div className="carousel-item w-full">
        <img
          src={post.image_url}
          className="w-full"
          alt="Tailwind CSS Carousel component"
        />
      </div>
      <div className="carousel-item w-full">
        <img
          src="https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg"
          className="w-full"
          alt="Tailwind CSS Carousel component"
        />
      </div>
      <div className="carousel-item w-full">
        <img
          src="https://daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg"
          className="w-full"
          alt="Tailwind CSS Carousel component"
        />
      </div>
      <div className="carousel-item w-full">
        <img
          src="https://daisyui.com/images/stock/photo-1494253109108-2e30c049369b.jpg"
          className="w-full"
          alt="Tailwind CSS Carousel component"
        />
      </div>
      <div className="carousel-item w-full">
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
  );
};
