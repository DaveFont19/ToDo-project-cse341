const express = require('express');
//const passport = require('passport');
const { ensureAuthenticated } = require('../middlewares/authentication');

const router = express.Router();

//router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

//router.get(
//  '/google/callback',
//  passport.authenticate('google', { failureRedirect: '/api-docs' }),
//  (req, res) => {
//    res.redirect('/api-docs');
//  }
//);

router.get('/current-user', ensureAuthenticated, (req, res) => {
  res.status(200).json(req.user);
});

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.status(200).json({ message: 'Logged out successfully' });
  });
});

module.exports = router;
