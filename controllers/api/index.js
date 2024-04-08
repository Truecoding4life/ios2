const router = require('express').Router();
const like = require('./like-routes');
const resource = require('./resource-routes');
const login = require('./login-routes');

router.use('/', login);
router.use('/like', like);
router.use('/resource', resource);
 

module.exports = router;

