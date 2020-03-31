const connection = require('../database/connection');
const auth = require('../util/auth');

module.exports = {
    async create(request, response) {
        try {
            const { id, password } = request.body;

            const ong = await connection('ongs')
                .where('id', id)
                .first();

            if (!ong) {
                return response.status(400).json({ error: "ONG not found" });
            }

            if (!(await auth.compareHash(password, ong.password))) {
                return response.status(400).json({ error: "Invalid password" });
            }

            return response.json({
                ong,
                token: auth.generateToken(ong.id)
            });
        } catch (err) {
            return response.status(400).json({ error: "ONG authentication failed" });
        }
    }
}