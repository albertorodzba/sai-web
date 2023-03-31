const { Router } = require("express");
const { showUsers, editUser, editUserSave, deleteUser } = require("../controllers/admin.controllers");

const router = Router();


const { isAuthenticated } = require('../helpers/auth');


//Show user to admin
router.get("/admin", isAuthenticated ,showUsers);


//Admin edit to users


router.get("/admin/:id/editU", isAuthenticated , editUser);


router.post("/admin/:id/editU", isAuthenticated , editUserSave);


//Admin to delete

router.delete("/admin/:id/delete", isAuthenticated, deleteUser );

module.exports = router;