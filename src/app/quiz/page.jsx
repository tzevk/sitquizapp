"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Timer from "../../components/Timer";
import Loading from "../../components/Loading";
import { Button } from "../../components/ui/button";
import { toast } from "../../components/ui/use-toast";
import { useRouter } from "next/navigation";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import Image from "next/image";
import { cn } from "../../lib/utils";
import Leaderboard from "../../components/Leaderboard";
import { limit } from "../../lib/constants";
import Link from "next/link";

const Page = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const { width, height } = useWindowSize();

  const [timeRemaining, setTimeRemaining] = useState(() => {
    if (typeof window !== "undefined") {
      return parseInt(localStorage.getItem("timeRemaining")) || 120;
    }
    return 120;
  });

  const fetchData = async () => {
    try {
      let level = typeof window !== "undefined"
        ? (JSON.parse(localStorage.getItem("user"))?.type === "btech" ? 2 : 1)
        : 1;

      const { data } = await axios.get(`/api/questions?level=${level}`);

      console.log("✅ API Response:", data);

      if (data.questions?.length > 0) {
        setQuestions(data.questions);
      } else {
        toast({ title: "No questions found for this level!", variant: "destructive" });
      }
    } catch (error) {
      console.error("❌ Error fetching data:", error);
      toast({ title: "Failed to load questions!", variant: "destructive" });
    }
  };

  const onSubmit = async () => {
    try {
      window.clearInterval(window.interval);
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await axios.post("/api/users/submit", {
        questions,
        contact: user?.contact,
        timeRemaining,
      });

      setScore(res.data.score);
      ["timeRemaining", "questions", "user"].forEach((key) => localStorage.removeItem(key));
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  useEffect(() => {
    if (quizStarted) {
      if (localStorage.getItem("questions")) {
        setQuestions(JSON.parse(localStorage.getItem("questions")));
      } else {
        fetchData();
      }

      window.interval = setInterval(() => setTimeRemaining((prev) => prev - 1), 1000);
      return () => window.clearInterval(window.interval);
    }
  }, [quizStarted]);

  useEffect(() => {
    if (timeRemaining <= 0) {
      window.clearInterval(window.interval);
      onSubmit();
    } else {
      localStorage.setItem("timeRemaining", timeRemaining);
    }
  }, [timeRemaining]);

  useEffect(() => {
    if (questions.length > 0) {
      localStorage.setItem("questions", JSON.stringify(questions));
    }
  }, [questions]);

  const handleAnswerSelect = (choice) => {
    setQuestions((prev) =>
      prev.map((q, idx) =>
        idx === currentQuestionIndex ? { ...q, markedAnswer: choice } : q
      )
    );

    console.log("✅ Selected Answer:", choice);
  };

  useEffect(() => {
    console.log("✅ Updated Questions State:", questions);
  }, [questions]);

  const currentQuestion = questions[currentQuestionIndex];

  if (!quizStarted && score === null)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-200 to-yellow-400 py-10">
        <Image src="/backdrop.png" width="250" height="250" alt="Quiz Logo" className="mb-4" />
        <div className="bg-white shadow-xl rounded-3xl p-10 max-w-lg text-center border border-gray-300">
          
 <h1 className="text-gray-900 font-extrabold text-4xl mb-4 tracking-wide flex items-center justify-center">
    📜 Instructions
  </h1>

  <ul className="text-left mt-4 text-lg text-gray-800 space-y-4">
    <li className="flex items-center gap-3">
      <span className="bg-blue-600 text-white font-semibold px-3 py-1 rounded-full">1</span>
      There are <span className="font-bold">10 questions</span>, 1 mark each.
    </li>
    <li className="flex items-center gap-3">
      <span className="bg-blue-600 text-white font-semibold px-3 py-1 rounded-full">2</span>
      The questions are <span className="font-bold">MCQs</span>.
    </li>
    <li className="flex items-center gap-3">
      <span className="bg-blue-600 text-white font-semibold px-3 py-1 rounded-full">3</span>
      <span className="font-bold">No negative markings</span>.
    </li>
    <li className="flex items-center gap-3">
      <span className="bg-blue-600 text-white font-semibold px-3 py-1 rounded-full">4</span>
      <div>
        You have <span className="font-bold">2 minutes</span> to answer all questions.<br />
        The quiz will be <span className="text-red-500 font-semibold">auto-submitted</span> when time runs out.
      </div>
    </li>
    <li className="flex items-center gap-3">
      <span className="bg-blue-600 text-white font-semibold px-3 py-1 rounded-full">5</span>
      Score <span className="font-bold">{limit}/10</span> or more to win a <span className="text-green-600 font-semibold">Prize 🎉</span>!
    </li>
  </ul>
          <Button
            onClick={() => {
              toast({ title: "All the best for your quiz!" });
              setQuizStarted(true);
            }}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-lg font-semibold shadow-lg transition-all"
          >
            {timeRemaining > 0 && timeRemaining !== 120 ? "Continue" : "Start"} Quiz
          </Button>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-10">
      {quizStarted && score === null && (
        <>
          <Timer timeRemaining={timeRemaining} />
          <div className="bg-white shadow-md rounded-xl p-6 w-[90%] max-w-2xl mt-5">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Question {currentQuestionIndex + 1} / {questions.length}
            </h2>
            <p className="text-lg text-gray-700">{currentQuestion?.question}</p>
            <ul className="mt-6 space-y-4">
              {currentQuestion?.choices.map((choice, index) => (
                <li
                  key={index}
                  className={`p-3 border rounded-lg cursor-pointer text-lg font-medium transition-all 
                    ${currentQuestion?.markedAnswer === choice ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
                  onClick={() => handleAnswerSelect(choice)}
                >
                  {choice}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex justify-between">
              {currentQuestionIndex > 0 && (
                <Button
                  onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
                  className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                  ← Previous
                </Button>
              )}
              {currentQuestionIndex < questions.length - 1 ? (
                <Button
                  onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Next →
                </Button>
              ) : (
                <Button onClick={onSubmit} className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  Submit
                </Button>
              )}
            </div>
          </div>
        </>
      )}

{score !== null && (
  <div className="flex flex-col items-center justify-center mt-10 space-y-6">
    {score >= limit ? (
      <>
        <Confetti width={width} height={height} />
        <div className="bg-green-100 border border-green-400 text-green-900 px-8 py-6 rounded-2xl shadow-lg animate-fadeIn">
          <h1 className="text-4xl font-extrabold flex items-center gap-3">
            🎉 Congratulations!  
          </h1>
          <p className="text-lg font-semibold mt-2 text-green-700">
            You aced the quiz! Keep it up! 🚀
          </p>
        </div>
      </>
    ) : (
      <div className="bg-red-100 border border-red-400 text-red-900 px-8 py-6 rounded-2xl shadow-lg animate-fadeIn">
        <h1 className="text-4xl font-extrabold flex items-center gap-3">
          Better luck next time!
        </h1>
      </div>
    )}

    <div className="bg-white shadow-xl rounded-3xl p-8 w-80 text-center animate-scaleIn">
      <h2 className="text-2xl font-bold text-gray-800 tracking-wide">
        🏅 Your Score
      </h2>
      <p className={`text-5xl font-extrabold mt-2 ${score >= limit ? "text-green-600" : "text-red-600"}`}>
        {score} / 10
      </p>
    </div>

    <div className="w-full max-w-lg p-6 bg-white shadow-xl rounded-2xl text-center animate-slideUp">
  <h2 className="text-3xl font-extrabold text-gray-900 mb-4 flex items-center justify-center gap-2">
    🏆 Leaderboard
  </h2>
  <p className="text-lg text-gray-600 mb-6">
    Check the top scores and see how you rank!
  </p>
  <Link href="/leaderboard">
    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition-transform transform hover:scale-105">
      View Leaderboard →
    </button>
  </Link>
</div>
  </div>
)}
    </div>
  )}

export default Page;