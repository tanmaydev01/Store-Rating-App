const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware")

const roleMiddleware = require("../middleware/roleMiddleware")


const {
    createStore,
    getStores,
    getStoreAverageRating,
    getSingleStore,
    getOwnerDashboard,
    updateStore,
    deleteStore
}= require("../controller/storeControler")

router.get("/",
    authMiddleware,
    getStores)
router.get("/:storeId/rating", getStoreAverageRating);
router.get(
  "/owner/dashboard",
  authMiddleware,
  roleMiddleware("StoreOwner"),
  getOwnerDashboard
);
router.get("/:id",getSingleStore)
router.put(
    "/:id",
    authMiddleware,
    roleMiddleware("Admin"),
    updateStore
);
router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("Admin"),
    deleteStore

)
router.post(
    "/",
    authMiddleware,
    roleMiddleware("Admin"),
    createStore
);

module.exports = router