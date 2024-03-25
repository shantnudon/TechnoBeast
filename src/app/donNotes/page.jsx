"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Loading from "../../../components/loading";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchData } from "next-auth/client/_utils";

export default function HomePage() {
  const [submitted, setSubmitted] = useState(false);
  const [user, setUser] = useState(null);
  const { data: session, status } = useSession(); 

  const allowedEmail = "shantnu04@gmail.com"; 

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (dataForm) => {
    console.log(dataForm);
    setSubmitted(true);
    reset();
  };

  useEffect(() => {
    if (session && session.user) {
      setUser(session.user.email);
    } else {
      setUser(null);
    }
  }, [session]);

  if (status === "loading") {
    return (
      <>
        <Loading />
      </>
    );
  }

  if (!session) {
    return (
      <div className="p-4 text-lg flex justify-evenly glass1 items-center">
        <p>You are not logged in. Please sign in to access this content.</p>
        <button
          className="border-2 p-2 border-gray-950 hover:bg-blue-200"
          onClick={() => signIn("github")}
        >
          Sign in using Github
        </button>
      </div>
    );
  }

  // Conditional rendering for authorized user (shantnu)
  if (user === allowedEmail) {
    let datafetch = fetch("https://jsonplaceholder.typicode.com/posts");
    let data = [];
    

    

    return (
      <>
        <div className="grid grid-cols-3 gap-4 glass1">
          <div className="flex justify-evenly items-center">
            <p>Signed in as {user}</p>
          </div>
          <div>
            <div className="flex justify-evenly">
              <p className="p-2 text-3xl border-gray-950">
                Welcome to DON Notes
              </p>
            </div>
          </div>
          <div>
            <div className="flex justify-evenly">
              <button
                className="border-2 p-2 border-gray-950 hover:bg-slate-500 hover:border-slate-500"
                onClick={() => signOut()}
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
        <div className="container mx-auto">
          <ToastContainer />
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="m-4 text-black flex flex-col gap-2"
          >
            <div>
              <input
                {...register("title", { required: true })}
                className="w-full p-2 glass"
                placeholder="Enter Title Here...."
              />
            </div>
            <div>
              <textarea
                {...register("content", { required: true })}
                className="w-full h-60 p-2 glass"
                placeholder="Enter Content Here...."
              />
            </div>
            {errors.title &&
              toast.error("Title is required !", {
                position: "top-center",
                autoClose: 2000,
                toastId: " ",
              })}
            {errors.content &&
              toast.error("Content is required !", {
                position: "top-center",
                autoClose: 2000,
                toastId: " ",
              })}
            {submitted ? (
              toast.success("Form submitted successfully!", {
                position: "top-center",
                toastId: " ",
              })
            ) : (
              <div>
                <input
                  className="text-white"
                  type="submit"
                  value="Submit"
                  disabled={submitted}
                />
              </div>
            )}
          </form>
        </div>
      </>
    );
  }

  // Render content for other logged-in users (not shantnu)
  return (
    <>
      <div className="p-4 text-2xl flex justify-evenly glass1 items-center">
        <p>Signed in as {user}</p> <br />
        <button
          className="border-2 p-2 border-gray-950 hover:bg-blue-200"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </div>
      <p>Sorry Bad Credentials.</p>
    </>
  );
}
