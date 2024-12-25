import React, { useState } from "react";

import Thumbnail1 from "../assetes/blog1.jpg";
import Thumbnail2 from "../assetes/blog2.jpg";
import Thumbnail3 from "../assetes/blog3.jpg";
import Thumbnail4 from "../assetes/blog4.jpg";
import Thumbnail5 from "../assetes/blog5.jpg";
import Thumbnail6 from "../assetes/blog6.jpg";
import Thumbnail7 from "../assetes/blog7.jpg";
import Thumbnail8 from "../assetes/blog8.jpg";
import Thumbnail9 from "../assetes/blog9.jpg";
import Thumbnail10 from "../assetes/blog10.jpg";
import PostsItem from "./PostsItem";

const DUMMY_POSTS = [
  {
    id: "1",
    thumbnail: Thumbnail1,
    category: "education",
    title: "Power of Education",
    disc: "Education unlocks the potential of individuals and transforms societies. Learn about its importance in this post.",
    authorID: 3,
  },
  {
    id: "2",
    thumbnail: Thumbnail2,
    category: "technology",
    title: "Advancements in Technology",
    disc: "Technology has revolutionized our lives, making everyday tasks more efficient. Discover how these innovations are shaping the future.",
    authorID: 5,
  },
  {
    id: "3",
    thumbnail: Thumbnail3,
    category: "health",
    title: "The Importance of Mental Health",
    disc: "Mental health is just as important as physical health. Learn strategies to maintain a balanced and fulfilling life.",
    authorID: 7,
  },
  {
    id: "4",
    thumbnail: Thumbnail4,
    category: "science",
    title: "Exploring the Universe",
    disc: "Science unveils the mysteries of the cosmos, bringing humanity closer to understanding our place in the universe.",
    authorID: 9,
  },
  {
    id: "5",
    thumbnail: Thumbnail5,
    category: "business",
    title: "The Art of Entrepreneurship",
    disc: "Successful entrepreneurship involves creativity, resilience, and determination. Learn tips from industry leaders.",
    authorID: 2,
  },
  {
    id: "6",
    thumbnail: Thumbnail6,
    category: "lifestyle",
    title: "Work-Life Balance",
    disc: "Striking the perfect balance between work and life is crucial for long-term happiness. Discover practical tips here.",
    authorID: 4,
  },
  {
    id: "7",
    thumbnail: Thumbnail7,
    category: "travel",
    title: "Exploring Hidden Gems",
    disc: "Travel to lesser-known destinations that offer breathtaking scenery and unique experiences.",
    authorID: 8,
  },
  {
    id: "8",
    thumbnail: Thumbnail8,
    category: "food",
    title: "A Culinary Journey",
    disc: "Food lovers rejoice! Embark on a culinary journey that takes you across continents and cultures.",
    authorID: 6,
  },
  {
    id: "9",
    thumbnail: Thumbnail9,
    category: "art",
    title: "The Beauty of Creativity",
    disc: "Art is the expression of human imagination and creativity. Delve into inspiring artworks and the stories behind them.",
    authorID: 1,
  },
  {
    id: "10",
    thumbnail: Thumbnail10,
    category: "sports",
    title: "The Spirit of Sportsmanship",
    disc: "Sports teach us teamwork, discipline, and perseverance. Celebrate the spirit of sportsmanship through this post.",
    authorID: 10,
  },
];

const Posts = () => {
  const [posts, setPosts] = useState(DUMMY_POSTS);
  return (
    <div className=" max-w-[1200px] mx-6  lg:mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map((post) => (
        <PostsItem key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
