"use client";
import React from "react";
import { Card } from "@heroui/react";

export default function ApplicationStates() {
  const stats = [
    {
      id: 1,
      title: "Total Applied",
      value: "24",
      valueClass: "text-white text-3xl font-bold font-sans",
    },
    {
      id: 2,
      title: "Shortlisted",
      value: "8",
      valueClass: "text-white text-3xl font-bold font-sans",
    },
    {
      id: 3,
      title: "Interviews",
      value: "3",
      valueClass: "text-[#F5A524] text-3xl font-bold font-sans", // HeroUI warning color accent
    },
    {
      id: 4,
      title: "Success Rate",
      value: "12%",
      valueClass: "text-[#17C964] text-3xl font-bold font-sans", // HeroUI success color accent
    },
  ];

  return (
    <div className="w-full bg-[#0A0A0A] p-6 rounded-xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card.Root key={stat.id} className="bg-[#18181B] border border-[#27272A] p-5 rounded-xl shadow-sm flex flex-col justify-between min-h-[110px]">
            <p className="text-[#A1A1AA] text-sm font-medium tracking-wide">{stat.title}</p>
            <div className="mt-3 flex items-baseline">
              <span className={stat.valueClass}>{stat.value}</span>
            </div>
          </Card.Root>
        ))}
      </div>
    </div>
  );
}
