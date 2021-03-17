import Image from "next/image";

const Index = () => (
  <div className="container mx-auto px-6 sm:px-12 flex flex-col-reverse sm:flex-row items-center">
    <div className="sm:w-2/5 flex flex-col items-start mt-8 sm:mt-0">
      <h1 className="text-4xl lg:text-6xl leading-none mb-4">
        <strong className="font-black">
          Ralph Largo <br />
        </strong>
        React JS Developer
      </h1>
      <a
        href="#"
        className="font-semibold text-lg bg-blue-500 hover:bg-blue-400 text-white py-3 px-10 rounded-full"
      >
        Learn more
      </a>
    </div>
    <div className="sm:w-3/5">
      <Image src="/images/home.svg" width="700" height="500" />
    </div>
  </div>
);

export default Index;
