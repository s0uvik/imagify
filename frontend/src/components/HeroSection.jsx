import { assets } from "../assets/assets";

const HeroSection = () => {
  return (
    <div className=" flex flex-col justify-center items-center my-20">
      <div className=" text-stone-500 inline-flex text-center gap-2 bg-white px-6 py-1 rounded-full border ">
        <p>Best text ot image generator</p>
        <img src={assets.star_icon} alt="" />
      </div>
      <h1 className=" text-4xl max-w-[300px sm:text-7xl sm:max-w-[590px] mx-auto mt-10 text-center">
        Turn text to <span className=" text-blue-600">image</span>, in seconds.
      </h1>
      <p
        className=" text-center
       max-w-xl mx-auto mt-5"
      >
        Unleash your creativity with AI. Turn your imagination into visual art
        in seconds - just type, and watch the magic happend.
      </p>
      <button className=" sm:text-lg text-white bg-black w-auto mt-8 px-12 py-3 flex items-center gap-2 rounded-full">
        <p className="">Generate Images</p>
        <img src={assets.star_group} alt="" className="w-6" />
      </button>
      <div className=" flex flex-wrap justify-center mt-12 gap-3">
        {Array(6)
          .fill("")
          .map((_, index) => {
            return (
              <img
                className=" rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10"
                src={
                  index % 2 === 0 ? assets.sample_img_1 : assets.sample_img_2
                }
                alt=""
                key={index}
                width={70}
              />
            );
          })}
      </div>
      <p className=" mt-2 text-neutral-500">Generated images from imagify</p>
    </div>
  );
};

export default HeroSection;
