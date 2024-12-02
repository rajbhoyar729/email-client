// app/components/EmailContainer.tsx
"use client";
import { useEmail } from "../../providers/EmailProvider";

function EmailContainer() {
  const {
    currentPageEmails,
    nextPage,
    prevPage,
    currentPage,
    totalPages,
    isLoading,
    emails
  } = useEmail();

  // Add more detailed logging
  console.log("Current Page Emails:", currentPageEmails);
  console.log("Total Emails:", emails);
  console.log("Is Loading:", isLoading);

  if (isLoading) {
    return <div>Loading emails...</div>;
  }

  return (
    <div className="email-container">
      <h1>Email List</h1>
      
      {emails.length === 0 ? (
        <p>No emails found. Please check the API or network connection.</p>
      ) : currentPageEmails.length > 0 ? (
        <ul className="email-list">
          {currentPageEmails.map((email) => (
            <li 
              key={email.id} 
              className="email-item"
            >
              <div className="email-header">
                <strong>{email.from.name}</strong>
                <span className="email-date">
                  {new Date(email.date).toLocaleDateString()}
                </span>
              </div>
              <div className="email-subject">
                {email.subject}
              </div>
              <p className="email-description">
                {email.short_description}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No emails found for the current page.</p>
      )}

      <div className="pagination">
        <button 
          onClick={prevPage} 
          disabled={currentPage === 1}
          className="btn btn-prev"
        >
          Previous Page
        </button>
        
        <span className="page-info">
          Page {currentPage} of {totalPages}
        </span>
        
        <button 
          onClick={nextPage} 
          disabled={currentPage === totalPages}
          className="btn btn-next"
        >
          Next Page
        </button>
      </div>
    </div>
  );
}

export default EmailContainer;