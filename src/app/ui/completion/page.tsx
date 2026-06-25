"use client";
import React, { useState } from "react";
import { Loader, Send } from "lucide-react";

export default function Page() {
  const [prompt, setPrompt] = useState("");
  const [completion, setCompletion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setPrompt("");

    try {
      const response = await fetch("/api/completion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "something went wrong");
      }

      setCompletion(data.text);
    } catch (err) {
      console.error("Error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while fetching the completion.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  console.log(completion);
  return (
    <div className="lg:w-2xl w-full mx-auto p-6 bg-white dark:bg-gray-800 flex flex-col items-center justify-start min-h-screen rounded-xl">
      {error ? (
        <p className="p-4 text-red-500">{error}</p>
      ) : isLoading ? (
        <p className="p-4">Loading...</p>
      ) : completion ? (
        <p className="p-4">{completion}</p>
      ) : null}

      <form
        onSubmit={handleSubmit}
        className="absolute bottom-10 left-0 right-0 p-2 flex flex-row items-center justify-center bg-white dark:bg-gray-600  rounded-xl shadow-lg w-lg mx-auto "
      >
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here..."
          className="p-2 border-none outline-none w-full "
        />
        <button
          disabled={isLoading}
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:bg-gray-400 disabled:animate-pulse"
        >
          {isLoading ? <Loader size={16} /> : <Send />}
        </button>
      </form>
    </div>
  );
}
