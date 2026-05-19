const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


const signupUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }
    if (password.length < 6) {
  return res.status(400).json({
    message: "Password must be at least 6 characters"
  });
}
    const hashedPassword = await bcrypt.hash(password,10);

    const newUser = await User.create({
      name,
      email,
      password:hashedPassword,
      role
    });

    res.status(201).json({
      message: "User created successfully",
      user: newUser
    });

  } catch (error) {

  console.log(error);

  if (error.name === "SequelizeUniqueConstraintError") {
    return res.status(400).json({
      message: "Email already exists"
    });
  }

  res.status(500).json({
    message: "Server Error"
  });

}
  }

const getUsers = async(req,res)=>{
  try{
    const users = await User.findAll();

    res.status(200).json({
      users
    });
  }
  catch(error){
    console.log(error);

    res.status(500).json({
      message:"Server Error"
    })
  }
}

const loginUser = async(req,res)=>{

  try{
    const {email,password} = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message:"Email and Password Not Found "
      })
    }
    const user = await User.findOne({
      where:{email}
    })
     const isPasswordMatch = await bcrypt.compare(
    password,
    user.password
    )

    if (!isPasswordMatch) {
      return res.status(400).json({
        message:"Invalid Password"
      })
    }
    const token = jwt.sign(
      {
        id:user.id,
        email:user.email,
        role:user.role
      },
      "secretkey",
      {
        expiresIn:"1d"
      }
    )
    res.status(200).json({
      message:"Login Successful",
      token,
      user
    })



  } catch(error){
    console.log(error);
    res.status(500).json({
      message:"Server Error"
    })
  }
 
}


module.exports = {
  signupUser,
  getUsers,
  loginUser,
  
};