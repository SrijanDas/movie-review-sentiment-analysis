import React from "react";
import Gear from "../assets/gear.gif";

function Maintenance() {
  return (
    <div className="flex flex-col justify-center items-center px-5 py-24">
      <div className="h-20 w-20 mb-10">
        <img src={Gear} alt="" />
      </div>
      <div className="text-gray-600 body-font">
        <div className="container mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-indigo-500">
              We will be back soon!
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Sorry for the inconvenience. We are performing some maintenance at
              the moment. We will be back up shortly!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Maintenance;
