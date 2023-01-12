import React, { ReactElement, useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import FreelancerLayout from "../../component/layouts/freelancer-layout";
import { useAuth } from "../../hooks/auth";
import { useRouter } from "next/router";
import Toast from "../../component/utils/toast";
import Image from "next/image";
import RequireAuth from "../../component/utils/require-auth";
import axios from "axios";
import { error, errorSvg, successSvg } from "../auth/signup";
import { freelancer_education, ProfileInterface } from "./types";
import { GetServerSideProps } from "next";
import { User, UserContext } from "../../context/context";
import Modal from "../../component/utils/modal";
import UpdateBio from "../../component/freelancer/profile/bio/update-bio";
import AddEducation from "../../component/freelancer/profile/education/add-education";
import UpdateEducation from "../../component/freelancer/profile/education/update-education";
import DeleteEducation from "../../component/freelancer/profile/education/delete-education";
import AddExperience from "../../component/freelancer/profile/experience/add-experience";
import UpdateExperience from "../../component/freelancer/profile/experience/update-experience";
import DeleteExperience from "../../component/freelancer/profile/experience/delete-experience";

export default function Profile<NextPageWithLayout>({ data }: any) {
  const { authenticated, reroute, loading, token } = useAuth();
  const [availabilityLoading, setAvailabilityLoading] = useState(false);
  const [updateAvailability, setUpdateAvailability] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [available, setAvailable] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openEducationModal, setOpenEducationModal] = useState(false);
  const [openExpeirenceModal, setOpenExperienceModal] = useState(false);
  const [openUpdateEducationModal, setOpenUpdateEducationModal] =
    useState(false);
  const [openUpdateExperienceModal, setOpenUpdateExperienceModal] =
    useState(false);
  const [currentEducation, setCurrentEducation] =
    useState<freelancer_education | null>();
  const [currentExperience, setCurrentExperience] = useState<any>();
  const [openDeleteEducation, setOpenDeleteEducation] = useState(false);
  const [openDeleteExperience, setOpenDeleteExperience] = useState(false);
  const [errors, setErrors] = useState<error[]>([]);
  const router = useRouter();

  const { success, profile } = data;

  useEffect(() => {
    setProfileSuccess(true);
    if (!success) {
      setProfileSuccess(false);
    }
  }, [profileSuccess]);

  const handleUpdateAvailability = async () => {
    try {
      setAvailabilityLoading(true);
      const updateAvailability = await axios.get(
        `http://localhost:4000/freelancers/update-availability`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (updateAvailability) {
        setAvailable(updateAvailability.data.freelancer_availability);
        setUpdateAvailability(true);
        setAvailabilityLoading(false);
        setTimeout(() => {
          setUpdateAvailability(false);
        }, 3000);
      }
    } catch (error) {
      setAvailabilityLoading(false);
      setErrors((prevErrors) => [
        ...prevErrors,
        {
          message: "could not update availability ",
        },
      ]);
    }
  };

  if (!authenticated) {
    setTimeout(() => {
      if (!loading) {
        router.replace("/auth/login");
      }
    }, 3000);

    return <RequireAuth reroute={reroute} loading={loading} />;
  } else {
    return (
      <div className="flex flex-col md:flex-row md:overflow-hidden">
        {errors.length > 0 && (
          <div className="h-screen w-1/2 absolute top-1 bottom-0 right-10 flex flex-col items-end justify-start gap-y-4">
            {errors.map((error) => (
              <Toast
                message={error?.message}
                className="border-l-8 border-l-red-600 text-gray-800"
                svg={errorSvg}
              />
            ))}
          </div>
        )}

        {!profileSuccess && (
          <div className="h-screen w-1/2  absolute top-1 bottom-0 right-10 flex flex-col items-end justify-start gap-y-4">
            <Toast
              message="failed to retrieve profile "
              className="border-l-8 border-l-green-600 text-green-800 font-bold"
              svg={successSvg}
              setOpen={setProfileSuccess}
            />
          </div>
        )}

        {updateAvailability && (
          <div className="h-screen w-1/2  absolute top-1 bottom-0 right-10 flex flex-col items-end justify-start gap-y-4">
            <Toast
              message="availability updated"
              className="border-l-8 border-l-green-600 text-green-800 font-bold"
              svg={successSvg}
            />
          </div>
        )}

        {availabilityLoading && (
          <div className="h-screen w-1/2 absolute top-1 bottom-0 right-10 flex flex-col items-end justify-start gap-y-4">
            <Toast
              className="border-l-8 border-l-teal-600 text-teal-800 font-bold"
              body={
                <div className="flex items-center justify-start w-full gap-x-4 text-teal-800">
                  <div
                    className="animate-spin border-b-2 border-teal-800  border-l-2 inline-block w-5 h-5 border rounded-full"
                    role="status"
                  >
                    <span className="hidden">Loading...</span>
                  </div>
                  <span>updating</span>
                </div>
              }
            />
          </div>
        )}
        <div className="h-screen w-full flex flex-col py-8 gap-y-4 items-center bg-gradient-to-r from-slate-200 via-slate-50 md:w-2/5 ">
          <div className="relative w-40 h-40 group">
            <img
              className="w-40 h-40 relative rounded-full border  "
              src={profile.freelancer_Bio.bio_image_url}
              alt="bio"
            />
            <div className="absolute  bg-opacity-60 hidden rounded-full group-hover:flex items-center justify-center bg-teal-200 top-0 right-0 left-0 bottom-0">
              <button className="inline-flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-10 h-10  text-teal-900"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-y-4 items-start text-gray-700 font-medium">
            <div className="flex items-center justify-center gap-x-2 py-3 px-1 ">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
              </span>{" "}
              <p>{profile?.freelancer_user.user_email}</p>
            </div>
            <div className="flex items-center justify-center gap-x-2 py-3 px-1 ">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
              </span>{" "}
              <p>{profile?.freelancer_user.user_country}</p>
            </div>
            <div className="flex items-center justify-center gap-x-2  py-3 px-1 ">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
                  />
                </svg>
              </span>{" "}
              <p>{available ? "available for work " : "busy at the moment"}</p>
            </div>
            <div className="flex items-center justify-center w-full  py-4  ">
              {availabilityLoading ? (
                <button
                  type="button"
                  disabled={true}
                  className="inline-flex items-center justify-center bg-opacity-70 gap-x-2 shadow shadow-teal-500 bg-teal-600 rounded  text-gray-100  focus:shadow-md focus:shadow-teal-400 p-2 w-full "
                >
                  <div
                    className="animate-spin border-b-2   border-l-2 inline-block w-5 h-5 border rounded-full"
                    role="status"
                  >
                    <span className="hidden">Loading...</span>
                  </div>
                  <span>loading...</span>
                </button>
              ) : (
                <button
                  onClick={handleUpdateAvailability}
                  className="inline-flex items-center justify-center shadow shadow-teal-500 bg-teal-600 rounded  text-gray-100  focus:shadow-md focus:shadow-teal-400 p-2 w-full "
                >
                  update availability
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="h-full border-l md:overflow-y-auto px-4 md:pr-32 bg-white  shadow-lg  py-8 bg-transparent w-full flex flex-col gap-y-4 items-start  md:w-3/5 ">
          <div className="flex flex-col gap-y-4 items-start justify-start ">
            <span className="text-2xl text-teal-900 font-bold">
              Professional Summary
            </span>
            <span className="text-2xl text-teal-900 font-bold flex items-center justify-between w-full">
              <h1 className="text-xl text-teal-800 font-bold">
                {profile?.freelancer_Bio.bio_title}
              </h1>
              <Modal isOpen={openModal} setIsOpen={setOpenModal}>
                <UpdateBio
                  token={token}
                  bio_id={profile?.freelancer_Bio.id}
                  freelancer_id={profile?.id}
                  current_bio_details={profile?.freelancer_Bio}
                />
              </Modal>
              <button onClick={() => setOpenModal(true)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-blue-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </button>
            </span>
            <p className="text-gray-800 font-medium ">
              {profile?.freelancer_Bio.bio_description}
            </p>
          </div>
          <div className="flex flex-col gap-y-2 items-start justify-start w-full">
            <span className="text-2xl text-teal-900 font-bold flex items-center justify-between w-full">
              <p>Work Experience</p>{" "}
              <Modal
                isOpen={openExpeirenceModal}
                setIsOpen={setOpenExperienceModal}
              >
                <AddExperience token={token} setOpen={setOpenExperienceModal} />
              </Modal>
              <button
                onClick={() => setOpenExperienceModal(true)}
                className="inline-flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </span>
            {profile?.freelancer_experience.map(
              (experience: any, index: number) => (
                <div
                  key={index}
                  className="h-[fit-content] py-2 w-full border-b border-gray-200 flex items-center justify-between "
                >
                  <div className="w-3/4 flex flex-col items-start justify-start  ">
                    <p className="text-teal-700 text-lg">
                      {experience.experience_position}
                    </p>
                    <span className=" text-gray-700">
                      {experience.experience_company}
                    </span>
                    <p className="text-gray-500">Kenya</p>
                    <p className=" font-bold text-xs text-gray-800">
                      {new Date(experience.experience_year_from).getFullYear()}{" "}
                      - {new Date(experience.experience_year_to).getFullYear()}
                    </p>
                  </div>
                  <div className="w-1/4 flex flex-col items-end justify-end gap-y-2">
                    <span className="p-1 rounded-2xl px-2 bg-teal-100 text-teal-700 font-bold">
                      remote
                    </span>
                    <Modal
                      isOpen={openUpdateExperienceModal}
                      setIsOpen={setOpenUpdateExperienceModal}
                    >
                      <UpdateExperience
                        freelancer_id={profile.id}
                        currentExperienceValues={currentExperience}
                        token={token}
                        setOpen={setOpenUpdateExperienceModal}
                      />
                    </Modal>
                    <div className="flex items-center gap-x-2 ">
                      <button
                        onClick={() => {
                          setCurrentExperience(experience);
                          setOpenUpdateExperienceModal(true);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5 text-blue-500"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          />
                        </svg>
                      </button>
                      <Modal
                        isOpen={openDeleteExperience}
                        setIsOpen={setOpenDeleteExperience}
                      >
                        <DeleteExperience
                          type="experience"
                          freelancer_id={profile.id}
                          currentExperienceDetails={currentExperience}
                          token={token}
                          setOpen={setOpenDeleteExperience}
                        />
                      </Modal>
                      <button
                        onClick={() => {
                          setCurrentExperience(experience);
                          setOpenDeleteExperience(true);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5 text-red-500"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
          <div className="flex flex-col gap-y-2 items-start justify-start w-full">
            <span className="text-2xl text-teal-900 font-bold flex items-center justify-between w-full">
              <p>Education</p>{" "}
              <Modal
                isOpen={openEducationModal}
                setIsOpen={setOpenEducationModal}
              >
                <AddEducation
                  token={token}
                  setOpenEducationModal={setOpenEducationModal}
                />
              </Modal>
              <button
                onClick={() => setOpenEducationModal(true)}
                className="inline-flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </span>
            {profile?.freelancer_education.map(
              (education: freelancer_education, index: number) => {
                return (
                  <div
                    key={education.id}
                    className="h-[fit-content] py-2 w-full border-b border-gray-200 flex items-center justify-between "
                  >
                    <div className="w-3/4 flex flex-col items-start justify-start  ">
                      <p className="text-teal-700 text-lg">
                        {education.education_school}
                      </p>

                      <p className="text-gray-500">
                        {profile.freelancer_user.user_country}
                      </p>
                    </div>
                    <div className="w-1/4 flex flex-col items-end justify-end gap-y-2">
                      <span className="p-1 px-2 w-full flex items-end justify-end text-gray-700 text-sm ">
                        {new Date(education.education_year_from).getFullYear()}{" "}
                        - {new Date(education.education_year_to).getFullYear()}
                      </span>
                      <div className="flex items-center gap-x-2 ">
                        <button
                          onClick={() => {
                            setOpenUpdateEducationModal(true);
                            setCurrentEducation(education);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5 text-blue-500"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                            />
                          </svg>
                        </button>
                        <Modal
                          isOpen={openUpdateEducationModal}
                          setIsOpen={setOpenUpdateEducationModal}
                        >
                          <UpdateEducation
                            token={token}
                            currentEducationDetails={currentEducation}
                            education_id={currentEducation?.id}
                            freelancer_id={profile.id}
                            type="education"
                          />
                        </Modal>

                        <button
                          onClick={() => {
                            setOpenDeleteEducation(true);
                            setCurrentEducation(education);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5 text-red-500"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </button>
                        <Modal
                          isOpen={openDeleteEducation}
                          setIsOpen={setOpenDeleteEducation}
                        >
                          <DeleteEducation
                            setOpen={setOpenDeleteEducation}
                            currentEducationDetails={currentEducation}
                            freelancer_id={profile?.id}
                            type="education"
                            token={token}
                          />
                        </Modal>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
          <div className="flex flex-col gap-y-2 items-start justify-start w-full">
            <span className="text-2xl text-teal-900 font-bold">Files</span>
            {[1].map((number) => (
              <div className="h-24  text-blue-800 hover:underline w-full border-b border-gray-200">
                <Link href="https://hiresumefiles.s3.ap-northeast-1.amazonaws.com/7b3b5d60-ccb6-47f5-9be7-bb2b35722682-design-3.png?AWSAccessKeyId=AKIAUZRZESOPSM4RES74&Expires=1673004502&Signature=609w038WMnMAgICYUwKeYOMROGk%3D">
                  <div className="flex items-center  gap-x-2">
                    <img src="/images/icons8-png-24.png" alt="file-icon" />
                    <p>design-3.png</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

Profile.getLayout = function getLayout(page: ReactElement) {
  return <FreelancerLayout>{page}</FreelancerLayout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { req } = context;
    //@ts-ignore

    const user: User = JSON.parse(req.cookies.user);
    if (user.user_role !== "freelancer") {
      return {
        redirect: {
          permanent: false,
          destination: "/auth/login",
        },
      };
    }

    const getProfile = await axios.get(
      `http://localhost:4000/freelancers/full-profile`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${req.cookies.access_token}`,
        },
      }
    );

    return {
      props: {
        data: {
          profile: getProfile.data,
          success: true,
        },
      },
    };
  } catch (error) {
    return {
      props: {
        data: {
          profile: {},
          success: false,
        },
      },
    };
  }
};
