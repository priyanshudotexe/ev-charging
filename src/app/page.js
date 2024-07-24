"use client";
import { Ms_Madi } from "next/font/google/index.js";
import Map from "../components/maps.jsx";
import { Button } from "@/components/ui/button";
import { useRecoilState } from "recoil";
import { navStates } from "../recoil/recoilState.js";
import Link from "next/link";
import Image from "next/image";
import Bg from "../../public/bg2.png"
import Logo from "../../public/logox.svg";


export default function Home() {
  const [navState, setNavState] = useRecoilState(navStates);
  function onClickHandle() {
    setNavState(1);
  }

  return (
    <div className="z-0 h-screen w-screen flex relative self-center justify-center items-center">
      <div className="absolute top-0 left-0 w-full h-12 bg-transparent flex justify-center items-center z-10">
        {/* Center the Logo inside the ribbon */}
        <Image src={Logo} alt="Logo" width={100} height={100} className="mt-6" />
      </div>
      <div className="flex flex-col min-h-[100dvh]">
        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
                <div className="flex flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                      The charging experience we deserve
                    </h1>
                    <p className="max-w-[600px] text-muted-foreground md:text-xl">
                      Revolutionize the way you charge your EV
                      <br></br>Experience unparalleled speed, efficiency, and
                      convenience.
                    </p>
                    <div className="flex flex-col gap-2 min-[400px]:flex-row">
                      <Button className="mt-6 absolute  z-20 items-center self-center justify-center">
                        <a href="./home" onClick={onClickHandle}>
                          Experience it
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
                <Image
                  src={Bg}
                  height={500}
                  width={500}
                  alt="Hero"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-bottom sm:w-full lg:order-last lg:aspect-square"
                />
              </div>
            </div>
          </section>
        </main>
      </div>
      {/* <Button className="absolute  z-20 items-center self-center justify-center">
        <a href="./home" onClick={onClickHandle}>
          Home
        </a>
      </Button> */}
    </div>
  );
}
