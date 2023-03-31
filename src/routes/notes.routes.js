const { Router } = require("express");
const router = Router();

const {
  renderNoteForm,
  createNewNote,
  renderNotesAll,
  renderEditForm,
  updateNote,
  deleteNote,
} = require("../controllers/notes.controllers");

const { isAuthenticated } = require('../helpers/auth');

//New Note
router.get("/notes/add", isAuthenticated, renderNoteForm);

router.post("/notes/new-note", isAuthenticated , createNewNote);

// Get All Notes
router.get("/notes", isAuthenticated , renderNotesAll);

//Edit Notes
router.get("/notes/edit/:id", isAuthenticated , renderEditForm);

router.put("/notes/edit/:id", isAuthenticated , updateNote);

//Delete note

router.delete("/notes/delete/:id", isAuthenticated , deleteNote);

module.exports = router;
