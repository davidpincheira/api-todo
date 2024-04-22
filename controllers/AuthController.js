const { User } = require('../models/index')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

  //register
  let signUp = async (req,res) => {
    await bcrypt.hash(req.body.password, Number.parseInt(process.env.AUTH_ROUNDS)).then((hash) => {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hash,
            status: 1,
            type: 'customer'
        });
        user.save().then((response) => {
            res.status(201).json({
                message: "User successfully created!",
                result: response
            });
        }).catch(error => {
            res.status(500).json({
                error: error
            });
        });
    });
  }
    //login    
  let signIn = async (req,res) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({
          where: {
            email
          }
        });

        if(!user){
            return res.status(400).json({
                message: "El usuario no existe"
            });
        }      
              
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(400).json({
                message: "Contraseña incorrecta!"
            });
        }            

        const payload = {
          user: {
            email: user.email
          }
        };
  
        jwt.sign(payload,
            process.env.AUTH_SECRET,
            {
              expiresIn: process.env.AUTH_EXPIRES
            },             
          (err, access_token) => {
            if (err) throw err;
            res.status(200).json({
              access_token
            });
          }
        )
      } catch (e) {
        console.error(e);
        res.status(500).json({
          message: "Server Error"
        });
      }
  }

  let profile = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.AUTH_SECRET);
      const user = await User.findOne({ where: { email: decoded.user.email } });

      res.status(200).json(user);
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Server Error" });
    }
  }

  module.exports = {
    signIn,
    signUp,
    profile
  }