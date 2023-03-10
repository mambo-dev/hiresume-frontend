import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Menu from "../utils/menu";
import { useAuth } from "../../hooks/auth";

export default function FreelancerLayout({ children }: any) {
  const [isFixed, setIsFixed] = useState(false);
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { logout } = useAuth();

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
          isFixed ? "fixed" : "relative"
        } transition-all ease-in-out w-full py-2 px-2 bg-white h-14 shadow flex justify-between items-center`}
      >
        <div className="h-full w-36 ">
          <Link href="/">
            <img
              src="/images/logo-bgless.png"
              className="w-full h-3/4 object-cover"
              alt="logo"
            />
          </Link>
        </div>
        <nav className=" hidden h-full w-3/4 md:flex justify-between items-center gap-x-4 px-1">
          <div className="w-3/4 px-2 text-gray-700 font-semibold flex items-center gap-x-3 justify-around  ">
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
                <p className="hover:underline cursor-pointer hover:-translate-y-1 hover:font-bold ">
                  {link.name}
                </p>
              </Link>
            ))}
          </div>
          <div className="w-1/4 h-[fit-content] flex items-center justify-end gap-x-6 ">
            <button className="w-10 h-10 rounded-full inline-flex items-center justify-center bg-teal-100">
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
            <button className="w-10 h-10 rounded-full inline-flex items-center justify-center bg-blue-100 ">
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

            <Menu
              open={menuOpen}
              setOpen={setMenuOpen}
              className="outline-none w-10 h-10 rounded-full z-10 "
            >
              <motion.ul
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className={` flex  flex-col top-16 rounded absolute right-0 bg-white py-2 px-2 w-48 shadow  items-center gap-y-2  text-teal-800 font-semibold`}
              >
                <Link href="/freelancer/profile">
                  <li className="flex items-center justify-start px-10 gap-x-4 w-full py-1 rounded   hover:bg-teal-600 hover:text-white">
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
                        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    profile
                  </li>
                </Link>
                <Link href="/freelancer/settings">
                  <li className=" flex items-center  justify-start px-10 gap-x-4 w-full py-1 rounded   hover:bg-teal-600  hover:text-white">
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
                        d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    settings
                  </li>
                </Link>

                <button
                  onClick={logout}
                  className=" inline-flex items-center  justify-start px-10 gap-x-4 w-full py-1 rounded   hover:bg-teal-600  hover:text-white"
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
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                    />
                  </svg>
                  Logout
                </button>
              </motion.ul>
            </Menu>
          </div>
        </nav>
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
            className="flex flex-col z-10 py-2 px-2 gap-y-4 top-14 bg-white shadow border-l w-full  h-screen sm:w-1/2 right-0 bottom-0  absolute    md:hidden"
          >
            <div className="w-full h-[fit-content] flex justify-around ">
              <Link href="/freelancer/profile">
                <img
                  src="/images/avatar.png"
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
              <button
                onClick={logout}
                className="inline-flex items-center justify-center shadow shadow-orange-500 bg-orange-600 rounded  text-gray-100  focus:shadow-md focus:shadow-orange-400 p-2 w-full "
              >
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
