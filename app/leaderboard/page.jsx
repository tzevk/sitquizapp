"use client";

import Image from "next/image";
import Link from "next/link";
import Leaderboard from "../../components/Leaderboard";

const LeaderboardPage = () => {
  return (
    <div className="flex flex-col gap-10 items-center w-full min-h-screen yellow-300 py-10">
      {/* Header Section */}
      <div className="flex justify-center items-center gap-6 mt-6">
  {/* Logo Container */}
  <div className="bg-white shadow-lg px-6 py-4 rounded-3xl flex items-center justify-center transform hover:scale-105 transition-all duration-300">
    <Image src="/backdrop.png" width={250} height={250} alt="logo" />
  </div>

  {/* Quiz Title */}
  <div className="text-left">
    <h1 className="text-[#2A6BB5] italic font-extrabold text-5xl" fontsize="130px">
      SUVIDYA&apos;S
    </h1>
    <h2 className="text-[#2E3093] italic font-extrabold text-5xl" fontsize="130px">
      CHEMTECH QUIZ
    </h2>
  </div>
</div>
      {/* Leaderboard Card */}
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-3xl overflow-hidden animate-fadeIn p-6 border border-gray-200">
        <Leaderboard />
      </div>

      {/* Back to Home Button */}
      <Link href="/">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition-transform transform hover:scale-105">
          Back to Home
        </button>
      </Link>
    </div>
  );
};

export default LeaderboardPage;