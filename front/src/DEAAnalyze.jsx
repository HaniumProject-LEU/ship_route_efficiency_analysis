import { useState } from "react";
import LaneComponent from "./components/LaneComponent";
import DataComponent from "./components/DataComponent";
import OptionComponent from "./components/OptionComponent";

export default function DEAAnalyze() {
  const [laneClick, setLaneClick] = useState(false);
  const [dataClick, setDataClick] = useState(false);
  const [optionClick, setOptionClick] = useState(false);
  return (
    <>
      <div className="relative">
        {laneClick == true ? <LaneComponent /> : null}
        {dataClick == true ? <DataComponent /> : null}
        {optionClick == true ? <OptionComponent /> : null}
        <img src="/DEAbg.png" className="w-full h-[800px]"></img>

        <div className="relative">
          <div className="flex gap-12 absolute mx-20 ">
            <div className="mt-8">
              <span className="text-3xl">Lane</span>
              <div
                className={
                  laneClick == false
                    ? "w-[400px] h-[60px] rounded-sm bottom-10 py-[14px] px-[11px] shadow-lg mt-[5px]"
                    : "w-[400px] h-[60px] rounded-sm bottom-10 py-[14px] px-[11px] shadow-lg border border-[#0A455E] mt-[5px]"
                }
                onClick={() => {
                  setLaneClick(!laneClick);
                }}
              >
                <span className="text-[18px] text-[#999999]">
                  출발지와 도착지를 입력해주세요.
                </span>
              </div>
            </div>
            <div className="mt-8">
              <span className="text-3xl">Data</span>
              <div
                className={
                  dataClick == false
                    ? "w-[400px] h-[60px] rounded-sm bottom-10 py-[14px] px-[11px] shadow-lg mt-[5px]"
                    : "w-[400px] h-[60px] rounded-sm bottom-10 py-[14px] px-[11px] shadow-lg border border-[#0A455E] mt-[5px]"
                }
                onClick={() => {
                  setDataClick(!dataClick);
                }}
              >
                <span className="text-[18px] text-[#999999]">
                  분석할 데이터를 입력해주세요.
                </span>
                {/* <div className={"material-symbols-outlined"}>arrow_drop_up</div> */}
              </div>
            </div>
            <div className="mt-8">
              <span className="text-3xl">Option</span>
              <div
                className={
                  optionClick == false
                    ? "w-[400px] h-[60px] rounded-sm bottom-10 py-[14px] px-[11px] shadow-lg mt-[5px]"
                    : "w-[400px] h-[60px] rounded-sm bottom-10 py-[14px] px-[11px] shadow-lg border border-[#0A455E] mt-[5px]"
                }
                onClick={() => {
                  setOptionClick(!optionClick);
                }}
              >
                <span className="text-[18px] text-[#999999]">
                  선택된 옵션값을 확인해주세요.
                </span>
              </div>
            </div>
            <div className="mt-[72px]">
              <button
                className={
                  "w-[400px] h-[60px] rounded-sm bottom-10 bg-[#0A455E] text-white shadow-lg"
                }
              >
                <span>Run</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
