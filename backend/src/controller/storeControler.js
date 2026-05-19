const Store = require("../models/Store");
const Rating = require("../models/Rating");
const {Op} = require("sequelize");


const createStore = async (req, res) => {
  try {

    const {
      name,
      email,
      address,
      ownerId
    } = req.body;

    if (!name || !email || !address || !ownerId) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }
    if (name.length < 3) {
  return res.status(400).json({
    message: "Store name too short"
  });
}
    const newStore = await Store.create({
      name,
      email,
      address,
      ownerId
    });

    res.status(201).json({
      message: "Store created successfully",
      store: newStore
    });

  } catch (error) {

    console.log(error);

    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({
        message: "Store email already exists"
      });
    }

    res.status(500).json({
      message: "Server Error"
    });

  }

};
const getStores = async (req, res) => {

  try {

    const { name } = req.query;

    let condition = {};

    if (name) {
      condition.name = {
        [Op.iLike]: `%${name}%`
      };
    }

    const page =
      parseInt(req.query.page) || 1;

    const limit =
      parseInt(req.query.limit) || 5;

    const offset =
      (page - 1) * limit;

    const stores = await Store.findAll({
      where: condition,
      limit,
      offset
    });

    const formattedStores =
      await Promise.all(

        stores.map(async (store) => {

          const ratings =
            await Rating.findAll({
              where: {
                storeId: store.id
              }
            });

          let averageRating = 0;

          if (ratings.length > 0) {

            const total =
              ratings.reduce(
                (sum, item) =>
                  sum + item.rating,
                0
              );

            averageRating =
              total / ratings.length;
          }

          let userRating = null;

          if (req.user) {

            const existingRating =
              await Rating.findOne({
                where: {
                  storeId: store.id,
                  userId: req.user.id
                }
              });

            userRating =
              existingRating
                ? existingRating.rating
                : null;
          }

          return {
            id: store.id,
            name: store.name,
            email: store.email,
            address: store.address,
            ownerId: store.ownerId,
            averageRating,
            userRating
          };

        })

      );

    res.status(200).json({
      stores: formattedStores
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};
const getStoreAverageRating = async (req, res) => {

  try {

    const { storeId } = req.params;

    const ratings = await Rating.findAll({
      where: { storeId }
    });

    if (ratings.length === 0) {
      return res.status(200).json({
        averageRating: 0
      });
    }

    let total = 0;

    ratings.forEach((item) => {
      total += item.rating;
    });

    const averageRating = total / ratings.length;

    res.status(200).json({
      totalRatings: ratings.length,
      averageRating
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};
const getSingleStore = async (req, res) => {

  try {

    const { id } = req.params;

    const store = await Store.findByPk(id);

    if (!store) {
      return res.status(404).json({
        message: "Store not found"
      });
    }

    res.status(200).json({
      store
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};
const getOwnerDashboard = async (req, res) => {

  try {

    const ownerId = req.user.id;

    const stores = await Store.findAll({
      where: {
        ownerId
      }
    });

    const storeIds = stores.map(store => store.id);

    const ratings = await Rating.findAll({
      where: {
        storeId: storeIds
      }
    });

    let total = 0;

    ratings.forEach((item) => {
      total += item.rating;
    });

    const averageRating =
      ratings.length > 0
        ? total / ratings.length
        : 0;

    res.status(200).json({
      totalStores: stores.length,
      totalRatings: ratings.length,
      averageRating,
      stores
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};
const updateStore = async(req,res)=>{
  try {
    
    const{id} = req.params;

    const{
      name,
      email,
      address
    } = req.body;

    const store = await Store.findByPk(id)


    if (!store) {
      return res.status(404).json({
        message:"Store Not Found"
      })
    }
    store.name = name || store.name;
    store.email = email || store.email;
    store.address = address || store.address;

    await store.save();

    res.status(200).json({
      message:"Store updated Successfully",
      store
    })


  } catch (error) {
    console.log(error);

    res.status(500).json({
      message:"Server Error"
    })
  }
}

const deleteStore = async(req,res)=>{
  try {
    const {id} = req.params;

    const store = await Store.findByPk(id);


    if (!store) {
      return res.status(404).json({
        message:"Store Not Found"
      })
    }
    await store.destroy()


    res.status(200).json({
        message:"Store Deleted Succesfully"
    })
    
  } catch (error) {
    console.log(error)

    res.status(500).json({
      message:"Server Error"
    })
  }
}
module.exports = {
  createStore,
  getStores,
  getStoreAverageRating,
  getSingleStore,
  getOwnerDashboard,
  updateStore,
  deleteStore

};