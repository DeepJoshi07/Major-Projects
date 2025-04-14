import React, { useContext, useRef, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { userDataContext } from "../Context/UserContext";
import dp from "../assets/dp.png";
import { MdOutlineCameraAlt } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import axios from "axios";

function EditProfile() {
  const { setEditProfile, userData, serverUrl } = useContext(userDataContext);

  const [firstName, setFirstName] = useState(userData.firstName || null);
  const [lastName, setLastName] = useState(userData.lastName || null);
  const [userName, setUserName] = useState(userData.userName || null);
  const [email, setEmail] = useState(userData.email || null);
  const [gender, setGender] = useState(userData.gender || null);
  const [location, setLocation] = useState(userData.location || null);
  const [headline,setHeadline] = useState(userData.headline || null);

  const [experience, setExperience] = useState(userData.experience || []);
  const [newExperiece, setNewExperience] = useState({
    title: null,
    company: null,
    description: null,
  });
  const addExperience = () => {
    if (
      newExperiece.title &&
      newExperiece.company &&
      newExperiece.description
    ) {
      setExperience([...experience, newExperiece]);
    }
    setNewExperience({
      ...newExperiece,
      title: "",
      company: "",
      description: "",
    });
  };
  const experienceDelete = (ex) => {
    setExperience(() => experience.filter((e) => e !== ex));
  };

  const [education, setEducation] = useState(userData.education || []);
  const [newEducation, setNewEducation] = useState({
    college: null,
    degree: null,
    fieldOfStudy: null,
  });
  const addEducation = () => {
    if (
      newEducation.college &&
      newEducation.degree &&
      newEducation.fieldOfStudy
    ) {
      setEducation([...education, newEducation]);
    }
    setNewEducation({
      ...newEducation,
      college: "",
      degree: "",
      fieldOfStudy: "",
    });
  };
  const educationDelete = (edu) => {
    setEducation(() => education.filter((e) => e !== edu));
  };

  const [skills, setSkills] = useState(userData.skills || null);
  const [newSkill, setNewSkill] = useState();
  const addSkills = () => {
    if (newSkill) {
      setSkills([...skills, newSkill]);
    }
    setNewSkill("");
  };
  const skillDelete = (skill) => {
    setSkills(() => skills.filter((s) => s !== skill));
  };

  const [frontendProfileImage, setFrontendProfileImage] = useState(
    userData.profileImage || dp
  );
  const [backendProfileImage, setBackendProfileImage] = useState(null);
  const profileimage = useRef();
  const handleProfileImage = (e) => {
    let file = e.target.files[0];
    setBackendProfileImage(file)
    setFrontendProfileImage(URL.createObjectURL(file))
  };

  const [frontendCoverImage, setFrontendCoverImage] = useState(
    userData.coverImage || null
  );
  const [backendCoverImage, setBackendCoverImage] = useState(null);
  const coverimage = useRef();
  const handleCoverImage = (e) => {
    let file = e.target.files[0];
    setBackendCoverImage(file);
    setFrontendCoverImage(URL.createObjectURL(file))
  };

  const [saving,setSaving] = useState(false)
  const addAllDetails = async () => {
    setSaving(true)
    try {
      let formData = new FormData();
      formData.append("firstName",firstName)
      formData.append("lastName",lastName)
      formData.append("userName",userName)
      formData.append("email",email)
      formData.append("headline",headline)
      formData.append("location",location)
      formData.append("skills",JSON.stringify(skills))
      formData.append("education",JSON.stringify(education))
      formData.append("experience",JSON.stringify(experience))

      if(backendProfileImage){
        formData.append("profileImage",backendProfileImage)
      }
      if(backendCoverImage){
        formData.append("coverImage",backendCoverImage)
      }
      await axios.put(serverUrl + "/user/updateuserdata",
        formData,{ withCredentials:true}
      )
      setSaving(false)
      setEditProfile(false)
      
    } catch (error) {
      setSaving(false)
      console.log(error);
      
    }
  };

  return (
    <div className="w-full h-[100vh] fixed top-0 flex flex-col justify-center items-center z-100">
      <div className="w-full h-[100vh] flex flex-col justify-center items-center bg-black opacity-60   "></div>
      <div className="w-[90%] max-w-[500px] h-[600px] p-[10px] bg-white rounded-lg absolute overflow-y-scroll z-200">
        <div className="text-gray-600 text-3xl absolute right-[20px] top-[17px] cursor-pointer">
          <MdOutlineClose onClick={() => setEditProfile(false)} />
        </div>
        {/* cover-image */}
        <div
          onClick={() => coverimage.current.click()}
          className="w-full h-[120px] relative mt-[50px] bg-gray-400 rounded-lg"
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleCoverImage}
            hidden
            ref={coverimage}
          />
          <img src={frontendCoverImage ? frontendCoverImage : null} className="w-full h-full rounded-lg" alt="" />
          <div className=" absolute text-white top-[20px] right-[20px]">
            <MdOutlineCameraAlt className="cursor-pointer text-3xl" />
          </div>
        </div>
        {/* profile-image */}
        <div
          onClick={() => profileimage.current.click()}
          className="cursor-pointer absolute top-[140px] left-[40px] h-[70px] w-[70px] overflow-hidden bg-black rounded-full"
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleProfileImage}
            hidden
            ref={profileimage}
          />
          <img
            src={frontendProfileImage ?frontendProfileImage : dp}
            alt=""
            className="w-full h-full"
          />
        </div>
        <div className="absolute cursor-pointer h-[25px] w-[25px] rounded-full top-[185px] left-[90px] text-white bg-[#0a66c2] flex justify-center items-center">
          <FaPlus />
        </div>
        <div className="mt-[50px] flex flex-col gap-[10px]">
          {/* firstname */}
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            placeholder="FirstName"
            className="h-[50px] w-[100%] border-2 border-gray-600 text-gray-800 text-[18px] px-[20px] py-[10px]  focus:border-blue-500 focus:outline-none rounded-md"
          />

          {/* lastname */}
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            placeholder="LastName"
            className="h-[50px] w-[100%] border-2 border-gray-600 text-gray-800 text-[18px] px-[20px] py-[10px]  focus:border-blue-500 focus:outline-none rounded-md"
          />

          {/* username */}
          <input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            placeholder="UserName"
            className="h-[50px] w-[100%] border-2 border-gray-600 text-gray-800 text-[18px] px-[20px] py-[10px]  focus:border-blue-500 focus:outline-none rounded-md"
          />

          {/* email */}
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="h-[50px] w-[100%] border-2 border-gray-600 text-gray-800 text-[18px] px-[20px] py-[10px]  focus:border-blue-500 focus:outline-none rounded-md"
          />
          {/* headline */}
          <input
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            type="text"
            placeholder="Headline"
            className="h-[50px] w-[100%] border-2 border-gray-600 text-gray-800 text-[18px] px-[20px] py-[10px]  focus:border-blue-500 focus:outline-none rounded-md"
          />
          {/* location */}
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            type="text"
            placeholder="Location"
            className="h-[50px] w-[100%] border-2 border-gray-600 text-gray-800 text-[18px] px-[20px] py-[10px]  focus:border-blue-500 focus:outline-none rounded-md"
          />
          {/* gender */}
          <div className="flex justify-between px-[20px] border-2 rounded-lg border-gray-600 items-center h-[50px]">
            Gender :
            <label>
              <input
                type="radio"
                name="color"
                value="male"
                checked={gender === "male"?true:false}
                onClick={() => setGender("male")}
              />{" "}
              male
            </label>
            <label>
              <input
                type="radio"
                name="color"
                value="female"
                checked={gender === "female"?true:false}
                onClick={() => setGender("female")}
              />{" "}
              female
            </label>
            <label>
              <input
                type="radio"
                name="color"
                value="other"
                checked={gender === "other"?true:false}
                onClick={() => setGender("other")}
              />{" "}
              other
            </label>
          </div>

          {/* skills */}
          <div className="border-2 p-[10px] border-gray-600 rounded-lg">
            <h3 className="text-xl font-semibold pb-[10px]">Skills:</h3>
            {skills &&
              skills.map((skill) => (
                <div className="h-[50px] w-[100%] p-[10px] my-[10px] flex justify-between bg-[#0a66c2] rounded-lg text-white">
                  {skill}
                  <MdOutlineClose
                    onClick={() => skillDelete(skill)}
                    className="text-[28px]"
                  />{" "}
                </div>
              ))}
            <input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              type="text"
              placeholder="Add Your Skill"
              className="h-[50px] w-[100%] border-2 border-gray-600 text-gray-800 text-[18px] px-[20px] py-[10px]  focus:border-blue-500 focus:outline-none rounded-md"
            />
            <button
              onClick={addSkills}
              className="w-[100%] my-4 py-[8px] border-1 border-[#0a66c2] rounded-full text-[#0a66c2] font-semibold"
            >
              Add
            </button>
          </div>

          {/* education */}
          <div className="border-2 p-[10px] border-gray-600 rounded-lg">
            <h3 className="text-xl font-semibold pb-[10px]">Education:</h3>
            {education &&
              education.map((edu) => (
                <div className=" w-[100%] flex flex-col relative p-[10px] my-[10px]  bg-[#0a66c2] rounded-lg text-white">
                  <p className="p-[10px]">College : {edu.college}</p>
                  <p className="p-[10px]">Degree : {edu.degree}</p>
                  <p className="p-[10px]">
                    Field of Study : {edu.fieldOfStudy}
                  </p>
                  <MdOutlineClose
                    onClick={() => educationDelete(edu)}
                    className="text-[28px] absolute right-[20px]"
                  />{" "}
                </div>
              ))}
            <input
              value={newEducation.college}
              onChange={(e) =>
                setNewEducation({ ...newEducation, college: e.target.value })
              }
              type="text"
              placeholder="College"
              className="h-[50px] w-[100%] mb-[10px] border-2 border-gray-600 text-gray-800 text-[18px] px-[20px] py-[10px]  focus:border-blue-500 focus:outline-none rounded-md"
            />
            <input
              value={newEducation.degree}
              onChange={(e) =>
                setNewEducation({ ...newEducation, degree: e.target.value })
              }
              type="text"
              placeholder="Degree"
              className="h-[50px] w-[100%] mb-[10px] border-2 border-gray-600 text-gray-800 text-[18px] px-[20px] py-[10px]  focus:border-blue-500 focus:outline-none rounded-md"
            />
            <input
              value={newEducation.fieldOfStudy}
              onChange={(e) =>
                setNewEducation({
                  ...newEducation,
                  fieldOfStudy: e.target.value,
                })
              }
              type="text"
              placeholder="Field of Study"
              className="h-[50px] w-[100%] border-2 border-gray-600 text-gray-800 text-[18px] px-[20px] py-[10px]  focus:border-blue-500 focus:outline-none rounded-md"
            />
            <button
              onClick={addEducation}
              className="w-[100%] my-4 py-[8px] border-1 border-[#0a66c2] rounded-full text-[#0a66c2] font-semibold"
            >
              Add
            </button>
          </div>

          {/* experience */}
          <div className="border-2 p-[10px] border-gray-600 rounded-lg">
            <h3 className="text-xl font-semibold pb-[10px]">Experience:</h3>
            {experience &&
              experience.map((ex) => (
                <div className=" w-[100%] flex flex-col relative p-[10px] my-[10px]  bg-[#0a66c2] rounded-lg text-white">
                  <p className="p-[10px]">Title : {ex.title}</p>
                  <p className="p-[10px]">Company : {ex.company}</p>
                  <p className="p-[10px]">Description : {ex.description}</p>
                  <MdOutlineClose
                    onClick={() => experienceDelete(ex)}
                    className="text-[28px] absolute right-[20px]"
                  />{" "}
                </div>
              ))}
            <input
              value={newExperiece.title}
              onChange={(e) =>
                setNewExperience({ ...newExperiece, title: e.target.value })
              }
              type="text"
              placeholder="Title"
              className="h-[50px] w-[100%] mb-[10px] border-2 border-gray-600 text-gray-800 text-[18px] px-[20px] py-[10px]  focus:border-blue-500 focus:outline-none rounded-md"
            />
            <input
              value={newExperiece.company}
              onChange={(e) =>
                setNewExperience({ ...newExperiece, company: e.target.value })
              }
              type="text"
              placeholder="Company"
              className="h-[50px] w-[100%] mb-[10px] border-2 border-gray-600 text-gray-800 text-[18px] px-[20px] py-[10px]  focus:border-blue-500 focus:outline-none rounded-md"
            />
            <input
              value={newExperiece.description}
              onChange={(e) =>
                setNewExperience({
                  ...newExperiece,
                  description: e.target.value,
                })
              }
              type="text"
              placeholder="Description"
              className="h-[50px] w-[100%] border-2 border-gray-600 text-gray-800 text-[18px] px-[20px] py-[10px]  focus:border-blue-500 focus:outline-none rounded-md"
            />
            <button
              onClick={addExperience}
              className="w-[100%] my-4 py-[8px] border-1 border-[#0a66c2] rounded-full text-[#0a66c2] font-semibold"
            >
              Add
            </button>
          </div>
        </div>
        <button
          onClick={addAllDetails}
          className="w-[100%] my-4 py-[8px] bg-[#0a66c2] rounded-full text-white font-semibold"
        >
          {saving?"saving...":"Add All deatails"}
        </button>
      </div>
    </div>
  );
}

export default EditProfile;
