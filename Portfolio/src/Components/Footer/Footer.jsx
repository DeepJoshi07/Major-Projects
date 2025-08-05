
import { MdOutlineEmail } from "react-icons/md";
import { CiLinkedin } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <div
      id="Footer"
      className="flex justify-around bg-[#465697] text-white p-10 md:p-12 items-center"
    >
      <div>
        <h1 className="text-2xl md:text-6xl font-bold">Contact</h1>
        <h3 className="text-sm md:text-2xl font-normal">
          Feel Free To reach out!
        </h3>
      </div>

      <ul className="text-sm md:text-xl flex flex-col justify-center gap-3">
        <li className="flex gap-2 items-center">
          <a href="" className="flex gap-3 ">
            <span className="text-[25px] mt-[5px]">
              <MdOutlineEmail />
            </span>
            <span className="text-[20px]">joshideep972@gmail.com </span>
          </a>
        </li>
        <li className="flex gap-2 items-center cursor-pointer ">
          <a className="flex gap-3" href="https://www.linkedin.com/in/deep-joshi-90a609340?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app ">
            <span className="text-[25px] ">
              <CiLinkedin />
            </span>
            <span className="text-[20px] hover:underline">
              linkdlin.com/DeepJoshi{" "}
            </span>
          </a>
        </li>
        <li className="flex gap-2 items-center cursor-pointer">
          <a className='flex gap-3' href="https://github.com/DeepJoshi07">
          <span className="text-[25px]">
            <FaGithub />
          </span>
          <span className="text-[20px] hover:underline">
            github.com/DeepJoshi07{" "}
          </span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
