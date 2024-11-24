"use client";

import React from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";

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
      coTravelers: [
        {
          name: "",
          age: null,
        },
      ],
    },
  });
  const { register, handleSubmit, formState, control } = form;
  const { fields, append, remove } = useFieldArray({
    name: "coTravelers",
    control,
  });

  type FormValuesType = {
    name: string;
    email: string;
    channel: string;
    social: {
      fb: string;
      twitter: string;
    };
    phoneNumbers: string[];
    coTravelers: {
      name: string;
      age: number | null;
    }[];
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

        {fields.map((field, idx) => {
          return (
            <div
              key={field.id}
              className="flex gap-2 p-2 border border-gray-400 relative"
            >
              <div className="">
                <label className="">Traveler {idx + 1} Name </label>
                <input
                  className="w-full"
                  type="text"
                  {...register(`coTravelers.${idx}.name`, {
                    required: { value: true, message: "Field Reqired..." },
                  })}
                />
              </div>
              <div className="">
                <label className="">Traveler {idx + 1} age</label>
                <input
                  className="w-full"
                  type="text"
                  {...register(`coTravelers.${idx}.age`, {
                    required: { value: true, message: "Field Reqired..." },
                  })}
                />
              </div>
              {idx > 0 && (
                <button
                  type="button"
                  className="text-white bg-red-600 w-[20px] h-[20px] flex items-center justify-center absolute top-[-10px] right-[-10px] rounded-full p-3"
                  onClick={() => remove(idx)}
                >
                  {" "}
                  X{" "}
                </button>
              )}
            </div>
          );
        })}

        <button
          type="button"
          className="bg-blue-500 rounded-md text-white px-2 py-1"
          onClick={() => append({ name: "", age: null })}
        >
          {" "}
          Add Co Travlers
        </button>
        <button className="px-2 py-3 bg-green-600 rounded-md" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default YoutubeForm;
