import React from "react";
import Toast from "./toast";

type RequireAuth = {
  reroute: boolean;
  loading: boolean;
};
export default function RequireAuth({ reroute, loading }: RequireAuth) {
  return (
    <div className="w-full h-screen relative flex  items-center justify-center px-2 ">
      {loading && (
        <div className="h-screen w-1/2 absolute top-1 bottom-0 right-10 flex flex-col items-end justify-start gap-y-4">
          <Toast
            className="border-l-8 border-l-yellow-600 text-gray-800"
            body={
              <div className="flex items-center justify-start w-full gap-x-4 text-yellow-800 font-semibold">
                <div
                  className="animate-spin border-b-2 border-yellow-800  border-l-2 inline-block w-5 h-5 border rounded-full"
                  role="status"
                >
                  <span className="hidden">Loading...</span>
                </div>
                {loading ? (
                  <span>loading</span>
                ) : (
                  <span>rerouting to login page</span>
                )}
              </div>
            }
          />
        </div>
      )}
      <div className=" w-full md:w-1/2 h-1/2 md:h-3/4 flex items-center justify-center flex-col md:flex-col-reverse gap-y-2 ">
        <img
          src="/images/undraw_secure_login_pdn4(1).svg"
          alt="login"
          className="w-full h-full"
        />
        <p className="text-teal-800 font-semibold">
          Please <strong>Login</strong> to access page
        </p>
      </div>
    </div>
  );
}
