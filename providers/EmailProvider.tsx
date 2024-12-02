// app/providers/EmailProvider.tsx
"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

type Email = {
  id: string;
  from: {
    name: string;
    email: string;
  };
  subject: string;
  short_description: string;
  date: number;
};

type EmailContextType = {
  emails: Email[];
  currentPageEmails: Email[];
  nextPage: () => void;
  prevPage: () => void;
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
};

const EmailContext = createContext<EmailContextType | undefined>(undefined);

export function EmailProvider({ children }: { children: React.ReactNode }) {
  const [emails, setEmails] = useState<Email[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 10;

  useEffect(() => {
    async function fetchEmails() {
      try {
        setIsLoading(true);
        const response = await fetch("https://flipkart-email-mock.now.sh/");
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        
        // Debug logging
        console.log("Raw API Response:", data);

        // Validate and transform data if necessary
        if (Array.isArray(data)) {
          const transformedEmails: Email[] = data.map(email => ({
            id: email.id || crypto.randomUUID(),
            from: {
              name: email.from?.name || 'Unknown Sender',
              email: email.from?.email || 'unknown@example.com'
            },
            subject: email.subject || 'No Subject',
            short_description: email.short_description || 'No description',
            date: email.date || Date.now()
          }));

          setEmails(transformedEmails);
          console.log("Transformed Emails:", transformedEmails);
        } else {
          console.error('Fetched data is not an array:', data);
          setEmails([]);
        }
      } catch (error) {
        console.error("Failed to fetch emails:", error);
        setEmails([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchEmails();
  }, []);

  const totalPages = Math.ceil(emails.length / itemsPerPage);
  
  const currentPageEmails = emails.length > 0 
    ? emails.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : [];

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <EmailContext.Provider
      value={{
        emails,
        currentPageEmails,
        nextPage,
        prevPage,
        currentPage,
        totalPages,
        isLoading,
      }}
    >
      {children}
    </EmailContext.Provider>
  );
}

export function useEmail() {
  const context = useContext(EmailContext);
  if (!context) {
    throw new Error("useEmail must be used within an EmailProvider");
  }
  return context;
}