"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { likeBlog, unlikeBlog, hasUserLikedBlog } from "@/lib/db/actions/blog";
import { getAnonymousId } from "@/lib/utils/getAnonymousId";

interface LikeProps {
  postId: string;
  initialLikes?: number;
}

// Confetti component
const Confetti = () => {
  const confettiColors = [
    "#FFC700",
    "#FF0055",
    "#0099FF",
    "#22CC88",
    "#FF8A00",
  ];

  // Create 50 confetti particles
  return (
    <div className="absolute inset-0 pointer-events-none">
      {Array.from({ length: 50 }).map((_, i) => {
        const color =
          confettiColors[Math.floor(Math.random() * confettiColors.length)];
        return (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              backgroundColor: color,
              top: "50%",
              left: "50%",
            }}
            initial={{ scale: 0 }}
            animate={{
              x: Math.random() * 300 - 150,
              y: Math.random() * 300 - 150,
              scale: Math.random() * 0.8 + 0.2,
              opacity: [1, 0.8, 0],
            }}
            transition={{
              duration: Math.random() * 1 + 0.5,
              ease: "easeOut",
            }}
          />
        );
      })}
    </div>
  );
};

export default function Like({ postId, initialLikes = 0 }: LikeProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [userChoice, setUserChoice] = useState<"like" | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
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
        setShowConfetti(true);
        await likeBlog(postId, anonymousId);

        // Hide confetti after animation completes
        setTimeout(() => setShowConfetti(false), 1500);
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
      <div className="flex items-center gap-2 relative">
        <motion.button
          onClick={handleLike}
          disabled={isLoading}
          whileTap={{ scale: 0.95 }}
          className={`relative flex items-center gap-2 px-4 py-2 rounded-xl transition-all
          ${
            userChoice === "like"
              ? "border-2 border-blue-500"
              : "border-2 border-blue-500/20"
          }
          bg-secondary hover:bg-secondary/80 text-secondary-foreground
          ${isLoading ? "opacity-70 cursor-not-allowed" : ""}
        `}
          animate={
            userChoice === "like"
              ? {
                  boxShadow: [
                    "0 0 0 0px rgba(59, 130, 246, 0.4)",
                    "0 0 0 3px rgba(59, 130, 246, 0.4)",
                    "0 0 0 0px rgba(59, 130, 246, 0.4)",
                  ],
                }
              : {}
          }
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <AnimatePresence>{showConfetti && <Confetti />}</AnimatePresence>
          👍 {likes}
        </motion.button>
      </div>
    </div>
  );
}
