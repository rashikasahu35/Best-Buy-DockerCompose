import React, { useRef, useState } from "react";
import { FaGithub as Github } from "react-icons/fa";
import { FaLinkedin as LinkedIn } from "react-icons/fa";
import { FaRegUser as Portfolio } from "react-icons/fa";
import toast from "react-hot-toast";
import emailjs from '@emailjs/browser';

const Contact = () => {
    const formRef = useRef();
    const [loading, setLoading] = useState(false)

    const submitHandler = async (e) => {
        e.preventDefault();
        const public_key = import.meta.env.VITE_APP_EMAIL_PUBLIC_SECRET_KEY
        setLoading(true)
        emailjs
            .sendForm(
                "service_fyb672m",
                "template_xlyhfol",
                formRef.current ,
                public_key
            )
            .then(
                (result) => {
                    setLoading(false)
                    toast.success("Message send successfully.");
                    console.log(result.text);
                },
                (error) => {
                    setLoading(false)
                    toast.error("Message not send.");
                    console.log(error.text);
                }
            );
    };
    return (
        <>
            <section className="min-h-screen mt-16 lg:mt-10 flex flex-col lg:flex-row">
                {/* personal info */}
                <div className="flex flex-col items-center justify-center w-full lg:w-1/2 bg-gray-800 text-white py-8">
                    <h2 className="text-xl md:text-4xl font-semibold mb-4">
                        Get in touch
                    </h2>
                    <p className=" text-xl md:text-2xl mb-4">
                        <a
                            href="https://rashika-sahu-portfolio.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-500 hover:text-indigo-600 transition duration-300"
                        >
                            Rashika Sahu
                        </a>
                    </p>

                    <div className="flex space-x-4">
                        <a
                            href="https://github.com/logic-found"
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
                            href="https://rashika-sahu-portfolio.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white text-base md:text-xl hover:text-indigo-500 transition duration-300"
                        >
                            <Portfolio />
                        </a>
                    </div>
                </div>

                {/* contact form */}
                <div className="py-8 lg:py-16 lg:px-10 px-4 mx-auto max-w-screen-md w-full lg:w-1/2">
                    <h2 className="mb-4 text-2xl md:text-4xl tracking-tight font-extrabold text-center text-gray-900">
                        Contact
                    </h2>
                    <form
                        ref={formRef}
                        className="space-y-8"
                        onSubmit={submitHandler}
                    >
                        <div>
                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Your email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm"
                                placeholder="name@gmail.com"
                                required
                                name="user_email"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="subject"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Subject
                            </label>
                            <input
                                type="text"
                                id="subject"
                                className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm"
                                placeholder="Let me know how can I help you"
                                required
                                name="subject"
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="message"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Your message
                            </label>
                            <textarea
                                id="message"
                                rows="3"
                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300"
                                placeholder="Leave a message..."
                                name="message"
                            ></textarea>
                        </div>
                        <input
                            type="submit"
                            className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-indigo-600 sm:w-fit hover:bg-indigo-700 cursor-pointer disabled:cursor-not-allowed"
                            value={`${loading? "Sending...": "Send message"}`}
                            disabled={loading}
                        />
                    </form>
                </div>
            </section>
        </>
    );
};

export default Contact;
