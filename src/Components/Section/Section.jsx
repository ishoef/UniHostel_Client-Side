import React from "react";

const Section = ({ children }) => {
    return (
      <section>
        <div className="w-11/12">{children}</div>
      </section>
    );
};

export default Section;
