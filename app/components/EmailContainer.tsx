"use client";

import React, { useContext, useState } from "react";
import { EmailContext } from "../../providers/EmailProvider";
import { EmailCard } from "../components/EmailCards";

export const EmailContainer: React.FC = () => {
  const { emails, toggleFavorite } = useContext(EmailContext);
  const [filter, setFilter] = useState<"all" | "unread" | "read" | "favorites">(
    "all"
  );

  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);
  const [selectedEmailBody, setSelectedEmailBody] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  const filteredEmails = emails.filter((email) => {
    if (filter === "unread") return !email.isRead;
    if (filter === "read") return email.isRead;
    if (filter === "favorites") return email.isFavorite;
    return true;
  });

  const fetchEmailBody = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://flipkart-email-mock.vercel.app/?id=${id}`
      );
      const data = await response.json();
      setSelectedEmailBody(data.body);
    } catch (error) {
      console.error("Failed to fetch email body:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailClick = (id: string) => {
    setSelectedEmailId(id);
    fetchEmailBody(id);
  };

  return (
    <div className="flex min-h-screen bg-[#F4F5F9]">
      {/* Master (Email List) */}
      <div
        className={`transition-all duration-300 w-full ${
          selectedEmailId ? "lg:w-1/3" : "lg:w-full"
        } border-r border-[#CFD2DC] p-4`}
      >
        <div className="flex items-center gap-4 mb-6">
          <span className="text-[#636363] font-medium">Filter By:</span>
          <button
            className={`px-4 py-2 rounded-lg border transition ${
              filter === "unread"
                ? "bg-[#E54065] text-white"
                : "bg-[#E1E4EA] text-[#636363]"
            }`}
            onClick={() => setFilter("unread")}
          >
            Unread
          </button>
          <button
            className={`px-4 py-2 rounded-lg border transition ${
              filter === "read"
                ? "bg-[#E54065] text-white"
                : "bg-[#E1E4EA] text-[#636363]"
            }`}
            onClick={() => setFilter("read")}
          >
            Read
          </button>
          <button
            className={`px-4 py-2 rounded-lg border transition ${
              filter === "favorites"
                ? "bg-[#E54065] text-white"
                : "bg-[#E1E4EA] text-[#636363]"
            }`}
            onClick={() => setFilter("favorites")}
          >
            Favorites
          </button>
        </div>
        {filteredEmails.map((email) => (
          <div
            key={email.id}
            onClick={() => handleEmailClick(email.id)}
            className={`cursor-pointer transition ${
              email.id === selectedEmailId ? "bg-[#E1E4EA]" : ""
            }`}
          >
            <EmailCard
              {...email}
              onToggleFavorite={toggleFavorite}
              isRead={email.isRead}
            />
          </div>
        ))}
      </div>

      {/* Slave (Selected Email Body) */}
      {selectedEmailId && (
        <div className="w-full lg:w-2/3 p-6">
          <h2 className="text-[#636363] text-xl font-bold mb-4">
            Email Content
          </h2>
          {isLoading ? (
            <p className="text-[#636363] text-center">Loading...</p>
          ) : (
            <div
              className="bg-white border border-[#CFD2DC] rounded-lg p-4 text-[#636363] shadow-md leading-relaxed"
              dangerouslySetInnerHTML={{ __html: selectedEmailBody || "" }}
            />
          )}
        </div>
      )}
    </div>
  );
};
