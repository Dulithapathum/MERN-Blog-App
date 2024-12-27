// ===================Create  Post===================
// POST:api/post/:id
// PROTECTED
export const createPost = (req, res, next) => {
  res.json("Create  Post");
};

// ===================Get All Post===================
// GET:api/posts
// UNPROTECTED
export const getAllPosts = (req, res, next) => {
  res.json("get all post");
};

// ===================Get Single  Post===================
// GET:api/posts:id
// UNPROTECTED
export const getPost = (req, res, next) => {
  res.json("get single post");
};

// ===================Get Post By Category===================
// GET:api/posts/categories/:category
// UNPROTECTED
export const getCatPosts = (req, res, next) => {
  res.json("Get Post By Category");
};

// ===================Get Users/Authors Post===================
// GET:api/posts/users/:id
// UNPROTECTED
export const getUserPosts = (req, res, next) => {
  res.json("Get Users/Authors Post");
};

// ===================Edit  Post===================
// PATCH:api/post/:id
// PROTECTED
export const editPost = (req, res, next) => {
  res.json("Edit  Post");
};

// ===================Delete  Post===================
// DELETE:api/post/:id
// PROTECTED
export const deletePost = (req, res, next) => {
  res.json("delete post");
};
