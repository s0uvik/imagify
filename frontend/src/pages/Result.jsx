import { useState } from "react";
import { assets } from "../assets/assets";

const Result = () => {
  const [image, setImage] = useState(assets.sample_img_1);
  const [isImageLoaded, setImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className=" flex flex-col justify-center items-center min-h-[90vh]">
      <div>
        <div>
          <img src={image} alt="" className="max-w-sm rounded" />
        </div>
        {loading && <p>Loading .....</p>}
      </div>
      {isImageLoaded ? (
        <div className="flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full">
          <button
            onClick={() => setImageLoaded(false)}
            className="bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer"
          >
            Generate Another
          </button>
          <a
            href={image}
            className="bg-zinc-900 px-10 py-3 rounded-full cursor-pointer"
            download
          >
            Download
          </a>
        </div>
      ) : (
        <form className=" flex w-full max-w-xl bg-neutral-500 text-white text-sm p-1 mt-10 rounded-full">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe what you want to create"
            className=" flex-1 bg-transparent outline-none ml-6 max-sm:w-20"
          />
          <button
            onClick={handleSubmit}
            className=" bg-zinc-900 px-10 sm:px-16 py-3 rounded-full text-white"
          >
            Generate
          </button>
        </form>
      )}
    </div>
  );
};

export default Result;
