import React, { useState } from "react";
import { getUserFriends } from "../lib/api";
import { useQuery } from "@tanstack/react-query";
import NoFriendsFound from "../components/NoFriendsFound";
import FriendCard from "../components/FriendCard";

const FriendsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const filteredFriends = friends.filter((friend) =>
    friend.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-semibold mb-4">My Friends</h1>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search friends..."
          className="input input-bordered w-full max-w-xs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Friends List */}
      {loadingFriends ? (
        <div className="flex justify-center py-12">
          <span className="loading loading-spinner loading-lg" />
        </div>
      ) : friends.length === 0 ? (
        <NoFriendsFound />
      ) : filteredFriends.length === 0 ? (
        <p className="text-center text-gray-500 py-8">
          No friends found matching your search.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredFriends.map((friend) => (
            <FriendCard key={friend._id} friend={friend} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FriendsPage;
