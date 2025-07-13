import React from 'react';
import { MdOutlinePrivacyTip } from 'react-icons/md';
import { VscLayersActive } from 'react-icons/vsc';

const Privacy = () => {
    return (
      <div className="w-full border border-gray-300 rounded-2xl shadow  h-full flex justify-center items-center">
        <div className="my-10 flex gap-4 flex-col items-center justify-center px-10">
          <p className="text-primary">
            <MdOutlinePrivacyTip size={46} />
          </p>
          <p className="md:text-2xl poppins text-center">
            {" "}
            I am not Developed Privacy System, but we will do it very soon
          </p>
        </div>
      </div>
    );
};

export default Privacy;