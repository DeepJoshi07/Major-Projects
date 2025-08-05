import ProjectCard from "./ProjectCard";

const Projects = () => {
  return (
    <div id="Projects" className="p-10 md:p-24 text-white ">
      <h1 className="text-2xl md:text-4xl text-white font-bold">Projects</h1>
      <div className="py-12 px-8 flex flex-wrap gap-5">
        <ProjectCard
          demoLink={""}
          sourceCode={""}
          title={"Chat-app"}
          main={
            "this is a bloggin website created in next js and used some component library used some component library"
          }
        />
        <ProjectCard
          demoLink={""}
          sourceCode={""}
          title={"Fashion-app"}
          main={
            "this is a bloggin website created in next js and used some component library used some component library"
          }
        />
        <ProjectCard
          demoLink={""}
          sourceCode={""}
          title={"Social-app"}
          main={
            "this is a blogging website created this ijsdjf l in next js and used some component library used some component library"
          }
        />
        <ProjectCard
          demoLink={""}
          sourceCode={""}
          title={"LinkedIn-app-clone"}
          main={
            "this is a blogging website created this ijsdjf l in next js and used some component library used some component library"
          }
        />
      </div>
    </div>
  );
};

export default Projects;
