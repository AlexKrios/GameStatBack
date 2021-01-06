const mongoose = require("mongoose");
const JsonWebToken = require("jsonwebtoken");

const User = require("../models/user");

class AdminController {
  async login(req, res) {
    await User.findOne({username: req.body.username}).then(user => {
      if (!user) {
        return res.status(404).send({
          success: false,
          errors: {
            username: "Username not found"
          }
        });
      }

      if (user.password !== req.body.password) {
        return res.status(401).send({
          success: false,
          errors: {
            password: "Wrong password"
          }
        });
      } else {
        const token = JsonWebToken.sign({}, process.env.JWT_TOKEN);
        return res.status(200).send({success: true, token: token});
      }
    });
  }

  async getUser(req, res) {
    const user = await User.findOne({_id: req.params.id});

    res.status(200).send(user);
  }

  async getUsers(req, res) {
    const users = await User.find({});

    res.status(200).send(users);
  }

  async createUser(req, res) {
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      ...req.body
    });

    await user.save().then(result => {
      console.log(`----- User ${req.body.username} has been created -----`);
      res.status(201).json({
        message: "Handling POST requests to /user/create",
        createdProduct: result
      });
    })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }

  async updateUser(req, res) {
    await User.updateOne({_id: req.params.id}, req.body).then(result => {
      console.log(`----- User ${req.body.username} has been updated -----`);
      res.status(200).json({
        message: "Handling PUT requests to /user/update/:id",
        updatedProduct: result
      });
    })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }

  async deleteUser(req, res) {
    await User.findByIdAndDelete({_id: req.params.id})
      .then(() => {
        console.log(`----- User with id: ${req.params.id} has been deleted -----`);
        res.status(200).json({
          message: "Handling DELETE requests to /user/delete/:id"
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }
}

module.exports = new AdminController();