import { Button } from "../components/ui/button";
import { cn } from "../lib/utils";
import { Hourglass } from "react-loader-spinner";

const Timer = ({ timeRemaining }) => {
  const convertTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes} : ${seconds < 10 ? `0${seconds}` : `${seconds}`}`;
  };

  return (
    <div className="flex items-center">
      <Button
        className={cn(
          "w-28 h-[50px] font-semibold text-lg flex gap-2 justify-center items-center",
          {
            "bg-red-500 hover:bg-red-400 border-red-500 hover:border-red-400":
              timeRemaining < 20,
            "hover:bg-gray-200": timeRemaining > 20,
          }
        )}
        variant="outline"
      >
        {/* <div className=""> */}
        <Hourglass
          visible={true}
          height="120"
          width="100"
          ariaLabel="hourglass-loading"
          colors={["#000", "#000"]}
        />
        {/* </div> */}
        <p className="w-11">{convertTime(timeRemaining)}</p>
      </Button>
      {/* <Button onClick={() => localStorage.removeItem("timeRemaining")}>
        clear
      </Button>
      <Button onClick={() => window.clearInterval(window.interval)}>
        stop
      </Button> */}
    </div>
  );
};

export default Timer;
