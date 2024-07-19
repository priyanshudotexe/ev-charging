"use client";
import { Ms_Madi } from "next/font/google/index.js";
import Map from "../components/maps.jsx";
import { Button } from "@/components/ui/button";
import { useRecoilState } from "recoil";
import { navStates } from "../recoil/recoilState.js";

export default function Home() {
  const [navState, setNavState] = useRecoilState(navStates);
  function onClickHandle() {
    setNavState(1);
  }

  return (
    <div className="z-0 h-screen w-screen flex relative self-center justify-center items-center">
      <Button className="absolute items-center self-center justify-center">
        <a href="./home" onClick={onClickHandle}>
          Home
        </a>
      </Button>
    </div>
  );
}
