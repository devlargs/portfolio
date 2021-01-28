const Projects = () => (
  <div style={{ width: "100%", justifyContent: "center", display: "flex" }}>
    <div style={{ width: "70%" }}>
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
                    <a
                      href="https://freecodecamp.ralphlargo.com"
                      target="_blank"
                    >
                      Free Code Camp Projects
                    </a>
                  </div>
                  <ul className="flex space-x-3">
                    <li>
                      <a href="https://deepscan.io/dashboard#view=project&tid=12587&pid=15651&bid=316037">
                        <img
                          src="https://deepscan.io/api/teams/12587/projects/15651/branches/316037/badge/grade.svg"
                          alt="DeepScan grade"
                        />
                      </a>
                    </li>
                    <li>
                      <a href="https://www.codefactor.io/repository/github/devlargs/freecodecamp-projects">
                        <img
                          src="https://www.codefactor.io/repository/github/devlargs/freecodecamp-projects/badge"
                          alt="CodeFactor"
                        />
                      </a>
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
