import React from "react";
import { LiaCopyright } from "react-icons/lia";

function Footer() {
  return (
    <div className="flex justify-center items-center h-[50px] bg-primary w-full gap-3">
      <p className="text-white">Nischal Khatiwada</p>
      <div className="flex items-center">
        <LiaCopyright size={25} color="white" />
        <p className="text-white">2024</p>
      </div>
    </div>
  );
}

export default Footer;
