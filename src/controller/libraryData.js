const { User, Library, Literature } = require('./../../models');

exports.getLibrary = async (req, res) => {
  try {
    const library = await Library.findAll({
      include: [
        {
          model: Literature,
          as: 'literature',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'userId'],
          },
        },
        {
          model: User,
          as: 'user',
          attributes: {
            exclude: ['password', 'createdAt', 'updatedAt'],
          },
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });

    res.send({
      message: 'Data Succsesfully Loaded',
      data: {
        library,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: 'Server Error',
      data: err,
    });
  }
};

exports.detailLibrary = async (req, res) => {
  try {
    const { id } = req.params;
    const detail = await Library.findOne({
      where: {
        id,
      },
      include: [
        {
          model: Literature,
          as: 'literature',
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
        {
          model: User,
          as: 'user',
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
      ],
      attributes: {
        exclude: ['literatureId', 'userId', 'createdAt', 'updatedAt'],
      },
    });

    res.send({
      message: `Bookmark with id ${id}`,
      data: {
        library: detail,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: 'Server Error',
    });
  }
};

exports.addLibrary = async (req, res) => {
  try {
    const { literatureId, userId } = req.body;
    const addBookmarks = await Library.create({
      literatureId,
      userId,
    });

    res.send({
      message: 'Data Succsesfully Created',
      data: {
        library: addBookmarks,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: 'Server Error',
    });
  }
};

exports.removeLibrary = async (req, res) => {
  try {
    const { id } = req.params;
    const remove = await Library.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'literatureId', 'userId'],
      },
    });
    await Library.destroy({
      where: {
        id,
      },
    });

    res.send({
      message: `Bookmark removed`,
      data: {
        library: remove,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: 'Server ERROR',
    });
  }
};
