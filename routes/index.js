const express = require('express');
const router = express.Router();
const authenticator = require('../midware/authenticate');
const {auth, requiresAuth} = require('express-openid-connect');

router.use(auth(authenticator.config));
router.use('/', require('./authenticate'));
router.use('/', require('./swagger'));
router.use('/render', require('./render'));
router.use('/mongo', require('./mongo'));
router.use('/node', require('./node'));
router.use('/user', require('./user'));

router.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

module.exports = router;