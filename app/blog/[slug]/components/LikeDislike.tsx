"use client";

import { useState, useEffect } from "react";
import { likeBlog, unlikeBlog, hasUserLikedBlog } from "@/lib/db/actions/blog";
import { getAnonymousId } from "@/lib/utils/getAnonymousId";

interface LikeDislikeProps {
  postId: string;
  initialLikes?: number;
}

export default function LikeDislike({
  postId,
  initialLikes = 0,
}: LikeDislikeProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [userChoice, setUserChoice] = useState<"like" | "dislike" | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const anonymousId = getAnonymousId();

  useEffect(() => {
    async function checkLikeStatus() {
      const result = await hasUserLikedBlog(postId, anonymousId);
      setUserChoice(result.liked ? "like" : null);
      setIsLoading(false);
    }

    checkLikeStatus();
  }, [postId, anonymousId]);

  const handleLike = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      if (userChoice === "like") {
        // User is unliking
        setLikes((prev) => prev - 1);
        setUserChoice(null);
        await unlikeBlog(postId, anonymousId);
      } else {
        // User is liking
        setLikes((prev) => prev + 1);
        setUserChoice("like");
        await likeBlog(postId, anonymousId);
      }
    } catch (error) {
      console.error("Error handling like:", error);
      // Revert UI state if API call fails
      if (userChoice === "like") {
        setLikes((prev) => prev + 1);
        setUserChoice("like");
      } else {
        setLikes((prev) => prev - 1);
        setUserChoice(null);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex items-center gap-2">
        <p>
          If you enjoyed reading this blog and would like to see more, please
          give a thumbs up!
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={handleLike}
          disabled={isLoading}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all
          border-2 border-blue-500/20
          ${
            userChoice === "like"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
          }
          ${isLoading ? "opacity-70 cursor-not-allowed" : ""}
        `}
        >
          👍 {likes}
        </button>
      </div>
    </div>
  );
}
