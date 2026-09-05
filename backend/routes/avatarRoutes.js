const express = require('express');
const router = express.Router();

// Get avatar models
router.get('/models', (req, res) => {
  const avatarModels = [
    {
      id: 'avatar_1',
      name: 'Default Avatar',
      description: '3D humanoid avatar',
      modelPath: '/models/avatar_1.glb'
    },
    {
      id: 'avatar_2',
      name: 'Anime Style',
      description: 'Anime-style 3D avatar',
      modelPath: '/models/avatar_2.glb'
    }
  ];
  res.json({
    success: true,
    avatars: avatarModels
  });
});

// Update user avatar
router.post('/update', (req, res) => {
  try {
    const { userId, avatarId } = req.body;
    res.json({
      success: true,
      message: 'Avatar updated',
      userId,
      avatarId
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
