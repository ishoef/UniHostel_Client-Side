import React from 'react';
import { Link } from 'react-router';


const Logo = () => {
    return (
      <Link to="/">
        <div className="left flex items-center gap-2">
          <img
            className="w-9"
            src="https://i.ibb.co/Gv878nd9/LogoPng.png"
            alt=""
          />
          <p className="hidden md:block lg:block text-2xl font-bold tracking-wide">
            UniHostel
          </p>
        </div>
      </Link>
    );
};

export default Logo;