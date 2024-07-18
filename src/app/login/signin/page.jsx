'use client';
import React from 'react';
//import Background from '../../../../public/loginmap.png';
import Image from 'next/image';
import Deadmap from '../../../components/deadmap.jsx'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Logo from '../../../../public/Nawgati.png';
//import BG3 from '/bg3.png';


const SignIn = () => {
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
            <h1 className="text-2xl self-center mt-3 font-semibold">Sign in</h1>
            <Input type="email" placeholder="Email" className="mt-7" />
            <Input type="password" placeholder="Password" className="mt-3" />
            <Button className="mt-5 w-full">Login</Button>
            <div className="mt-1 self-end">
              <text className="text-zinc-500 text-xs self-start p-0">
                <a href="./signin/forgotpassword">
                  <u>forgot password?</u>
                </a>
              </text>
            </div>
            <p className="mt-3 font-thin text-zinc-400">
              ____________________________________________
            </p>
            <p className="mt-2 self-center text-sm text-zinc-500 pb-5">
              not a user?{" "}
              <a
                href="./signup"
                className="self-start text-sm text-primary pb-5"
              >
                <u>Sign up</u>
              </a>
            </p>
          </div>
          <br></br>
        </div>
      </div>
    );
};

export default SignIn;
