import Image from "next/image";

const TechStack = () => (
  <div className="h-1/2">
    <div className="grid place-items-center">
      <Image src="/images/inprogress.svg" width="800" height="450" />
      <div className="mt-20 text-darkblue text-4xl">
        Tech Stack | Work In Progress
      </div>
    </div>
  </div>
);

export default TechStack;
