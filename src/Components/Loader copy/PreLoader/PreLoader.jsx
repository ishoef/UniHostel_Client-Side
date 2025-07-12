import Lottie from 'lottie-react';
import React from 'react';
import preloder from '../../../assets/PreLoader.json';


const PreLoader = ({ className }) => {
  return (
    <div className={className}>
      <Lottie
        style={{ width: "200px" }}
        animationData={preloder}
        loop={true}
      ></Lottie>
    </div>
  );
};

export default PreLoader;