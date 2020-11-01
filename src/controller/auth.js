const { User } = require("../../models");

// Hash data
const bcrypt = require("bcryptjs");

// Make token for auth
const jwt = require("jsonwebtoken");

// Key for decrypt jwt token
const key = process.env.JWT_KEY;

const joi = require("@hapi/joi");

exports.checkAuth = async(req, res) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.user.id
            },
            attributes: {
                exclude: ["createdAt", "updatedAt", "password"]
            }
        });

        res.send({
            message: "User Valid",
            data: { user }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Server Error"
        });
    }
};

exports.register = async(req, res) => {
    try {
        const { fullName, email, password, gender, phone, address } = req.body;

        const schema = joi.object({
            fullName: joi
                .string()
                .min(3)
                .required(),
            email: joi
                .string()
                .email()
                .min(10)
                .required(),
            password: joi
                .string()
                .min(8)
                .required(),
            gender: joi.string().required(),
            phone: joi
                .number()
                .min(11)
                .required(),
            address: joi
                .string()
                .min(5)
                .required()
        });

        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).send({
                error: {
                    message: error.details[0].message
                }
            });
        }

        const checkEmail = await User.findOne({
            where: {
                email
            }
        });

        // if email already been taken
        if (checkEmail) {
            return res.status(400).send({
                error: {
                    message: "Email already been existed"
                }
            });
        }

        // Encrypt password. salt strength
        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password, saltRounds);

        // Create new User
        const user = await User.create({
            fullName,
            email,
            password: hashPassword,
            gender,
            phone,
            address
        });

        // Token send to backend & if valid then continue
        // create jwt token after register succses
        const token = await jwt.sign({
                id: user.id
            },
            key
        );

        // send request with user data & jwt token
        res.send({
            message: "Register Succses",
            data: {
                email,
                fullName,
                token
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Server Error"
        });
    }
};

exports.login = async(req, res) => {
    try {
        const { email, password } = req.body;

        const schema = joi.object({
            email: joi
                .string()
                .email()
                .min(10)
                .required(),
            password: joi
                .string()
                .min(8)
                .required()
        });

        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).send({
                error: {
                    message: error.details[0].message
                }
            });
        }

        const dataUser = await User.findOne({
            where: {
                email
            }
        });

        //if user not existed
        if (!dataUser) {
            return res.status(400).send({
                error: {
                    message: "Email or password invalid"
                }
            });
        }

        //else, compare password from body to database
        const validPassword = await bcrypt.compare(password, dataUser.password);

        //if password not valid then throw error
        if (!validPassword) {
            return res.status(400).send({
                error: {
                    message: "Email or password invalid"
                }
            });
        }

        //if email & password existed create new token
        const token = jwt.sign({
                id: dataUser.id
            },
            key
        );

        res.send({
            message: "Login success",
            data: {
                email: dataUser.email,
                fullName: dataUser.fullName,
                token
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Server Error"
        });
    }
};