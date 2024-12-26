// Middleware for handling unsupported (404) routes
export const notFound = (req, res, next) => {
  const error = new HttpError(`Not Found - ${req.originalUrl}`, 404);
  next(error);
};

// Global Error Handler Middleware
export const errorHandler = (error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || "An unknown error occurred." });
};
