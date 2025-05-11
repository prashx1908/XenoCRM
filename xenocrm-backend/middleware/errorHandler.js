const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Handle authentication errors
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      message: 'Authentication required',
      error: err.message
    });
  }

  // Handle validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Validation error',
      error: err.message
    });
  }

  // Handle MongoDB duplicate key errors
  if (err.code === 11000) {
    return res.status(400).json({
      message: 'Duplicate entry',
      error: 'This record already exists'
    });
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      message: 'Invalid token',
      error: 'Please log in again'
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      message: 'Token expired',
      error: 'Please log in again'
    });
  }

  // Handle other errors
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
};

module.exports = errorHandler; 