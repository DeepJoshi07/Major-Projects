import ProjectCard from "./ProjectCard";
import linkedin from '../../assets/linkedin.png'
import fashion from '../../assets/fashion-app.png'
import social from '../../assets/social-app.png'
import chat from '../../assets/chat-app.png'
const Projects = () => {
  return (
    <div id="Projects" className="p-10 md:p-24 text-white ">
      <h1 className="text-2xl md:text-4xl text-white font-bold">Projects</h1>
      <div className="py-12 px-8 flex flex-wrap gap-5">
        <ProjectCard
          img={chat}
          demoLink={"https://chat-app-frontend-alsb.onrender.com"}
          sourceCode={"https://github.com/DeepJoshi07/Major-Projects/tree/main/Chat%20App"}
          title={"Chat-app"}
          main={
            "I've developed a real-time web application using the MERN stack (MongoDB, Express.js, React.js, Node.js), enhanced by Socket.IO for bi-directional communication and Zustand for lean, scalable state management in React."

          }
        />
        <ProjectCard
        img={fashion}
          demoLink={"https://fashion-frontend-six.vercel.app"}
          sourceCode={"https://github.com/DeepJoshi07/Major-Projects/tree/main/fashion-app"}
          title={"Fashion-app"}
          main={
            "I’ve built a stylish and responsive fashion e-commerce platform using React.js, with smooth state management powered by Context API. The app features seamless payment integration via Stripe and Razorpay, giving customers flexible options during checkout."

          }
        />
        <ProjectCard
        img={social}
          demoLink={"https://social-app-rosy-sigma.vercel.app/"}
          sourceCode={"https://github.com/DeepJoshi07/Major-Projects/tree/main/social-media-app"}
          title={"Social-app"}
          main={
            "I've built a powerful full-stack application using Next.js, with Prisma as your ORM to efficiently connect and manage your database. The app also features image upload to the cloud, allowing users to add media seamlessly and store it securely (IN Progress....)."
          }
        />
        <ProjectCard
        img={linkedin}
          demoLink={"https://linkedin-frontend-qjjv.onrender.com"}
          sourceCode={"https://github.com/DeepJoshi07/Major-Projects/tree/main/LinkedIn"}
          title={"LinkedIn-app-clone"}
          main={
            "You've built a professional networking app using React.js, with Context API for state management and Socket.IO enabling real-time features that mirror LinkedIn’s dynamic environment."
          }
        />
      </div>
    </div>
  );
};

export default Projects;
