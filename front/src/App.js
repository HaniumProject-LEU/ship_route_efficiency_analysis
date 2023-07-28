import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import DEAAnalyze from "./DEAAnalyze";
import DataGenerate from "./DataGenerate";
import Navigation from "./components/Navigation";

export default function App() {
  return (
    <>
    <Navigation/>
    <div className={"mr-side mt-[50px]"}></div>
      <Routes>
        <Route path={"/"} element={<Home />}></Route>
        <Route path={"/deaanalyze"} element={<DEAAnalyze />}></Route>
        <Route path={"/datagenerate"} element={<DataGenerate />}></Route>
      </Routes>
    </>
  );
}
