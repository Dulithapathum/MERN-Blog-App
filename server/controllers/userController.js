// ===================Register User===================
// POST:api/users/register
// UNPROTECTED
export const registerUser = async (req, res, next) => {
  res.json("Register User");
};

// ===================Login User===================
// POST:api/users/login
// UNPROTECTED
export const loginUser = async (req, res, next) => {
  res.json("Login User");
};

// ===================User Profile===================
// POST:api/users/:id
// PROTECTED
export const getUser = async (req, res, next) => {
  res.json("User Profile");
};

// ===================Change User Avatar===================
// POST:api/users/change-avatar
// PROTECTED
export const changeAvatar = async (req, res, next) => {
  res.json("Change User Avatar");
};

// ===================Edit User Details===================
// POST:api/users/edit-user
// PROTECTED
export const editUser = async (req, res, next) => {
  res.json("Edit User Detail");
};

// ===================Get Authors===================
// POST:api/users/authors
// UNPROTECTED
export const getAuthors = async (req, res, next) => {
  res.json("Get All Authors");
};
