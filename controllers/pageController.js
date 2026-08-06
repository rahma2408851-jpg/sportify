exports.getHome = (req, res) => {
  res.render("pages/home", {
    title: "Sportify · Performance Sportswear",
    activePage: "home",
    bodyClass: "page-home"
  });
};

exports.getAbout = (req, res) => {
  res.render("pages/about", {
    title: "About us · Sportify",
    activePage: "about"
  });
};

exports.getContact = (req, res) => {
  res.render("pages/contact", {
    title: "Contact us · Sportify",
    activePage: "contact"
  });
};

exports.postContact = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      req.session.error = "Please fill in all fields before submitting.";
      return res.redirect("/contact");
    }
    req.session.success = "Thank you for reaching out! We will get back to you soon.";
    res.redirect("/contact");
  } catch (err) {
    next(err);
  }
};

exports.getShop = (req, res) => {
  const { category } = req.query;
  const selectedCategory = category ? String(category).toLowerCase() : "shopall";

  let pageTitle = "Sportify · All Products";
  if (["men", "women", "unisex"].includes(selectedCategory)) {
    pageTitle = `Sportify · ${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Collection`;
  }

  res.render("pages/shop", {
    title: pageTitle,
    pageTitle,
    activePage: "shop",
    selectedCategory
  });
};

exports.getFavoritesPage = (req, res) => {
  res.render("pages/favorites", {
    title: "Favorites · Sportify",
    activePage: "favorites"
  });
};

exports.getProfile = (req, res) => {
  res.render("pages/profile", {
    title: "My profile · Sportify",
    activePage: "profile"
  });
};

exports.postProfile = async (req, res, next) => {
  try {
    const User = require("../models/User");
    const { name } = req.body;
    if (!name || name.trim().length < 2) {
      req.session.error = "Name must be at least 2 characters.";
      return res.redirect("/profile");
    }
    const user = await User.findByIdAndUpdate(
      req.session.user.id,
      { name: name.trim() },
      { new: true, runValidators: true }
    );
    req.session.user.name = user.name;
    req.session.success = "Profile updated successfully.";
    res.redirect("/profile");
  } catch (err) {
    next(err);
  }
};
