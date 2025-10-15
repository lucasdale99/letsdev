import React from "react";
import { EmailWrapper } from ".";

export type Post = {
  id: string;
  title: string;
  excerpt?: string;
  url?: string;
  author?: string;
};

export const PostNotificationEmail: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <EmailWrapper preview={`New post published: ${post.title}`}>
      <table width="100%" cellPadding={0} cellSpacing={0}>
        <tbody>
          <tr>
            <td style={{ padding: 20 }}>
              <h2 style={{ margin: 0 }}>{post.title}</h2>
              {post.excerpt ? (
                <p style={{ marginTop: 8 }}>{post.excerpt}</p>
              ) : null}
              {post.url ? (
                <p style={{ marginTop: 12 }}>
                  <a href={post.url} target="_blank" rel="noopener noreferrer">
                    Read the full post
                  </a>
                </p>
              ) : null}
              <p style={{ marginTop: 18, color: "#667" }}>
                — {post.author ?? "Author"}
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </EmailWrapper>
  );
};
