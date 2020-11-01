const router = express.Router();

const { authenticated: auth } = require("../middleware/authentication");
const { uploadImage } = require("../middleware/uploadImg");

// upload file
const { upload } = require("../middleware/uploadFile");

const { register, login, checkAuth } = require("./../controller/auth");
const {
    getUsers,
    getDetail,
    editUser,
    uploadProfile
} = require("../controller/userData");
const {
    getLiterature,
    addLiterature,
    getDetailLiterature,
    deleteBook,
    getAdmLiterature,
    editLiterature,
    searchLiterature,
    searchLiteratureDate
} = require("../controller/literaturData");
const {
    getLibrary,
    detailLibrary,
    addLibrary,
    removeLibrary
} = require("./../controller/libraryData");

// User
router.get("/users", getUsers);
router.get("/user/:id", auth, getDetail);
router.patch("/user/:id", auth, uploadImage("avatar"), uploadProfile);

// Library
router.get("/libraries", auth, getLibrary);
router.get("/library/:id", auth, detailLibrary);
router.post("/libraries", auth, addLibrary);
router.post("/libraries", auth, addLibrary);
router.delete("/library/:id", auth, removeLibrary);

// Literature
router.get("/literatures", auth, getLiterature);
router.get("/literature/:id", auth, getDetailLiterature);
router.post("/literatures", auth, upload("literature"), addLiterature);
router.patch("/literature/:id", auth, editLiterature);
router.delete("/literature/:id", auth, deleteBook);
router.get("/AdmLiteratures", auth, getAdmLiterature);

// Search
router.get("/search/:title", auth, searchLiterature);
router.get("/search", auth, searchLiteratureDate);

// Auth Login & Register
router.post("/register", register);
router.post("/login", login);
router.get("/auth", auth, checkAuth);

module.exports = router;