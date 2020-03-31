const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = {
    compareHash: function (hash, password) {
        return bcrypt.compare(hash, password);
    },
    generateToken: function (id) {
        return jwt.sign({ id }, "secret", {
            expiresIn: 86400
        });
    }
}