const express = require("express")

const router = express.Router()

const authMiddleware = require("../middleware/authMiddleware")

const {
    submitRating,
    updateRating,
    deleteRating
} = require("..//controller/ratingController")

router.post(
    "/",
    authMiddleware,
    submitRating
)
router.put(
    "/",
    authMiddleware,
    updateRating
    )
router.delete(
    "/:storeId",
    authMiddleware,
    deleteRating
)    
module.exports = router