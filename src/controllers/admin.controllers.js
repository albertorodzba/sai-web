const adminCtrl = {};
const User = require("../models/User");

adminCtrl.showUsers = async (req, res) => {
  try {
    const users = await User.find().lean();
    res.render("Admin/admin", { users });
  } catch (error) {
    console.error(error);
  }
};

adminCtrl.editUser = async (req, res) => {
  try {
    const users = await User.findById(req.params.id).lean();
    res.render("Admin/editUser", { users });
  } catch (error) {
    console.error(error);
  }
};

adminCtrl.editUserSave = async (req, res) => {
  try {
    console.log(req.body);

    const errors = [];
    const { name, email, password, confirm_password } = req.body;
    let admin;

    if (password === "" && confirm_password === "") {
      admin = req.body.admin === "on" ? true : false;

      await User.findByIdAndUpdate(req.params.id, { name, email, admin });

      res.redirect("/admin");
    } else {
      if (password !== confirm_password) {
        errors.push({ text: "Password do not match" });
      }

      if (password.length < 8) {
        errors.push({ text: "Password must be at least 8 characters" });
      }

      if (errors.length > 0) {
        res.redirect(`/admin/${req.params.id}/editU`, { errors, name, email });
      } else {
        admin = req.body.admin === "on" ? true : false;

        const user = await User.findByIdAndUpdate(req.params.id, req.body);
        user.password = await user.encryptPass(password);
        await user.save();

        res.redirect("/admin");
      }
    }
  } catch (error) {
    console.error(error);
  }
};


adminCtrl.deleteUser = async (req, res) => {
    try
    {
      await User.findByIdAndDelete(req.params.id);
      res.redirect('/admin');
    }
    catch(error)
    {
      console.log(error);
    }


};

module.exports = adminCtrl;
