"use client";

import React, { useContext, useState } from "react";
import { EmailContext } from "../../providers/EmailProvider";
import { EmailCard } from "../components/EmailCards";
import {format} from "date-fns/format";

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
          <div className="bg-white border border-[#CFD2DC] rounded-lg shadow-md p-6">
          
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-4">
                
                <div className="w-12 h-12 flex items-center justify-center bg-[#E54065] text-white rounded-full text-lg font-semibold">
                  {
                  
                    emails.find((email) => email.id === selectedEmailId)?.from?.name?.charAt(0).toUpperCase() || "?"
                  }
                </div>
                
                <div>
                  <h2 className="text-[#292929] text-lg font-bold">
                    {emails.find((email) => email.id === selectedEmailId)?.subject || "No Subject"}
                  </h2>
                  <p className="text-[#636363] text-sm">
                    {format(
                      new Date(
                        emails.find((email) => email.id === selectedEmailId)?.date || new Date()
                      ),
                      "dd/MM/yyyy hh:mm a"
                    )}
                  </p>
                </div>
              </div>
              {/* Favorite Button */}
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium shadow ${
                  emails.find((email) => email.id === selectedEmailId)?.isFavorite
                    ? "bg-[#E54065] text-white"
                    : "bg-[#E1E4EA] text-[#636363]"
                }`}
                onClick={() => toggleFavorite(selectedEmailId)}
              >
                {emails.find((email) => email.id === selectedEmailId)?.isFavorite
                  ? "Mark as favorite"
                  : "Mark as favorite"}
              </button>
            </div>
            {/* Email Body */}
            {isLoading ? (
              <p className="text-[#636363] text-center">Loading...</p>
            ) : (
              <div>
                <h3 className="text-[#292929] text-lg font-bold mb-2">
                  {emails.find((email) => email.id === selectedEmailId)?.subject || "No Subject"}
                </h3>
                <div
                  className="leading-relaxed text-[#292929]"
                  dangerouslySetInnerHTML={{ __html: selectedEmailBody || "" }}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
