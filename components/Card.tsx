"use client";

import Image from "next/image";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import CountUp from "react-countup";
import iconArrow from "@/public/icon-arrow.svg";

interface Inputs {
  day: number;
  month: number;
  year: number;
}

function isValid(date: Date) {
  return !isNaN(date.getTime());
}

function Card() {
  const [age, setAge] = useState<{
    years: number;
    months: number;
    days: number;
  } | null>(null);
  const today = new Date();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = ({ day, month, year }) => {
    let birthDate = new Date(`${year}-${month}-${day}`);
    if (isValid(birthDate)) {
      let years = today.getFullYear() - birthDate.getFullYear();
      let months = today.getMonth() - birthDate.getMonth();
      let days = today.getDate() - birthDate.getDate();

      if (
        months < 0 ||
        (months === 0 && today.getDate() < birthDate.getDate())
      ) {
        years--;
        months += 12;
      }

      if (days < 0) {
        days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
        months--;
      }

      setAge({ years, months, days });
    }
  };

  const getMaxDay = (month: number, year: number) => {
    if (month === 2) {
      return year % 4 === 0 ? 29 : 28;
    } else if ([4, 6, 9, 11].includes(month)) {
      return 30;
    } else {
      return 31;
    }
  };

  return (
    <div className="md:w-full md:max-w-lg md:rounded-2xl w-full rounded-lg md:rounded-br-[6rem] rounded-br-[3rem] bg-white px-2 py-5 md:p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <div className="flex md:gap-8 justify-between md:justify-normal">
          <div>
            <label className={`form-label ${errors.day && "text-secondary"}`}>
              Day
              <input
                className={`form-input ${errors.day && "border-secondary"}`}
                type="number"
                placeholder="DD"
                {...register("day", {
                  required: true,
                  min: 1,
                  max: 31,
                  validate: (value) => {
                    return (
                      Number(value) <=
                      getMaxDay(
                        Number(getValues("month")),
                        Number(getValues("year"))
                      )
                    );
                  },
                })}
              />
            </label>
            {errors.day?.type === "required" && (
              <p className="form-error-message">This field is required</p>
            )}
            {errors.day?.type === "min" && (
              <p className="form-error-message">Must be a valid day</p>
            )}
            {errors.day?.type === "max" && (
              <p className="form-error-message">Must be a valid day</p>
            )}
            {errors.day?.type === "validate" && (
              <p className="form-error-message">Must be a valid date</p>
            )}
          </div>
          <div>
            <label className={`form-label ${errors.month && "text-secondary"}`}>
              Month
              <input
                className={`form-input ${errors.month && "border-secondary"}`}
                type="number"
                placeholder="MM"
                {...register("month", { required: true, min: 1, max: 12 })}
              />
            </label>
            {errors.month?.type === "min" && (
              <p className="form-error-message">Must be a valid month</p>
            )}
            {errors.month?.type === "max" && (
              <p className="form-error-message">Must be a valid month</p>
            )}
            {errors.month?.type === "required" && (
              <p className="form-error-message">This field is required</p>
            )}
          </div>
          <div>
            <label className={`form-label ${errors.year && "text-secondary"}`}>
              Year
              <input
                className={`form-input ${errors.year && "border-secondary"}`}
                placeholder="YYYY"
                type="number"
                {...register("year", {
                  required: true,
                  max: today.getFullYear(),
                })}
              />
            </label>
            {errors.year?.type === "max" && (
              <p className="form-error-message">Must be in the past</p>
            )}
            {errors.year?.type === "required" && (
              <p className="form-error-message">This field is required</p>
            )}
          </div>
        </div>
        <div className="md:flex items-center relative">
          <hr className="md:w-10/12 text-light-gray my-7" />
          <button
            type="submit"
            className="md:h-10 md:w-10 h-8 w-8 md:relative absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 md:top-auto md:right-auto md:translate-x-0 md:translate-y-0"
          >
            <Image
              src={iconArrow}
              alt="button"
              fill
              className="rounded-full p-2 bg-primary transition-colors duration-200 hover:bg-off-black"
            />
          </button>
        </div>
      </form>
      <div>
        <h1 className="result">
          <span className="result-number">
            {age ? <CountUp end={age.years} duration={3} /> : "- -"}
          </span>{" "}
          Years
        </h1>
        <h1 className="result">
          <span className="result-number">
            {age ? <CountUp end={age.months} duration={3} /> : "- -"}
          </span>{" "}
          Months
        </h1>
        <h1 className="result">
          <span className="result-number">
            {age ? <CountUp end={age.days} duration={3} /> : "- -"}
          </span>{" "}
          Days
        </h1>
      </div>
    </div>
  );
}

export default Card;
