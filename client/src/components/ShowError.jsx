import React from "react";
import ErrorGif from "../assets/error-windows.gif";

function ShowError({ errMsg = "Something went wrong!" }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <img src={ErrorGif} alt="error" />
      <span className="text-lg font-medium mt-4">{errMsg}</span>
    </div>
  );
}

export default ShowError;
