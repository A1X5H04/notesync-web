import React from "react";
import Image from "next/image";

function AuthLayout({ children }: { children: React.ReactNode }) {
  const quotes = [
    {
      quote: "The way to get started is to quit talking and begin doing.",
      author: "Walt Disney",
    },
    {
      quote:
        "Your time is limited, so don't waste it living someone else's life.",
      author: "Steve Jobs",
    },
    {
      quote:
        "Productivity is never an accident. It is always the result of a commitment to excellence, intelligent planning, and focused effort.",
      author: "Paul J. Meyer",
    },
    {
      quote: "The secret of getting ahead is getting started.",
      author: "Mark Twain",
    },
    {
      quote: "Don't watch the clock; do what it does. Keep going.",
      author: "Sam Levenson",
    },

    {
      quote: "Focus on being productive instead of busy.",
      author: "Tim Ferriss",
    },
    {
      quote:
        "Efficiency is doing things right; effectiveness is doing the right things.",
      author: "Peter Drucker",
    },
    {
      quote:
        "Amateurs sit and wait for inspiration, the rest of us just get up and go to work.",
      author: "Stephen King",
    },
    {
      quote:
        "The key is not to prioritize what's on your schedule, but to schedule your priorities.",
      author: "Stephen Covey",
    },
    {
      quote:
        "Ordinary people think merely of spending time, great people think of using it.",
      author: "Arthur Schopenhauer",
    },
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  return (
    <div className="w-full h-full grid place-items-center">{children}</div>
  );
}

export default AuthLayout;
