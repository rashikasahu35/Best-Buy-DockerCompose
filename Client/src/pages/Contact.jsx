import React from "react";
import { FaGithub as Github } from "react-icons/fa";
import { FaLinkedin as LinkedIn } from "react-icons/fa";
import { FaRegUser as Portfolio } from "react-icons/fa";

const Contact = () => {
  return (
    <>
      <section className="min-h-screen mt-16 lg:mt-10 flex flex-col lg:flex-row">
        <div className="flex flex-col items-center justify-center w-full bg-gray-800 text-white py-8">
          <h2 className="text-xl md:text-4xl font-semibold mb-4">
            Get in touch
          </h2>
          <p className=" text-xl md:text-2xl mb-4">
            <a
              href="https://rashikasahu.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-500 hover:text-indigo-600 transition duration-300"
            >
              Rashika Sahu
            </a>
          </p>

          <div className="flex space-x-4">
            <a
              href="https://github.com/rashikasahu35"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-base md:text-xl hover:text-indigo-500 transition duration-300"
            >
              <Github />
            </a>
            <a
              href="https://www.linkedin.com/in/rashika-sahu-a28167211/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-base md:text-xl hover:text-indigo-500 transition duration-300"
            >
              <LinkedIn />
            </a>
            <a
              href="https://rashikasahu.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-base md:text-xl hover:text-indigo-500 transition duration-300"
            >
              <Portfolio />
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
