import { FaRegHeart, FaHeart } from "react-icons/fa";

function LikeButton({ liked, onLike }) {
  const handleClick = () => {
    onLike(); // Call parent handler
  };
  return (
    <button onClick={handleClick} className="text-2xl cursor-pointer btn">
      {liked ? (
        <FaHeart className={`text-red-500 transition duration-300 `} />
      ) : (
        <FaRegHeart className={`text-gray-500 transition duration-300`} />
      )}
    </button>
  );
}

export default LikeButton;
