const validateTask = (req, res, next) => {
  const { title, description } = req.body;
  
  if (!title || title.trim() === '') {
    return res.status(400).json({ 
      success: false,
      message: 'Title is required' 
    });
  }
  
  next();
};

module.exports = { validateTask };
