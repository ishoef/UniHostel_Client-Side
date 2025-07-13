import React from 'react';
import { VscLayersActive } from 'react-icons/vsc';

const Activity = () => {
    return (
      <div className="w-full border border-gray-300 rounded-2xl shadow  h-full flex justify-center items-center">
        <div className="my-10 flex gap-4 flex-col items-center justify-center px-10">
          <p className="text-primary">
            <VscLayersActive size={46} />
          </p>
          <p className='md:text-2xl poppins text-center' > I am not Tracking Your Activity Right Now</p>
        </div>
      </div>
    );
};

export default Activity;