'use client';
import React from 'react';
import Image from 'next/image';
import Deadmap from '../../../../components/deadmap.jsx'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Logo from '../../../../../public/Nawgati.png';
//import BG3 from '/bg3.png';


const Forgot = () => {
    return (
      <div className="h-screen w-screen flex absolute justify-end">
        <div className="h-screen w-screen absolute z-0">
          <Deadmap />
        </div>

        <div
          style={{
            backgroundImage: `url('/bg1.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "100vh",
            width: "40%",
          }}
          className="m-0 flex-col flex z-10 justify-center items-center p-5"
        >
          <div className="flex-col mt-8 flex justify-center items-center bg-zinc-800 p-10 pb-0 pt-7 rounded-2xl z-20">
            <Image
              src={Logo}
              alt="Logo"
              width={50}
              height={50}
              className="self-center"
            />
            <h1 className="text-2xl self-center mt-3 font-semibold">
              Forgot Password
            </h1>
            <div className="mt-7 self-center">
              <text className="text-zinc-500 text-xs self-start p-0">
                <a href="../">
                  Enter your email, we will send you a link shortly to reset
                  your password
                </a>
              </text>
            </div>
            <Input type="email" placeholder="Email" className="mt-3" />
            <Button className="mt-5 w-full">Submit</Button>

            <p className="mt-4 font-thin text-zinc-400">
              ____________________________________________
            </p>
            <p className="mt-2 self-center text-sm text-zinc-500 pb-5">
              <a
                href="../signin"
                className="self-start text-sm text-primary pb-5"
              >
                <u>Back to login</u>
              </a>
            </p>
          </div>
          <br></br>
        </div>
      </div>
    );
};

export default Forgot;