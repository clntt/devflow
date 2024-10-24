"use client";
import React, { useState } from "react";
import { HomePageFilters } from "@/constants/filters";
import { Button } from "../ui/button";
import { useSearchParams } from "next/navigation";
import { formUrlQuery } from "@/lib/utils";
import { useRouter } from "next/navigation";

const HomeFilters = () => {
  const searchParams = useSearchParams();

  const [active, setActive] = useState("");
  const router = useRouter();

  const handleTypeClick = (item: string) => {
    if (active === item) {
      setActive("");
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: null,
      });

      router.push(newUrl, { scroll: false });
    } else {
      setActive(item);

      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: item.toLowerCase(),
      });
      router.push(newUrl, { scroll: false });
    }
  };

  return (
    <div className="mt-10 hidden flex-wrap gap-3 md:flex">
      {HomePageFilters.map((item) => (
        <Button
          key={item.value}
          className={`body-medium rounded-xl px-6 py-3 capitalize shadow-none ${active === item.value ? "bg-primary-100 text-primary-500" : " bg-light-800 text-light-500 dark:text-light-500 dark:hover:bg-dark-300"}`}
          onClick={() => handleTypeClick(item.value)}
        >
          {item.name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilters;
