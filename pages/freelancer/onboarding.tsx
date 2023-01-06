import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import Bio from "../../component/freelancer/onboarding/bio";
import Education from "../../component/freelancer/onboarding/education";
import Experience from "../../component/freelancer/onboarding/experience";
import { useAuth } from "../../hooks/auth";
import RequireAuth from "../../component/utils/require-auth";

const steps = [
  {
    id: 1,
    step: "bio",
    stepHtml: <Bio />,
  },
  {
    id: 2,
    step: "education",
    stepHtml: <Education />,
  },
  {
    id: 3,
    step: "experience",
    stepHtml: <Experience />,
  },
];

export default function OnBoarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [finalStep, setFinalStep] = useState(false);
  const router = useRouter();
  const { authenticated, reroute, loading } = useAuth();

  if (!authenticated) {
    setTimeout(() => {
      if (!loading) {
        router.replace("/auth/login");
      }
    }, 3000);

    return <RequireAuth reroute={reroute} loading={loading} />;
  }

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

  return (
    <div className="h-screen max-h-screen overflow-auto">
      <header className="px-2 py-1 w-full h-14 bg-white border-b shadow border-gray-300  flex items-center justify-center text-teal-900 font-semibold">
        <p className="truncate">
          wooo welcome Lets get your work profile ready{" "}
        </p>
      </header>
      <main className=" overflow-y-auto h-full  w-full">
        {steps[currentStep]?.stepHtml}
      </main>
      <footer className="w-full h-14 shadow-inner border-t border-gray-300 px-4 py-4 bg-white fixed bottom-0 flex gap-x-4 items-center justify-end">
        {currentStep !== 0 && (
          <button
            onClick={handlePrevStep}
            className=" inline-flex items-center justify-center shadow bg-transparent border rounded border-gray-300 focus:shadow-md focus:shadow-gray-300 p-2 w-28 "
          >
            previous
          </button>
        )}

        {currentStep === steps.length - 1 ? (
          <button
            onClick={() => router.push("/freelancer/profile")}
            className=" inline-flex items-center justify-center shadow bg-transparent border rounded border-gray-300 focus:shadow-md focus:shadow-gray-300 p-2 w-28 "
          >
            complete
          </button>
        ) : (
          <button
            onClick={handleNextStep}
            className=" inline-flex items-center justify-center shadow bg-transparent border rounded border-gray-300 focus:shadow-md focus:shadow-gray-300 p-2 w-28 "
          >
            next
          </button>
        )}
      </footer>
    </div>
  );
}
