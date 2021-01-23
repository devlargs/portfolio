const Projects = () => (
  <div style={{ width: "100%", justifyContent: "center", display: 'flex' }}>
      <div style={{ width: "70%"}}>
      <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-4">
      <div className="space-y-12">
        <ul className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-3 lg:gap-x-8">
          <li>
            <div className="space-y-4">
              <div className="aspect-w-3 aspect-h-2">
                <img
                  className="object-cover shadow-lg rounded-lg"
                  src="/images/freecodecamp.png"
                  alt=""
                />
              </div>

              <div className="space-y-2">
                <div className="text-lg leading-6 font-medium space-y-1">
                  <a href="https://twicepolls.ralphlargo.com" target='_blank'>Free Code Camp Projects</a>
                  {/* <p className="text-indigo-600">Front-end Developer</p> */}
                </div>
                <ul className="flex space-x-5">
                  <li>
                  <a href="https://deepscan.io/dashboard#view=project&tid=12587&pid=15651&bid=316037"><img src="https://deepscan.io/api/teams/12587/projects/15651/branches/316037/badge/grade.svg" alt="DeepScan grade" /></a>
                    {/* <a href="#" className="text-gray-400 hover:text-gray-500">
                      <span className="sr-only">Twitter</span>
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a> */}
                  </li>
                  <li>
                  <a href="https://www.codefactor.io/repository/github/devlargs/freecodecamp-projects"><img src="https://www.codefactor.io/repository/github/devlargs/freecodecamp-projects/badge" alt="CodeFactor" /></a>
                  </li>
                </ul>
              </div>
            </div>
          </li>

        </ul>
      </div>
    </div>
  

      </div>
    </div>
);

export default Projects;
