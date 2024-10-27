"use client";

import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const YoutubeForm = () => {
  const form = useForm<FormValuesType>({
    defaultValues: {
      name: "Harry",
      email: "",
      channel: "",
      social: {
        fb: "",
        twitter: "",
      },
      phoneNumbers: [""],
    },
    // We can set default value from an async request.... Like below
    // defaultValues: async () => {
    //   const response = await fetch(
    //     "https://jsonplaceholder.typicode.com/users/2"
    //   );
    //   const data = await response.json();
    //   console.log(data);
    //   return {
    //     name: "",
    //     email: data?.email,
    //     channel: "",
    //   };
    // },
  });
  const { register, handleSubmit, formState } = form;

  type FormValuesType = {
    name: string;
    email: string;
    channel: string;
    social: {
      fb: string;
      twitter: string;
    };
    phoneNumbers: string[];
  };

  const { errors } = formState;
  console.log(errors);

  const emailPattern =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const onSubmit: SubmitHandler<FormValuesType> = (data: FormValuesType) => {
    console.log(data);
  };

  return (
    <div className="w-[30%] mx-auto border border-gray-100 p-4">
      <h2 className="text-center font-bold mb-8"> Hook Form </h2>
      <form
        className="flex flex-col gap-y-4"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="flex gap-2">
          <label className="w-1/3">Enter your name:</label>
          <input
            className="w-2/3"
            type="text"
            {...register("name", {
              required: { value: true, message: "Field Reqired..." },
            })}
          />
        </div>
        <span className="text-red-600 text-sm">{errors.name?.message}</span>
        <div className="flex gap-2">
          <label className="w-1/3">Enter your email:</label>
          <input
            className="w-2/3"
            type="email"
            {...register("email", {
              required: {
                value: true,
                message: "Field Required...",
              },
              validate: {
                nonAdmin: (value) =>
                  value !== "admin@gmail.com" || "Enter a different email",
              },
              pattern: {
                value: emailPattern,
                message: "Non valid email",
              },
            })}
          />
        </div>
        <span className="text-red-600 text-sm">{errors.email?.message}</span>
        <div className="flex gap-2">
          <label className="w-1/3">Enter your channel:</label>
          <input
            className="w-2/3"
            type="text"
            {...register("channel", {
              required: { value: true, message: "Field Reqired..." },
            })}
          />
        </div>
        <span className="text-red-600 text-sm">{errors.channel?.message}</span>

        <div className="flex gap-2">
          <label className="w-1/3">Enter your facebook url:</label>
          <input className="w-2/3" type="text" {...register("social.fb")} />
        </div>
        <div className="flex gap-2">
          <label className="w-1/3">Enter your twitter url:</label>
          <input
            className="w-2/3"
            type="text"
            {...register("social.twitter", {
              required: {
                value: true,
                message: "Twitter required",
              },
            })}
          />
        </div>
        <span className="text-red-600 text-sm">
          {errors.social?.twitter?.message}
        </span>
        <div className="flex gap-2">
          <label className="w-1/3">Enter your Primary phone:</label>
          <input
            className="w-2/3"
            type="text"
            {...register("phoneNumbers.0", {
              required: {
                value: true,
                message: "Phone  required",
              },
            })}
          />
        </div>
        <span className="text-red-600 text-sm">
          {errors?.phoneNumbers?.[0]?.message}
        </span>
        <div className="flex gap-2">
          <label className="w-1/3">Enter your Secondary phone:</label>
          <input
            className="w-2/3"
            type="text"
            {...register("phoneNumbers.1")}
          />
        </div>
        <button className="px-2 py-3 bg-green-600 rounded-md" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default YoutubeForm;
