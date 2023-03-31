const notesCtrl = {};

const Note = require('../models/Node');

notesCtrl.renderNoteForm = ( req, res) =>{
    res.render('notes/new-notes');
};

notesCtrl.createNewNote = async ( req, res )=>{

    const { title, description } =  req.body;
    const newNote = new Note( {title, description} );
    await newNote.save();
    req.flash('success_msg','note added successfully');
    res.redirect('/notes');
};

//Route to render all notes
notesCtrl.renderNotesAll = async ( req, res) =>{
   const notes =  await Note.find();
   res.render('notes/all-notes', { notes } );
}

//Route to edit a note

notesCtrl.renderEditForm = async ( req, res ) =>{
    const note = await Note.findById(req.params.id)
    res.render('notes/edit-note', {note} );

};

notesCtrl.updateNote = async ( req, res ) => {
    const { title, description } = req.body;
    await Note.findByIdAndUpdate(req.params.id, {title, description});
    req.flash('success_msg', 'note has been updated successfully ');
    res.redirect('/notes');
}

// Route to delete a note

notesCtrl.deleteNote = async ( req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'note has been delete successfully ');
    res.redirect('/notes');
}

//Search items


module.exports = notesCtrl;