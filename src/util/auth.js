const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = {
    compareHash: function (hash, password) {
        return bcrypt.compare(hash, password);
    },
    generateToken: function (id) {
        return 'Bearer ' + jwt.sign({ id }, "secret", {
            expiresIn: 86400
        });
    }
}