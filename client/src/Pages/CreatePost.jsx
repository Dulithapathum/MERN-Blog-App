import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Uncategorized");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const POST_CATEGORIES = [
    "Uncategorized",
    "Technology",
    "Education",
    "Health",
    "Travel",
    "Lifestyle",
  ];

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
    "image",
  ];

  return (
    <section className="max-w-[1000px] mx-auto my-5 bg-slate-300 p-6 rounded-md">
      <div>
        <h2 className="text-center text-4xl font-bold">Create Post</h2>
        <p className="w-full  p-2 text-white  bg-red-500 rounded-md m-1 mt-8">
          This is an error message
        </p>
        <form action="" className="flex flex-col bg-slate-300">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
            className="w-full  p-2 outline-none  rounded-md m-1 "
          />
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full  p-2 outline-none  rounded-md m-1"
          >
            {POST_CATEGORIES.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
          <ReactQuill
            modules={modules}
            formats={formats}
            value={description}
            onChange={setDescription}
            className="w-full bg-white h-30 p-2 outline-none  rounded-md m-1 "
          />
          <input
            type="file"
            onChange={(e) => setThumbnail(e.target.files[0])}
            accept="png,jpg,jpeg"
            className="w-full p-2 outline-none  m-1 "
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold h-30 p-2 outline-none   rounded-md m-1 "
          >
            Create
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreatePost;
