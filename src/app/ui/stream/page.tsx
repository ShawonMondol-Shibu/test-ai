"use client";
import React from "react";
import { Loader, Send } from "lucide-react";
import { useCompletion } from "@ai-sdk/react";

export default function StreamPage() {
  const {
    input,
    setInput,
    handleInputChange,
    completion,
    handleSubmit,
    isLoading,
    error,
    stop,
  } = useCompletion({
    api: "/api/stream",
  });

  console.log(completion);
  return (
    <div className="lg:w-2xl w-full mx-auto p-6 bg-white dark:bg-gray-800 flex flex-col items-center justify-start min-h-screen">
      {error && <p className="p-4 text-red-500">{error.message}</p>}
      {isLoading && !completion && <p className="p-4">Loading...</p>}
      {completion && <div className="whitespace-pre-wrap text-lg">{completion}</div>}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setInput("");
          handleSubmit(e);
        }}
        className="absolute bottom-10 left-0 right-0 p-2 flex flex-row items-center justify-center bg-white dark:bg-gray-600  rounded-xl shadow-lg w-lg mx-auto "
      >
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Enter your prompt here..."
          className="p-2 border-none outline-none w-full "
        />

        {isLoading ? (
          <button
            onClick={stop}
            className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
          >
            Stop
          </button>
        ) : (
          <button
            disabled={isLoading}
            type="submit"
            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:bg-gray-400 disabled:animate-pulse"
          >
            {isLoading ? <Loader size={16} /> : <Send />}
          </button>
        )}
      </form>
    </div>
  );
}
