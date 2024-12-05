// components/EmailCard.tsx
import React from "react";
import { format } from "date-fns";

type EmailCardProps = {
  id: string;
  from: { name: string; email: string };
  subject: string;
  short_description: string;
<<<<<<< HEAD
  date: string; // date string from API
=======
  date: string; // Original date string
>>>>>>> d83f14c959ba071925c0bfc9b84bc92f9ca9b4fb
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  isRead: boolean;
};

export const EmailCard: React.FC<EmailCardProps> = ({
  id,
  from,
  subject,
  short_description,
  date,
  isFavorite,
  onToggleFavorite,
  isRead,
}) => {
  const name = from.name;
  const initial = name.charAt(0).toUpperCase();

<<<<<<< HEAD
  // Format the date into a readable string
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
=======
  const formattedDate = format(new Date(date), "dd/MM/yyyy hh:mm a");
>>>>>>> d83f14c959ba071925c0bfc9b84bc92f9ca9b4fb

  return (
    <div
      className={`flex justify-between items-start p-4 my-4 border rounded-lg shadow-sm ${
        isRead ? "bg-[#F8F9FC]" : "bg-white"
      } border-[#D3D4DD]`}
    >
      <div className="flex flex-shrink gap-4 w-full">
        {/* Initial Badge */}
        <div className="w-[40px] h-[40px] bg-[#E54065] text-white rounded-full grid flex-shrink justify-center items-center text-base font-bold">
          {initial}
        </div>
        {/* Email Info */}
        <div className="  w-full">
          <h4 className="text-[#3C4048] font-semibold">
            From: {from.name}{" "}
            <span className="text-[#E54065] font-normal">
              {"<"}
              {from.email}
              {">"}
            </span>
          </h4>
<<<<<<< HEAD
          <p className="text-[#636363] font-medium">Subject: {subject}</p>
          <p className="text-[#636363] text-sm truncate">{short_description}</p>
          {/* Display formatted date */}
          <div className=" flex ">
          <p className="text-[#9A9A9A] text-sm mt-2">{formattedDate}</p>
          {/* Favorite Label */}
          {isFavorite && (
            <span className="text-[#E54065] font-medium text-sm bg-[#FCE3E9] px-2 py-1 rounded-md inline-block mt-2">
              Favorite
            </span>
          )}
          </div>
=======
          <p className="text-sm text-[#636363] font-medium mt-1">
            Subject: {subject}
          </p>
          <p className="text-sm text-[#9B9B9B] mt-1">{short_description}</p>
          <p className="text-xs text-[#B1B1B1] mt-2">{formattedDate}</p>
>>>>>>> d83f14c959ba071925c0bfc9b84bc92f9ca9b4fb
        </div>
      </div>
    </div>
  );
};
