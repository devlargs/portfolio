import FloatUp from "animations/FloatUp";
import Image from "next/image";

const TechStack = () => (
  <div className="h-1/2">
    <div className="grid place-items-center">
      <FloatUp>
        <Image src="/images/inprogress.svg" width="800" height="450" />
      </FloatUp>
      <div className="mt-20 text-darkblue text-4xl text-center">
        Tech Stack | Work In Progress
      </div>
    </div>
  </div>
);

export default TechStack;
