import { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";

function LikeButton({ liked, onLike }) {
  const [isBouncing, setIsBouncing] = useState(false);

  const handleClick = () => {
    onLike(); // Call parent handler
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 300);
  };
  return (
    <button onClick={handleClick} className="text-2xl cursor-pointer btn">
      {liked ? (
        <FaHeart
          className={`text-red-500 transition duration-300 ${
            isBouncing ? "animate-bounce" : ""
          }`}
        />
      ) : (
        <FaRegHeart
          className={`text-gray-500 transition duration-300 ${
            isBouncing ? "animate-bounce" : ""
          }`}
        />
      )}
    </button>
  );
}

export default LikeButton;
