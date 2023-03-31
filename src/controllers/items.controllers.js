const itemsCtrl = {};
const Item = require("../models/Item");
const Swal = require("sweetalert2");
const cloudinary = require("cloudinary");
const fs = require("fs-extra");
const moment = require('moment');

//Setting
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

let items = undefined;

itemsCtrl.renderTableItem = async (req, res) => {
  try {
    items = await Item.find().lean();
    items.forEach(item => {
      item.daten = moment.utc(item.date).format("L");
    });
    res.render("items/itemsTable", { items });

  } catch (error) {
    console.error(error);
  }
};

itemsCtrl.addItem = async (req, res) => {

  let item;
  try {
    if (req.file) {
      const result = await cloudinary.v2.uploader.upload(req.file.path);
      const newItem = req.body;
      newItem.imageURL = result.secure_url;
      newItem.public_id = result.public_id;
      item = await Item(newItem);
      await fs.unlink(req.file.path);
    } else 
    {
      item = await Item(req.body); 
    }

    await item.save();
    req.flash("success_msg", "item added successfully");
    res.redirect("/items");
  } catch (error) {
    console.error(error);
    req.flash("error_msg", "item couldn't add");
  }
};

//View Item

itemsCtrl.renderViewItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    item.daten = moment.utc(item.date).format("L");
    res.render("items/viewItem", {item});
  } catch (error) {
    console.error(error);
  }
};


//Edit items


itemsCtrl.renderEditItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).lean();
    item.daten = moment.utc(item.date).format("L");
    res.render("items/editItem", { item });
  } catch (error) {
    console.error(error);
  }
};

itemsCtrl.EditItem = async (req, res) => {
  let item;
  try {
    if (req.file) {
      const result = await cloudinary.v2.uploader.upload(req.file.path);
      const newItem = req.body;
      newItem.imageURL = result.secure_url;
      newItem.public_id = result.public_id;

    
      item = await Item.findById( req.params.id ).lean();

      if( item.imageUR )
      {
        await cloudinary.v2.uploader.destroy(item.public_id);
        
      }

      await Item.findByIdAndUpdate(req.params.id, newItem);
      await fs.unlink(req.file.path);


    } else {
      item = await Item.findByIdAndUpdate(req.params.id, req.body);
    }
    req.flash("success_msg", "Item updated successfuly");
    res.redirect("/items");
  } catch (error) {
    console.error(error);
  }
};



//Delete item

itemsCtrl.deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);

    if (item.public_id) {
      await cloudinary.v2.uploader.destroy(item.public_id);
    }

    req.flash("success_msg", "item deleted successfuly");
    res.redirect("/items");
  } catch (error) {
    req.flash("success_msg", "item couldn't delete successfuly");
    console.error(error);
  }
};

//Search item

  //Categories

itemsCtrl.renderCategoriaPC = async (req, res) => {
  try {
    items = await Item.find({ categoria: "Computo" }).lean();
    
    res.render("items/itemsTable", { items });
  } catch (error) {
    console.error(error);
  }
};

  // Search any items

itemsCtrl.anyItemSearch = async (req, res) => {
  try {
    const { itemSearch } = req.body;
    const items = await Item.find({ $text: { $search: itemSearch } }).lean();
    res.render("items/itemsTable", { items });
  } catch (error) {
    console.error(error);
  }
};

/*
itemsCtrl.dateSearch = async ( req, res ) => {
  try {
    
    const items = await Item.find( { date:{ $gte: "", $lte: "" }});

  } catch (error) {
    console.error(error);
  }
};
*/



/*const isEmpty = ( req = {} ) => {
  //const {} = req.
};
*/
 

module.exports = itemsCtrl;
