export default function OptionComponent() {
  return (
    <>
      <div
        className={
          "w-[1850px] h-[740px] mt-[30px] mx-[38px] rounded-md absolute z-10 border bg-white p-8"
        }
      >
        <div className=" border flex ">
          <div className="text-5xl w-full flex">
            Option
            <button className="w-[30px] h-[30px] bg-[#EBEBEB] rounded-full border border-[#D3D3D3] text-[20px] p-1 text-center m-[11px]">
              i
            </button>
          </div>

          {/*상단 버튼*/}
          <div className="flex gap-4 ml-auto my-[8px]">
            <button className="w-[140px] h-[35px] bg-[#0A455E] rounded-md text-white">
              {" "}
              삭제
            </button>
            <button className="w-[140px] h-[35px] bg-[#0A455E] rounded-md text-white">
              {" "}
              저장
            </button>
          </div>
        </div>
        <div className="flex gap-20 mt-[20px]   ">
        <div className="w-[550px] h-[600px] bg-[#CCD8DD] rounded-xl"></div>
        <div className="w-[550px] h-[600px]  bg-[#CCD8DD] rounded-xl"></div>
        <div className="w-[550px] h-[600px]  bg-[#CCD8DD] rounded-xl"></div>
        </div>
      </div>
      
    </>
  );
}
