const { User, Literature } = require("./../../models");
const { Op } = require("sequelize");

const joi = require("@hapi/joi");

exports.searchLiterature = async(req, res) => {
    try {
        const { title } = req.params;
        const search = await Literature.findAll({
            where: {
                title: {
                    [Op.like]: title + "%"
                }
            }
        });

        res.send({
            message: "Data Succsesfully Loaded",
            data: {
                search
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Server error"
        });
    }
};

exports.searchLiteratureDate = async(req, res) => {
    let title = req.query.title;
    let public_year = req.query.public_year;
    try {
        if (public_year) {
            const literature = await Literature.findAll({
                include: [{
                    model: User,
                    as: "user_id",
                    attributes: {
                        exclude: ["password", "createdAt", "updatedAt"]
                    }
                }],
                attributes: {
                    exclude: ["UserId", "createdAt", "updatedAt"]
                },
                where: {
                    title: {
                        [Op.like]: "%" + title + "%"
                    },
                    publication_date: {
                        [Op.gte]: public_year
                    }
                },
                order: [
                    ["publication_date", "DESC"]
                ]
            });
            res.send({
                message: `title like ${title} in ${public_year} was found`,
                literature
            });
        } else {
            const literature = await Literature.findAll({
                include: [{
                    model: User,
                    as: "user_id",
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    }
                }],
                attributes: {
                    exclude: ["UserId", "createdAt", "updatedAt"]
                },
                where: {
                    title: {
                        [Op.like]: "%" + title + "%"
                    }
                }
            });
            res.send({
                message: `${title} title found`,
                literature
            });
        }
    } catch (err) {
        showError(err);
    }
};

exports.getLiterature = async(req, res) => {
    try {
        const literature = await Literature.findAll({
            where: {
                status: "Approved"
            },
            include: {
                model: User,
                as: "user_id",
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            },
            order: [
                ["id", "DESC"]
            ]
        });

        res.send({
            message: "Data Succsesfully Loaded",
            data: {
                literature
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Server Error"
        });
    }
};

exports.getAdmLiterature = async(req, res) => {
    try {
        // console.log("Ini adalah ID user yang login ", req.user);

        const literature = await Literature.findAll({
            include: {
                model: User,
                as: "user_id",
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }
            },
            attributes: {
                exclude: [
                    "createdAt",
                    "updatedAt",
                    "categoryId",
                    "userId",
                    "CategoryId",
                    "UserId"
                ]
            },
            order: [
                ["id", "DESC"]
            ]
        });

        res.send({
            message: "Data Succsesfully Loaded",
            data: {
                literature
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Server Error"
        });
    }
};

exports.getDetailLiterature = async(req, res) => {
    try {
        const { id } = req.params;
        const detail = await Literature.findOne({
            where: {
                id
            },
            include: {
                model: User,
                as: "user_id",
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            }
        });

        res.send({
            message: `Literature ${id} found`,
            data: {
                data: detail
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Server Error"
        });
    }
};

// create with multer
exports.addLiterature = async(req, res) => {
    try {
        const {
            title,
            author,
            publication_date,
            pages,
            ISBN,
            status,
            userId
        } = req.body;

        const schema = joi.object({
            userId: joi.number(),
            title: joi.string().required(),
            author: joi.string().required(),
            publication_date: joi.string().required(),
            pages: joi.number().required(),
            ISBN: joi.string().required(),
            status: joi.string().required()
        });

        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).send({
                error: {
                    message: error.details[0].message
                }
            });
        }
        const checkISBN = await Literature.findOne({
            where: {
                ISBN
            }
        });

        if (checkISBN) {
            return res.status(400).send({
                message: "ISBN already exists"
            });
        }

        const literatureCreated = await Literature.create({
            ...req.body,
            file: req.files.file[0].filename,
            thumbnail: req.files.thumbnail[0].filename
        });

        res.status(200).send({
            message: "Literature has successfully created",
            data: { literatureCreated }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            error: {
                message: "Server ERROR"
            }
        });
    }
};

exports.editLiterature = async(req, res) => {
    try {
        const { id } = req.params;
        const [edit] = await Literature.update(req.body, {
            where: {
                id
            }
        });

        if (!edit)
            return res.status(404).send({
                message: "Literature not found!"
            });

        const data = await Literature.findOne({
            where: {
                id
            },
            include: {
                model: User,
                as: "user_id",
                attributes: { exclude: ["password", "createdAt", "updatedAt"] }
            },

            attributes: {
                exclude: ["createdAt", "updatedAt", "categoryId", "userId"]
            }
        });

        res.send({
            status: "success",
            message: `Literature updated successfully`,
            data
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "error",
            message: "Internal Server Error",
            code: 500
        });
    }
};

exports.deleteBook = async(req, res) => {
    try {
        const { id } = req.params;
        const dataDeleted = await Literature.findOne({
            where: {
                id
            },
            attributes: {
                exclude: [
                    "title",
                    "publication",
                    "categoryId",
                    "userId",
                    "pages",
                    "ISBN",
                    "file",
                    "thumbnail",
                    "status",
                    "createdAt",
                    "updatedAt"
                ]
            }
        });
        await Literature.destroy({
            where: {
                id
            }
        });

        res.send({
            message: `Data with id ${id} has been deleted`,
            data: {
                Literature: dataDeleted
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Server ERROR"
        });
    }
};