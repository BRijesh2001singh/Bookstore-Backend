const router = require("express").Router();
const bookmodel = require("../models/bookmodel");
const usermodel = require("../models/user");
const favourite = require("../models/favourite");
const jwt = require("jsonwebtoken");
const privatekey = "bookstore123";

//POST REquest
router.post("/add", async (req, res) => {
  try {
    const data = req.body;
    const newBook = new bookmodel(data);
    await newBook.save().then(() => {
      res.status(200).json({ message: "Book Added successfully" });
    });
  }
  catch (error) {
    console.log(error);
  }
})
//Get request
router.get("/get", async (req, res) => {
  let books;
  try {
    books = await bookmodel.find();

    res.status(200).json({ books });
  }
  catch (error) {
    console.log(error);
  }
});
//Get request for user profile
router.post("/:id/getaddedbooks", async (req, res) => {
  const userId = req.params.id;
  try {
    books = await bookmodel.find({ addedBy: userId });
    res.status(200).json({ books });
  }
  catch (error) {
    console.log(error);
  }
});
//get req using ID
router.get("/get/:id", async (req, res) => {
  let book;
  const id = req.params.id;
  try {
    book = await bookmodel.findById(id);
    res.status(200).json({ book })
  }
  catch (error) {
    console.log(error);
  }
});
//update books using ID
router.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  const { bookname, description, author, image, readonline, price } = req.body;
  let updatedbook;
  try {
    updatedbook = await bookmodel.findByIdAndUpdate(id, { bookname, description, author, image, readonline, price });
    await updatedbook.save().then(() => res.json({ message: "BOOK ADDED" }));
  }
  catch (error) {
    console.log(error);
  }
});
//delete book by ID
router.delete("/deleteBook/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await bookmodel.findByIdAndDelete(id).then(() => res.status(201).json({ message: "Book Deleted" }));
  }
  catch (error) {
    console.log(error);
  }
})
//Register USERS
router.post("/register", async (req, res) => {
  const userdata = req.body;
  const { name, email } = req.body;
  if (await usermodel.findOne({ email })) {
    return res.status(409).json({ message: "User Already Exists" });
  }
  const newuser = new usermodel(userdata);
  await newuser.save().then(() => {

    return res.status(200).json({ message: "User has been added" });
  }).catch((err) => {
    console.log(err);
  })
});
//signin USERS
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await usermodel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    const passwordmatch = await user.comparePassword(password, user.password);
    if (passwordmatch) {
      const jwttoken = jwt.sign({ email: email }, process.env.PRIVATE_KEY);
      res.cookie("uuid", jwttoken);
      res.status(200).json({ message: "User signed in" });
    }
    else {
      return res.status(401).json({ message: "Wrong password" });
    }
  } catch (err) {
    return res.status(500).json({ message: "ERROR FROM SERVER" });
  }
})
// //getallusers
// router.get("/getallusers", async (req, res) => {
//   const allusers = await usermodel.find();
//   res.json({ allusers });
// })
//get user
router.post("/getuser", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await usermodel.findOne({ email });
    if (!user) return res.json({ message: "USER NOT FOUND" });

    return res.json({ name: user.name, id: user._id, favbook: user.favbook });
  } catch (err) {
    console.log(err);
  }
})
//add fav books
router.patch("/:userId/addfavbook", async (req, res) => {
  try {
    const userId = req.params.userId;
    const newfavbookId = req.body.newfavbookId;
    //when new user adds fav book
    let userexists = await favourite.findOne({ userId });
    if (!userexists) {
      let newuserfav = new favourite({ userId, favbookId: [] });
      await newuserfav.save();
    }
    //this is when user is already present
    const updatedFavbooks = await favourite.findOneAndUpdate({ userId }, { $push: { favbookId: newfavbookId } }, { new: true });
    res.status(200).json({ favbookId: updatedFavbooks.favbookId });

  } catch (err) {
    console.log(err);
  }
})
//delete fav books
router.delete("/:userId/deletefavbook", async (req, res) => {
  const userId = req.params.userId;
  const favbookId = req.body.favbookId;
  try {
    await favourite.findOneAndUpdate({ userId }, { $pull: { favbookId: favbookId } }, { new: true });
    res.status(200).json({ message: "Book Removed" });
  } catch (err) {
    console.log(err);
  }
})
//get favbooks 
router.get("/:userId/getfavbook", async (req, res) => {
  userId = req.params.userId;
  try {
    const favbook = await favourite.findOne({ userId }).populate({ path: "favbookId", select: "bookname author readonline" });
    if (!favbook) return res.json({ message: "No favourite books" });
    const favbooklist = favbook.favbookId || [];
    res.status(200).json({ favbooklist });
  }
  catch (err) {
    console.log(err);
  }
})
module.exports = router;
