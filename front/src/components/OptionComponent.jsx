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
        {/* option 하나 하나 컴포넌트*/}
        <div className="flex gap-20 mt-[20px]   ">
          {/* option - Lane 컴포넌트 */}
          <div className="w-[550px] h-[600px] bg-[#CCD8DD] rounded-xl p-4 px-6">
            <div className="flex">
              <div className="text-2xl w-full">Lane categories :</div>
              <button className="bg-white w-[100px] rounded-md border border-[#B2B2B2] ml-auto">Remove</button>
            </div>
            <div className="w-[480px] h-[500px] bg-[#BBC8D0] rounded-xl my-5 mx-2 py-4">
              <div className="w-[450px] h-[470px] bg-white rounded-xl mx-4"></div>
            </div>
          </div>
          {/* option - input 컴포넌트*/}
          <div className="w-[550px] h-[600px]  bg-[#CCD8DD] rounded-xl p-4 px-6">
            <div className="flex">
              <div className="text-2xl w-full">Input categories :</div>
              <button className="bg-white w-[100px] rounded-md border border-[#B2B2B2] ml-auto">Remove</button>
            </div>
            <div className="w-[480px] h-[500px] bg-[#BBC8D0] rounded-xl my-5 mx-2 py-4">
              <div className="w-[450px] h-[470px] bg-white rounded-xl mx-4"></div>
            </div>
          </div>
          {/* option - output 컴포넌트*/}
          <div className="w-[550px] h-[600px]  bg-[#CCD8DD] rounded-xl p-4 px-6">
            <div className="flex">
              <div className="text-2xl w-full">Output categories :</div>
              <button className="bg-white w-[100px] rounded-md border border-[#B2B2B2]ml-auto">Remove</button>
            </div>
            <div className="w-[480px] h-[500px] bg-[#BBC8D0] rounded-xl my-5 mx-2 py-4">
              <div className="w-[450px] h-[470px] bg-white rounded-xl mx-4"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
