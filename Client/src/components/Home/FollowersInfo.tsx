import React, { useState, useEffect } from "react";
import { useAuth } from "../Auth/AuthContext";

const FollowersInfo = ({ userId }: { userId: string }) => {
  const { getCookie } = useAuth();
  const [followInfo, setFollowInfo] = useState({
    followersCount: 0,
    followedCount: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchFollowInfo = async () => {
      try {
        const response = await fetch(`/api/users/${userId}/follow-info`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            XCSRFToken: getCookie("csrf_access_token"),
          },
        });
        if (!response.ok) {
          throw new Error("Could not fetch follow information.");
        }
        const data = await response.json();
        console.log("Follow info:", data);
        setFollowInfo({
          followersCount: data.followers_count,
          followedCount: data.followed_count,
        });
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchFollowInfo();
  }, [userId]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex">
      <p className="mr-3">Followers: {followInfo.followersCount}</p>
      <p>Following: {followInfo.followedCount}</p>
    </div>
  );
};

export default FollowersInfo;
