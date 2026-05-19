const Rating = require("../models/Rating")

const submitRating = async (req, res) => {

  try {

    if (req.user.role === "StoreOwner") {

      return res.status(403).json({
        message:
          "Store owners cannot rate stores"
      });

    }

    const {
      storeId,
      rating
    } = req.body;

    const userId =
      req.user.id;

    if (!storeId || !rating) {

      return res.status(400).json({
        message:
          "Store ID and Rating are missing"
      });

    }

    if (rating < 1 || rating > 5) {

      return res.status(400).json({
        message:
          "Rating must be between 1 and 5"
      });

    }

    const existingRating =
      await Rating.findOne({
        where: {
          userId,
          storeId
        }
      });

    if (existingRating) {

      return res.status(400).json({
        message:
          "You already rated this store"
      });

    }

    await Rating.create({
      userId,
      storeId,
      rating
    });

    res.status(201).json({
      message:
        "Rating Submitted Successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};
const updateRating = async (req, res) => {

  try {

    const { storeId, rating } = req.body;

    const userId = req.user.id;

    const existingRating = await Rating.findOne({
      where: {
        userId,
        storeId
      }
    });

    if (!existingRating) {
      return res.status(404).json({
        message: "Rating not found"
      });
    }

    existingRating.rating = rating;

    await existingRating.save();

    res.status(200).json({
      message: "Rating updated successfully",
      rating: existingRating
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};

const deleteRating = async(req,res)=>{
  try {
    const {storeId} = req.params;
    
    const userId = req.user.id
  
    const rating = await Rating.findOne({
      where:{
        userId,
        storeId
      }
    })

    if (!rating) {
      return res.status(404).json({
        message:"Rating Not Found"
      })
    }
    await rating.destroy();


    res.status(200).json({
      message:"Rating Deleted Successfully"
    })

  } catch (error) {
    console.log(error).json({
      message:"Server Error"
    })
  }
}
module.exports={
    submitRating,
    updateRating,
    deleteRating
}