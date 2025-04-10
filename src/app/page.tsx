"use client";

import { useState } from "react";
import { trpc } from "@/trpc/client";

export default function Home() {
  const [newUserName, setNewUserName] = useState("");
  const utils = trpc.useUtils();

  const { data, isLoading } = trpc.users.getById.useQuery({ id: 2 });

  const { data: allUsers, isLoading: allUserLoading } =
    trpc.users.getAll.useQuery();

  const { mutate, isPending } = trpc.users.createUser.useMutation({
    onSuccess: () => utils.users.getAll.invalidate(),
    onError: () => console.log("Error adding user"),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newUserName.trim()) mutate({ name: newUserName });
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {isLoading ? (
          <p>Loading user...</p>
        ) : (
          <div className="text-white">{data?.name}</div>
        )}

        {/* Display all users */}
        <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          {allUserLoading ? (
            <p>Loading all users...</p>
          ) : (
            allUsers?.map((user, idx) => (
              <li key={idx} className="mb-2 tracking-[-.01em]">
                Welcome {user.name}
              </li>
            ))
          )}
        </ol>

        {/* Form to add a new user */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            placeholder="Enter new user's name"
            className="p-2 border border-gray-300 rounded"
            required
          />
          <button
            type="submit"
            disabled={isPending}
            className="p-2 bg-blue-500 text-white rounded"
          >
            {isPending ? "Adding..." : "Add User"}
          </button>
        </form>
      </main>
    </div>
  );
}
