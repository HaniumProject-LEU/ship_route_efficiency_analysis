import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navigation() {

  return (
    <>
      <div
        className={
          "w-full h-[50px] bg-white bg-opacity-90 top-0 fixed shadow-lg z-20 "
        }
        // style={containerStyle}
      >
        <div className={"flex "}>
          <NavLink
            to={"/"}
            className={
              "ml-[72px] text-[24px] text-[#0A455E]  font-bold mt-[7px]"
            }
          >
            LEU
          </NavLink>
          <div
            className={"space-x-[80px] text-sm ml-[48px] text-gray2 mt-[16px]"}
          >
            <NavLink
              to={"/deaanalyze"}
              className={
                "focus:font-black focus:opacity-100 focus:text-darkgray"
              }
            >
              DEA 분석
            </NavLink>
            <NavLink
              to={"/datagenerate"}
              className={"focus:font-black focus:text-darkgray"}
            >
              DataGenerate
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}
