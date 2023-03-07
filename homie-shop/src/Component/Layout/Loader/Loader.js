import React from "react";
import { ProgressBar } from "react-loader-spinner";

const Loader = () => {
  
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "white",
        zIndex : '10',
      }}
    >
      <ProgressBar
        height="80"
        width="80"
        ariaLabel="progress-bar-loading"
        wrapperStyle={{}}
        wrapperClass="progress-bar-wrapper"
        borderColor="orange"
        barColor="orange"
      />
    </div>
  );
};

export default Loader;
