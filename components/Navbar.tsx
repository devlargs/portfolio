import Logo from "components/Logo";
import styled from "styled-components";

const Navbar = () => {
  return (
    <Root>
      <header className="lg:px-16 px-6 bg-white flex flex-wrap items-center lg:py-0 py-2">
        <div className="flex-1 flex justify-between items-center">
          <a href="#">
            <Logo width={36} height={36} />
          </a>
        </div>

        <label htmlFor="menu-toggle" className="cursor-pointer lg:hidden block">
          <svg
            className="fill-current text-gray-900"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <title>menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
          </svg>
        </label>
        <input type="checkbox" className="hidden" id="menu-toggle" />

        <div
          className="hidden lg:flex lg:items-center lg:w-auto w-full"
          id="menu"
        >
          <nav>
            <ul className="lg:flex items-center justify-between text-base text-gray-700 pt-4 lg:pt-0">
              <li>
                <a
                  href="#"
                  className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400"
                >
                  Features
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400"
                >
                  Features
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400"
                >
                  Features
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400"
                >
                  Features
                </a>
              </li>
            </ul>
          </nav>

          <a
            href="#"
            className="lg:ml-4 flex items-center justify-start lg:mb-0 mb-4 cursor-pointer w-12"
          >
            <img
              src="https://philnews.ph/wp-content/uploads/2020/05/kathryn-bernardo-2.jpg"
              className="rounded-full w-10 h-10 border-2 border-transparent hover:border-indigo-400"
              alt="Ralph Largo"
            />
          </a>
        </div>
      </header>
    </Root>
  );
};

const Root = styled.div`
  #menu-toggle:checked + #menu {
    display: block;
  }
`;

export default Navbar;
