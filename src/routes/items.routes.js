const { Router } = require("express");
const {
  renderTableItem,
  addItem,
  renderEditItem,
  EditItem,
  deleteItem,
  renderCategoriaPC,
  anyItemSearch,
  renderViewItem
} = require("../controllers/items.controllers");

const { isAuthenticated } = require('../helpers/auth');
const router = Router();

//All items
router.get("/items", isAuthenticated ,renderTableItem);

//Add
router.post("/items/add", isAuthenticated ,addItem);

//View
router.get("/items/:id/view", isAuthenticated , renderViewItem);

//Edit
router.get("/items/:id/edit",isAuthenticated, renderEditItem);

router.put("/items/:id/edit", isAuthenticated, EditItem);

//Delete
router.delete("/items/:id/delete", isAuthenticated,  deleteItem);
//View

//Queries

//Categories

router.get("/items/search/computo", isAuthenticated, renderCategoriaPC);

// Search any item

router.post("/items/search/param", isAuthenticated, anyItemSearch);

module.exports = router;
