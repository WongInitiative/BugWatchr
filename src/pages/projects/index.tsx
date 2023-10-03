import { Heading } from "@radix-ui/themes";
import Image from "next/image";

import { type NextPage } from "next";

const ProjectsPage: NextPage = () => {
  return (
    <div className="mx-7 my-7 flex-col">
      <div className="flex flex-col items-center justify-center gap-14 pb-5">
        <Heading size="7" style={{ letterSpacing: "0.025em" }}>
          UNDER CONSTRUCTION
        </Heading>
        <Image
          src="/assets/under_construction.jpg"
          width={500}
          height={500}
          alt="Under construction image"
        />
      </div>
    </div>
  );
};

export default ProjectsPage;
