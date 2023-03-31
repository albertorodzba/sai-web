const { Router } = require('express');
const router = Router();

/**
 * Las routes se guardaran en el archivo controllers
 */
const { renderIndex, renderAbout } = require("../controllers/index.controllers");

router.get( '/', renderIndex );

router.get( '/about', renderAbout);

module.exports = router;

