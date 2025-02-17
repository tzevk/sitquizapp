import { useEffect, useState } from "react";
import Loading from "./Loading";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  const convertTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes} : ${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const leaderboardResponse = await axios.post(
          `/api/leaderboard?date=${new Date().getTime()}`,
          {
            headers: {
              "Cache-Control": "no-cache",
              Pragma: "no-cache",
              Expires: "0",
            },
          }
        );
        setLeaderboard(leaderboardResponse.data.users);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  if (leaderboard.length === 0) return <Loading />;

  return (
    <div className="w-full flex flex-col items-center justify-center bg-gray-50 p-10 overflow-hidden">
      <h1 className="text-5xl font-extrabold text-gray-900 flex items-center gap-3 mb-8">
        ⭐ <span className="text-[#2A6BB5]">LEADERBOARD</span> ⭐
      </h1>
      <div className="w-full max-w-4xl">
  <Table className="bg-white shadow-2xl rounded-2xl overflow-hidden w-full border border-gray-300">
    {/* Header */}
    <TableHeader>
  <TableRow className="bg-[#2A6BB5] text-white">
    <TableHead className="text-center font-extrabold text-xl py-3 !text-white !opacity-100">
      🏆 Rank
    </TableHead>
    <TableHead className="text-center font-extrabold text-xl py-3 !text-white !opacity-100">
      👤 Name
    </TableHead>
    <TableHead className="text-center font-extrabold text-xl py-3 !text-white !opacity-100">
      📊 Score
    </TableHead>
    <TableHead className="text-center font-extrabold text-xl py-3 !text-white !opacity-100">
      ⏳ Time
    </TableHead>
    <TableHead className="text-center font-extrabold text-xl py-3 !text-white !opacity-100">
      📝 Quizzes Attempted
    </TableHead>
  </TableRow>
</TableHeader>

    {/* Body */}
    <TableBody>
      {leaderboard?.map((user, index) => (
        <TableRow
          key={user._id}
          className={`text-lg font-medium ${index % 2 === 0 ? "bg-gray-100" : "bg-white"} focus:outline-none`}
        >
          <TableCell className="text-center p-4 font-bold text-gray-900">{index + 1}</TableCell>
          <TableCell className="text-center p-4 text-gray-900">{user.name || "N/A"}</TableCell>
          <TableCell className="text-center p-4 text-green-600 font-semibold">{user.score || 0}</TableCell>
          <TableCell className="text-center p-4 text-gray-700">{convertTime(user.submitTime) || "0:00"}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</div>
</div>
  );
};

export default Leaderboard;