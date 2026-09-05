const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const axios = require('axios');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Google OAuth Login
router.post('/google', async (req, res) => {
  try {
    const { idToken } = req.body;

    // Verify Google token
    const ticket = await googleClient.verifyIdToken({
      idToken: idToken,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    // Find or create user
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        username: name,
        email,
        password: 'oauth_' + Date.now(),
        avatar: picture
      });
      await user.save();
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret');

    res.json({
      success: true,
      message: 'Google login successful',
      token,
      user: { id: user._id, username: user.username, email }
    });
  } catch (error) {
    res.status(401).json({ error: 'Google authentication failed' });
  }
});

// Facebook OAuth Login
router.post('/facebook', async (req, res) => {
  try {
    const { accessToken } = req.body;

    // Verify Facebook token
    const response = await axios.get('https://graph.facebook.com/me', {
      params: {
        access_token: accessToken,
        fields: 'id,name,email,picture'
      }
    });

    const { email, name, picture } = response.data;

    // Find or create user
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        username: name,
        email: email || 'fb_' + response.data.id + '@facebook.com',
        password: 'oauth_' + Date.now(),
        avatar: picture?.data?.url
      });
      await user.save();
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret');

    res.json({
      success: true,
      message: 'Facebook login successful',
      token,
      user: { id: user._id, username: user.username, email: user.email }
    });
  } catch (error) {
    res.status(401).json({ error: 'Facebook authentication failed' });
  }
});

module.exports = router;
