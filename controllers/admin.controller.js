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

    async getUsers(req, res) {
        const users = await User.find({});

        res.status(200).send(users);
    }
}

module.exports = new AdminController();