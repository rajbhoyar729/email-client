"use client";

import React, { useContext, useState } from "react";
import { EmailContext } from "../../providers/EmailProvider";
import { EmailCard } from "../components/EmailCards";
import {format} from "date-fns/format";

export const EmailContainer: React.FC = () => {
  const { emails, toggleFavorite } = useContext(EmailContext);
  const [filter, setFilter] = useState<"all" | "unread" | "read" | "favorites">(
    "unread" // Default to 'unread'
  );

  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);
  const [selectedEmailBody, setSelectedEmailBody] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  // Keep track of read emails
  const [readEmails, setReadEmails] = useState<string[]>([]);
  const [favoriteEmails, setFavoriteEmails] = useState<string[]>([]);

  // Filter emails based on the selected filter
  const filteredEmails = emails.filter((email) => {
    if (filter === "unread") return !readEmails.includes(email.id);
    if (filter === "read") return readEmails.includes(email.id);
    if (filter === "favorites") return favoriteEmails.includes(email.id);
    return true; // Show all emails by default
  });

  // Fetch the email body
  const fetchEmailBody = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://flipkart-email-mock.vercel.app/?id=${id}`
      );
      const data = await response.json();
      setSelectedEmailBody(formatEmailBody(data.body)); // Format email body
    } catch (error) {
      console.error("Failed to fetch email body:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle clicking on an email
  const handleEmailClick = (id: string) => {
    setSelectedEmailId(id);
    if (!readEmails.includes(id)) {
      setReadEmails((prev) => [...prev, id]); // Mark as read
    }
    fetchEmailBody(id);
  };

  // Format email body
  const formatEmailBody = (rawBody: string): string => {
    // Add paragraph breaks where there are multiple spaces after a period
    return rawBody.replace(/\. {2,}/g, ".</p><p>");
  };

  // Toggle favorite status
  const handleToggleFavorite = (id: string) => {
    setFavoriteEmails((prev) =>
      prev.includes(id) ? prev.filter((emailId) => emailId !== id) : [...prev, id]
    );
  };

  // Get the currently selected email
  const selectedEmail = emails.find((email) => email.id === selectedEmailId);

  // Extract name and avatar initials
  const name = selectedEmail?.from.name || "N/A";
  const avatarInitial = name.charAt(0).toUpperCase();

  return (
    <div className="flex min-h-screen bg-[#F8F9FC]">
      {/* Master Section */}
      <div
        className={`w-full ${
          selectedEmailId ? "lg:w-1/3" : "lg:w-full"
        } border-r border-[#D3D4DD] p-6`}
      >
        <div className="flex items-center gap-4 mb-6">
          <span className="text-[#636363] font-medium">Filter By:</span>
          <button
            className={`px-4 py-2 rounded-lg ${
              filter === "unread" ? "bg-[#E1E4EA]" : "bg-[#F8F9FC]"
            } text-[#636363] font-medium border border-[#D3D4DD]`}
            onClick={() => setFilter("unread")}
          >
            Unread
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              filter === "read" ? "bg-[#E1E4EA]" : "bg-[#F8F9FC]"
            } text-[#636363] font-medium border border-[#D3D4DD]`}
            onClick={() => setFilter("read")}
          >
            Read
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              filter === "favorites" ? "bg-[#E1E4EA]" : "bg-[#F8F9FC]"
            } text-[#636363] font-medium border border-[#D3D4DD]`}
            onClick={() => setFilter("favorites")}
          >
            Favorites
          </button>
        </div>
        {filteredEmails.map((email) => (
          <div
            key={email.id}
            onClick={() => handleEmailClick(email.id)}
            className={`cursor-pointer ${
              email.id === selectedEmailId ? "bg-[#E1E4EA]" : ""
            }`}
          >
            <EmailCard
              {...email}
              onToggleFavorite={() => handleToggleFavorite(email.id)}
              isRead={readEmails.includes(email.id)}
            />
          </div>
        ))}
      </div>

      {/* Slave Section */}
      {selectedEmailId && selectedEmail && (
        <div className="w-full lg:w-2/3 p-6">
<<<<<<< HEAD
          <div className="grid grid-flow-col">
            <div className="flex items-center gap-4 mb-4">
              {/* Avatar */}
              <div className="w-16 h-16 bg-[#E54065] text-white rounded-full flex justify-center items-center text-2xl font-bold">
                {avatarInitial}
              </div>
              {/* Name */}
              <div>
                <h2 className="text-[#3C4048] text-xl font-bold">{name}</h2>
                <p className="text-[#636363] text-sm">
                  {selectedEmail.from.email}
                </p>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <button
                className="mt-4 px-4 py-2 items-end bg-[#E54065] text-white rounded-md text-sm font-medium"
                onClick={() => handleToggleFavorite(selectedEmailId)}
              >
                {favoriteEmails.includes(selectedEmailId)
                  ? "Remove Favorite"
                  : "Mark as Favorite"}
              </button>
            </div>
          </div>
          {isLoading ? (
            <p className="text-[#636363]">Loading...</p>
          ) : (
            <div className="bg-white border border-[#D3D4DD] rounded-lg p-6 text-[#3C4048]">
              <div
                dangerouslySetInnerHTML={{
                  __html: selectedEmailBody || "",
                }}
              />
            </div>
          )}
=======
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
>>>>>>> d83f14c959ba071925c0bfc9b84bc92f9ca9b4fb
        </div>
      )}
    </div>
  );
};
