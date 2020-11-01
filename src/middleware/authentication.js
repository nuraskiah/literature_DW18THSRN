const jwt = require("jsonwebtoken");

const key = process.env.JWT_KEY;

exports.authenticated = (req, res, next) => {
    let header, token;

    // check if header present and with Bearer
    if (!(header = req.header("Authorization")) ||
        !(token = header.replace("Bearer ", ""))
    ) {
        return res.status(400).send({
            error: {
                message: "Acces Denied"
            }
        });
    }

    // check if token exist
    try {
        const verified = jwt.verify(token, key);

        req.user = verified;
        next();
    } catch (err) {
        console.log(err);
        res.status(400).send({
            error: {
                message: "Invalid Token"
            }
        });
    }
};