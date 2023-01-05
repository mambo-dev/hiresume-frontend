import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function FreelancerLayout({ children }: any) {
  const [isFixed, setIsFixed] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 50) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="h-screen max-h-screen overflow-auto flex flex-col  ">
      <header
        className={`${
          isFixed ? "fixed" : ""
        } transition-all ease-in-out w-full py-2 px-2 bg-white h-14 shadow flex justify-between items-center`}
      >
        <div className="h-full w-36 ">
          <img
            src="/images/logo-bgless.png"
            className="w-full h-3/4 object-cover"
            alt="logo"
          />
        </div>
        <nav className="h-full flex justify-between gap-x-4 px-1"></nav>
        <button
          className="md:hidden inline-flex justify-center items-center"
          onClick={() => setOpen(!open)}
        >
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
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
        {open && (
          <motion.nav
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col py-2 px-2 gap-y-4 top-14 bg-white shadow border-l w-full   sm:w-1/2 right-0 bottom-0  absolute max-h-screen   md:hidden"
          >
            <div className="w-full h-[fit-content] flex justify-around ">
              <Link href="/freelancer/profile">
                <img
                  src="https://images.unsplash.com/photo-1672888560227-aaf9b90d480a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
                  className="w-12 h-12 rounded-full"
                  alt="profile"
                />
              </Link>
              <button className="w-12 h-12  rounded-full inline-flex items-center justify-center bg-teal-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-teal-900"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                  />
                </svg>
              </button>
              <button className="w-12 h-12  rounded-full inline-flex items-center justify-center bg-blue-100 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-blue-800"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                  />
                </svg>
              </button>
            </div>
            <div className="w-full p-6 text-gray-800 flex items-center gap-y-6 justify-center flex-col ">
              {[
                {
                  name: "Find projects",
                  link: "/freelancer",
                },
                {
                  name: "Reports",
                  link: "/freelancer/reports",
                },
                {
                  name: "My contracts",
                  link: "/freelancer/contracts",
                },
              ].map((link: any, index: number) => (
                <Link key={index} href={link.link}>
                  <motion.p
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    className="hover:underline cursor-pointer "
                  >
                    {link.name}
                  </motion.p>
                </Link>
              ))}
            </div>
            <div className="w-full flex justify-around">
              <button className="inline-flex items-center justify-center shadow shadow-orange-500 bg-orange-600 rounded  text-gray-100  focus:shadow-md focus:shadow-orange-400 p-2 w-full ">
                Log out{" "}
              </button>
            </div>
          </motion.nav>
        )}
      </header>
      {children}
    </div>
  );
}
