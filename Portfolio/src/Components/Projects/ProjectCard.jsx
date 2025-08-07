/* eslint-disable react/prop-types */

const ProjectCard = ({ title, main, demoLink, sourceCode, img }) => {
  return (
    <div className="relative h-[490px] p-3 md:p-6 flex flex-col w-80 bg-[#0c0e19] shadow-xl shadow-slate-900 rounded-2xl">
      <img className="p-4" src={img} alt="" />
      <h3 className="px-4 text-xl md:text-2xl font-bold leading-normal">
        {title}
      </h3>
      <p className="px-4 text-sm md:text-md leading-tight py-2">{main}</p>
      <div className="absolute bottom-4 mt-2 p-2 md:p-4 flex justify-center gap-2 md:gap-4">
        <button className="md:mt-5 text-white py-2 px-3 text-sm md:text-lg md:py-2 md:px-4 hover:opacity-85 duration-300 hover:scale-105 font-semibold rounded-3xl bg-[#465697]">
         <a href={demoLink}> Demo</a>
        </button>
        <button className="md:mt-5 text-white py-2 px-3 text-sm md:text-lg md:py-2 md:px-4 hover:opacity-85 duration-300 hover:scale-105 font-semibold rounded-3xl bg-[#465697]">
           <a href={sourceCode}>Source Code</a>
        </button>
      </div>
    </div>

  
  );
};

export default ProjectCard;
