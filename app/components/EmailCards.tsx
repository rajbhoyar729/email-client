import React from "react";

type EmailCardProps = {
  id: string;
  from: { name: string; email: string };
  subject: string;
  short_description: string;
  date: string;
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

  return (
    <div
      className={`flex justify-between items-start p-4 border rounded-lg transition-shadow duration-200 hover:shadow-lg ${
        isRead ? "bg-[#F2F2F2]" : "bg-white"
      } border-[#CFD2DC]`}
    >
      <div className="flex gap-4">
        <div className="w-12 h-12 bg-[#E54065] text-white rounded-full flex justify-center items-center text-xl font-bold shadow-md">
          {initial}
        </div>
        <div>
          <h4 className="text-[#636363] font-semibold">
            {from.name}{" "}
            <span className="text-[#E54065] font-normal text-sm">
              ({from.email})
            </span>
          </h4>
          <p className="text-sm text-[#636363] font-medium mt-1">
            Subject: {subject}
          </p>
          <p className="text-sm text-[#9B9B9B] mt-1">{short_description}</p>
          <p className="text-xs text-[#B1B1B1] mt-2">{date}</p>
        </div>
      </div>
      <button
        className={`text-lg font-medium transition ${
          isFavorite ? "text-[#E54065]" : "text-[#636363]"
        }`}
        onClick={() => onToggleFavorite(id)}
      >
        {isFavorite ? "★" : "☆"}
      </button>
    </div>
  );
};
