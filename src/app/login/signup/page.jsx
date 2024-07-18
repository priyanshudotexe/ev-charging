"use client";
import React, { useState, useEffect } from "react";
//import Background from "../../../../public/loginmap.png";
import Image from "next/image";
import Deadmap from "../../../components/deadmap.jsx";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Logo from "../../../../public/Nawgati.png";
//import BG3 from '/bg3.png';
import { useRouter } from "next/navigation";

const SignUp = () => {
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const router = useRouter();
  const [signupData, setsignupData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setsignupData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    // Extract the final input data
    const finalData = signupData;
    const Labelerror = document.getElementById("httpresponse");
    Labelerror.innerText = "";

    console.log("Submitted Data:", finalData);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(signupData);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://3.89.187.23:8000/charging_app/signup/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.error != null) {
          const Labelerror = document.getElementById("httpresponse");
          Labelerror.innerText = result.error;
        } else {
          setShouldNavigate(true);
        } // Empty dependency array means this runs once on mount

        // Handle success (e.g., redirect or show a message)
      })
      .catch((error) => {
        console.error(error);
        const Response = result;
        const Labelerror = document.getElementById("httpresponse");
        Labelerror.innerText = result.error;
        // Handle error (e.g., show error message)
      });
  };

  useEffect(() => {
    // Navigate when shouldNavigate is true
    if (shouldNavigate) {
      router.push("./signin"); // Update with your path
    }
  }, [shouldNavigate, router]);

  return (
    <div className="h-screen w-screen flex absolute justify-end">
      <div className="h-screen w-screen absolute z-0">
        <Deadmap />
      </div>

      <div
        style={{ backgroundImage: `url('/bg1.png')`, layout: "responsive" }}
        className="m-0 flex-col flex z-10 w-2/5 h-screen justify-center items-center p-5 "
      >
        <div className="flex-col mt-8 flex justify-center items-center bg-zinc-800 p-10 pb-0 pt-7 rounded-2xl z-20">
          <Image
            src={Logo}
            alt="Logo"
            width={50}
            height={50}
            className="self-center"
          />
          <h1 className="text-2xl self-center mt-5 font-semibold">
            Create Account
          </h1>
          <Input
            type="text"
            name="name"
            placeholder="Name"
            value={signupData.name}
            onChange={handleChange}
            className="mt-9"
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={signupData.email}
            onChange={handleChange}
            className="mt-3"
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={signupData.password}
            onChange={handleChange}
            className="mt-3"
          />
          <label
            id="httpresponse"
            className="text-xs self-start mt-2 pl-1 text-red-700"
          ></label>
          <Button onClick={handleSubmit} className="mt-5 w-full">
            Register
          </Button>
          <div className="mt-1">
            <text className="text-zinc-500 text-xs self-start p-3">
              By registering you agree to our terms and conditions
            </text>
          </div>
          <p className="mt-3 font-thin text-zinc-400">
            ____________________________________________
          </p>
          <p className="mt-2 self-center text-sm text-zinc-500 pb-5">
            already have an account?{" "}
            <a href="./signin" className="self-start text-sm text-primary pb-5">
              <u>Sign in</u>
            </a>
          </p>
        </div>
        <br></br>
      </div>
    </div>
  );
};

export default SignUp;
