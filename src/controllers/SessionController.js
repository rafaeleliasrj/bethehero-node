const connection = require('../database/connection');
const auth = require('../util/auth');

module.exports = {
    async loginOng(request, response) {
        try {
            const { id, password } = request.body;

            const ong = await connection('ongs')
                .where('id', id)
                .first();

            if (!ong) {
                return response.status(400).json({ message: "ONG not found" });
            }

            if (!(await auth.compareHash(password, ong.password))) {
                return response.status(400).json({ message: "Invalid password" });
            }

            return response.json({
                ong: JSON.stringify(ong),
                token: auth.generateToken(ong.id)
            });
        } catch (err) {
            return response.status(400).json({ message: "ONG authentication failed" });
        }
    },
    async loginUser(request, response) {
        try {
            const { login, password } = request.body;

            const user = await connection('users')
                .where('email', login)
                .first();

            if (!user) {
                return response.status(400).json({ message: "User not found" });
            }

            if (!(await auth.compareHash(password, ong.password))) {
                return response.status(400).json({ message: "Invalid password" });
            }

            return response.json({
                user,
                token: auth.generateToken(user.id)
            });
        } catch (err) {
            return response.status(400).json({ message: "User authentication failed" });
        }
    }
}