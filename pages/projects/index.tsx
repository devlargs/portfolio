import FadeIn from "animations/FadeIn";
import Image from "next/image";
import getFirestoreCollection from "utils/auth/getFirestoreCollection";

type ProjectProps = {
  codefactorImgUrl?: string;
  codefactorUrl?: string;
  deepscanImgUrl?: string;
  deepscanUrl?: string;
  slug: string;
  title: string;
  url: string;
  requiresLogin?: boolean;
};

type Props = {
  data: Array<ProjectProps>;
};

const Projects = ({ data = [] }: Props) => {
  return (
    <div style={{ width: "100%", justifyContent: "center", display: "flex" }}>
      <div>
        <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-4">
          <div className="space-y-12">
            <ul className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-3 lg:gap-x-8">
              {data.map((q: ProjectProps) => (
                <FadeIn>
                  <li key={q.slug}>
                    <div className="space-y-4">
                      <div className="aspect-w-3 aspect-h-2">
                        <Image
                          className="shadow-lg rounded-lg"
                          src={`/images/${q.slug}.png`}
                          width="384"
                          height="240"
                          alt=""
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="text-lg leading-6 font-medium space-y-1">
                          <a href={q.url} target="_blank">
                            {q.title}
                          </a>
                        </div>
                        <ul className="flex space-x-3">
                          {q?.deepscanImgUrl && q?.deepscanUrl ? (
                            <li>
                              <a href={q.deepscanUrl} target="_blank">
                                <img
                                  src={q.deepscanImgUrl}
                                  alt="DeepScan grade"
                                />
                              </a>
                            </li>
                          ) : (
                            <></>
                          )}
                          {q?.codefactorImgUrl && q?.codefactorUrl ? (
                            <li>
                              <a href={q.codefactorUrl} target="_blank">
                                <img
                                  src={q.codefactorImgUrl}
                                  alt="CodeFactor"
                                />
                              </a>
                            </li>
                          ) : (
                            <></>
                          )}
                        </ul>
                      </div>
                    </div>
                  </li>
                </FadeIn>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  const querySnapshot = await getFirestoreCollection("projects").get();

  const data = [];

  querySnapshot.forEach((doc) => {
    data.push({
      ...doc.data(),
      id: doc.id,
    });
  });

  return {
    props: {
      data,
    },
  };
};

export default Projects;
