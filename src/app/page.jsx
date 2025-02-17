"use client";

import Image from "next/image";
import RegistrationForm from "../components/RegistrationForm";
import { toast } from "../components/ui/use-toast";

// import StarsCanvas from "../components/Stars";

export default function Home() {
  return (
    <div className="flex px-24 gap-28 justify-center items-center h-full w-full">
      <div className="flex flex-col gap-6 justify-center items-center">
        <div className="relative bg-white w-[450px] h-[260px] rounded-3xl flex items-center justify-center pl-1">
          <Image
            src="/backdrop.png"
            width="500"
            height="500"
            alt="logo"
          />
        </div>
        <div className="text-center">
          <h1 className="text-[#2A6BB5] italic font-extrabold text-5xl" fontsize="130px">
            SUVIDYA&apos;S
          </h1>
          <h1 className="text-[#2E3093] italic font-extrabold text-5xl" fontsize="130px">
            CHEMTECH QUIZ
          </h1>
        </div>
        <div className="text-center uppercase">
          <h3 className="text-[#2A6BB5] font-medium text-lg font-sans" fontsize="30px">
            Only for Students and Fresh graduates.
          </h3>
        </div>
      </div>
      {/* <StarsCanvas /> */}

      <RegistrationForm />
     
    </div>
  );
}
