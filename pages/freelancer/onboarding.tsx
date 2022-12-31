import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import Bio from "../../components/freelancer/onboarding/bio";

const steps = [
  {
    id: 1,
    step: "bio",
    stepHtml: <Bio />,
  },
  {
    id: 2,
    step: "education",
    stepHtml: <div className="w-full h-full bg-red-500">.</div>,
  },
  {
    id: 3,
    step: "experience",
    stepHtml: <div className="w-full h-full bg-yellow-500">.</div>,
  },
];

export default function OnBoarding() {
  const authState = useSelector((state: any) => state.user);
  const [currentStep, setCurrentStep] = useState(0);
  const [finalStep, setFinalStep] = useState(false);
  const router = useRouter();

  function handleNextStep() {
    if (currentStep !== steps.length - 1) {
      setCurrentStep((prevStep) => (prevStep += 1));
    } else if (currentStep === steps.length - 1) {
      setFinalStep(true);
    }
  }

  function handlePrevStep() {
    if (currentStep !== 0) {
      setCurrentStep((prevStep) => (prevStep -= 1));
    } else {
      setFinalStep(false);
    }
  }

  console.log(currentStep, finalStep);

  //   function handleRedirect() {
  //     router.push("/auth/login");
  //   }

  //   useEffect(() => {
  //     if (!authState.isLoggedIn) {
  //       setTimeout(() => {
  //         handleRedirect();
  //       }, 1000);
  //     }
  //   }, []);

  return (
    <div className="h-screen max-h-screen overflow-hidden">
      <header className="px-2 py-1 w-full h-14 bg-white border-b shadow border-gray-300  flex items-center justify-center text-teal-900 font-semibold">
        <p className="truncate">
          wooo welcome Lets get your work profile ready{" "}
        </p>
      </header>
      <main className=" h-full  w-full">{steps[currentStep]?.stepHtml}</main>
      <footer className="w-full h-14 shadow-inner border-t border-gray-300 px-4 py-4 bg-white fixed bottom-0 flex gap-x-4 items-center justify-end">
        {currentStep !== 0 && (
          <button
            onClick={handlePrevStep}
            className=" inline-flex items-center justify-center shadow bg-transparent border rounded border-gray-300 focus:shadow-md focus:shadow-gray-300 p-2 w-28 "
          >
            previous
          </button>
        )}
        <button className="inline-flex items-center justify-center shadow shadow-teal-500 bg-teal-600 rounded  text-gray-100  focus:shadow-md focus:shadow-teal-400 p-2 w-28 ">
          submit
        </button>
        <button
          onClick={handleNextStep}
          className=" inline-flex items-center justify-center shadow bg-transparent border rounded border-gray-300 focus:shadow-md focus:shadow-gray-300 p-2 w-28 "
        >
          {finalStep ? "complete" : "next"}
        </button>
      </footer>
    </div>
  );
}
