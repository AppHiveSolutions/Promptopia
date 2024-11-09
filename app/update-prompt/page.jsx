"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";

const UpdatePrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams?.get("id");

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    if (!promptId) return;

    const getPromptDetails = async () => {
      try {
        setLoading(true); // Start loading
        const response = await fetch(`/api/prompt/${promptId}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch prompt details.");
        }
        const data = await response.json();
        setPost({ prompt: data.prompt, tag: data.tag });
      } catch (error) {
        console.error("Error fetching prompt details:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    getPromptDetails();
  }, [promptId]);

  const editPost = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    if (!promptId) {
      alert("Prompt Id not found");
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      } else {
        console.error("Failed to update the prompt.");
      }
    } catch (error) {
      console.error("Error updating prompt:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p>Loading...</p>; // Display loading state

  return (
    <div>
      <Form
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={editPost}
      />
    </div>
  );
};

export default UpdatePrompt;
