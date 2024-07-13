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
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-screen">
      {children}
      <div className="hidden bg-muted lg:block relative">
        <div className="absolute inset-0 flex flex-col items-start justify-center text-white p-10 space-y-14 bg-black/75">
          <blockquote className="relative text-4xl font-light leading-snug tracking-wide">
            {randomQuote.quote}
          </blockquote>
          <cite className="block text-muted-foreground font-bold">
            - {randomQuote.author}
          </cite>
        </div>
        <Image
          src="/auth-bg.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}

export default AuthLayout;
