const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = {
    compareHash: function (hash, password) {
        return bcrypt.compare(hash, password);
    },
    generateToken: function (id) {
        const token = 'Bearer ' + jwt.sign({ id }, "secret", {
            expiresIn: 86400
        });
        return token;
    }
}