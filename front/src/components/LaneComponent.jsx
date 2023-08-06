export default function LaneComponent() {
  return (
    <>
      <div
        className={
          "w-[1850px] h-[740px] mt-[30px] mx-[38px] rounded-md absolute z-10 border bg-white p-8"
        }
      >
        <div className=" border flex ">
          <div className="text-5xl w-full flex">
            Lane
            <button className="w-[30px] h-[30px] bg-[#EBEBEB] rounded-full border border-[#D3D3D3] text-[20px] p-1 text-center m-[11px]">
              i
            </button>
          </div>

          {/*상단 버튼*/}
          <div className="flex gap-4 ml-auto my-[8px]">
            <button className="w-[140px] h-[35px] bg-[#0A455E] rounded-md text-white">
              {" "}
              파일 업로드
            </button>
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
        {/*표 만들기*/}
        <div className="w-[1786px] overflow-x-scroll mt-6">
          <table class="border-collapse border border-slate-400 table-fixed">
            <thead>
              <tr>
                <th class="border border-slate-300 w-[200px] h-[40px] text-white bg-[#0A455E]"></th>
                <th class="border border-slate-300 w-[200px] text-white bg-[#0A455E]">
                  <input type="checkbox" className="w-[15px] h-[15px]"></input>
                </th>
                <th class="border border-slate-300 w-[200px] text-white bg-[#0A455E]">
                  <input type="checkbox" className="w-[15px] h-[15px]"></input>
                </th>
                <th class="border border-slate-300 w-[200px] text-white bg-[#0A455E]">
                  <input type="checkbox" className="w-[15px] h-[15px]"></input>
                </th>
                <th class="border border-slate-300 w-[200px] text-white bg-[#0A455E]">
                  <input type="checkbox" className="w-[15px] h-[15px]"></input>
                </th>
                <th class="border border-slate-300 w-[200px] text-white bg-[#0A455E]">
                  <input type="checkbox" className="w-[15px] h-[15px]"></input>
                </th>
                <th class="border border-slate-300 w-[200px] text-white bg-[#0A455E]">
                  <input type="checkbox" className="w-[15px] h-[15px]"></input>
                </th>
                <th class="border border-slate-300 w-[200px] text-white bg-[#0A455E] j">
                  <input type="checkbox" className="w-[15px] h-[15px] place-self-end "></input>
                </th>
                <th class="border border-slate-300 w-[200px] text-white bg-[#0A455E]">
                  <input type="checkbox" className="w-[15px] h-[15px]"></input>
                </th>
                
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-slate-300 w-[200px] h-[40px] bg-[#457184] text-white px-3">
                  Indiana
                </td>
                <td class="border border-slate-300 w-[200px] h-[40px]">
                  Indianapolis
                </td>
                <td class="border border-slate-300 w-[200px] h-[40px]">
                  Indianapolis
                </td>
                <td class="border border-slate-300 w-[200px] h-[40px]">
                  Indianapolis
                </td>
                <td class="border border-slate-300 w-[200px] h-[40px]">
                  Indianapolis
                </td>
                <td class="border border-slate-300 w-[200px] h-[40px]">
                  Indianapolis
                </td>
                <td class="border border-slate-300 w-[200px] h-[40px]">
                  Indianapolis
                </td>
              </tr>
              <tr>
                <td class="border border-slate-300 w-[200px] h-[40px] bg-[#628898] text-white px-3">
                  Ohio<span className="">미주</span>
                </td>

                <td class="border border-slate-300 w-[200px] h-[40px]">
                  Columbus
                </td>
              </tr>
              <tr>
                <td class="border border-slate-300 w-[200px] h-[40px] bg-[#809EAB] text-white px-3">
                  Michigan
                </td>
                <td class="border border-slate-300 w-[200px] h-[40px]">
                  Detroit
                </td>
              </tr>
              <tr>
                <td class="border border-slate-300 w-[200px] h-[40px] bg-[#9CB3BD] text-white px-3">
                  Michigan
                </td>
                <td class="border border-slate-300 w-[200px] h-[40px]">
                  Detroit
                </td>
              </tr>
              <tr>
                <td class="border border-slate-300 w-[200px] h-[40px] bg-[#457184] text-white px-3">
                  Michigan
                </td>
                <td class="border border-slate-300 w-[200px] h-[40px]">
                  Detroit
                </td>
              </tr>
              <tr>
                <td class="border border-slate-300 w-[200px] h-[40px] bg-[#457184] text-white px-3">
                  Michigan
                </td>
                <td class="border border-slate-300 w-[200px] h-[40px]">
                  Detroit
                </td>
              </tr>
              <tr>
                <td class="border border-slate-300 w-[200px] h-[40px] bg-[#457184] text-white px-3">
                  Michigan
                </td>
                <td class="border border-slate-300 w-[200px] h-[40px]">
                  Detroit
                </td>
              </tr>
              <tr>
                <td class="border border-slate-300 w-[200px] h-[40px] bg-[#457184] text-white px-3">
                  Michigan
                </td>
                <td class="border border-slate-300 w-[200px] h-[40px]">
                  Detroit
                </td>
              </tr>
              <tr>
                <td class="border border-slate-300 w-[200px] h-[40px] bg-[#457184] text-white px-3">
                  Michigan
                </td>
                <td class="border border-slate-300 w-[200px] h-[40px]">
                  Detroit
                </td>
              </tr>
              <tr>
                <td class="border border-slate-300 w-[200px] h-[40px] bg-[#457184] text-white px-3">
                  Michigan
                </td>
                <td class="border border-slate-300 w-[200px] h-[40px]">
                  Detroit
                </td>
              </tr>
              <tr>
                <td class="border border-slate-300 w-[200px] h-[40px] bg-[#457184] text-white px-3">
                  Michigan
                </td>
                <td class="border border-slate-300 w-[200px] h-[40px]">
                  Detroit
                </td>
              </tr>
              <tr>
                <td class="border border-slate-300 w-[200px] h-[40px] bg-[#457184] text-white px-3">
                  Michigan
                </td>
                <td class="border border-slate-300 w-[200px] h-[40px]">
                  Detroit
                </td>
              </tr>
              <tr>
                <td class="border border-slate-300 w-[200px] h-[40px] bg-[#457184] text-white px-3">
                  Michigan
                </td>
                <td class="border border-slate-300 w-[200px] h-[40px]">
                  Detroit
                </td>
              </tr>
              <tr>
                <td class="border border-slate-300 w-[200px] h-[40px] bg-[#457184] text-white px-3">
                  Michigan
                </td>
                <td class="border border-slate-300 w-[200px] h-[40px]">
                  Detroit
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
