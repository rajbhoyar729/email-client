// providers/EmailProvider.tsx
'use client'
import React, { createContext, useState, useEffect } from "react";

type Email = {
  id: string;
  from: { name: string; email: string };
  subject: string;
  short_description: string;
  date: string;
  isFavorite: boolean;
  isRead: boolean;
};

type EmailContextType = {
  emails: Email[];
  toggleFavorite: (id: string) => void;
  markAsRead: (id: string) => void;
};

export const EmailContext = createContext<EmailContextType>({
  emails: [],
  toggleFavorite: () => {},
  markAsRead: () => {},
});

export const EmailProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [emails, setEmails] = useState<Email[]>([]);

  useEffect(() => {
    // Fetch emails from API
    fetch("https://flipkart-email-mock.vercel.app/")
      .then((res) => res.json())
      .then((data) => setEmails(data.list))
      .catch((err) => console.error(err));
  }, []);

  const toggleFavorite = (id: string) => {
    setEmails((prevEmails) =>
      prevEmails.map((email) =>
        email.id === id ? { ...email, isFavorite: !email.isFavorite } : email
      )
    );
  };

  const markAsRead = (id: string) => {
    setEmails((prevEmails) =>
      prevEmails.map((email) => (email.id === id ? { ...email, isRead: true } : email))
    );
  };

  return (
    <EmailContext.Provider value={{ emails, toggleFavorite, markAsRead }}>
      {children}
    </EmailContext.Provider>
  );
};
