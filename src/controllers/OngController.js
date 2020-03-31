const crypto = require('crypto')
const connection = require('../database/connection');
const bcrypt = require('bcryptjs');

module.exports = {
    async index(request, response) {
        const ongs = await connection('ongs').select('*');
        return response.json(ongs);
    },
    async create(request, response) {
        try {
            const { name, email, password, whatsapp, city, uf } = request.body;
            const ong = await connection('ongs')
                .where('email', email)
                .first();
            if (ong) {
                return res.status(400).json({ error: "ONG already exists" });
            }
            const id = crypto.randomBytes(4).toString('HEX');
            const hashPassword = await bcrypt.hash(password, 8);
            await connection('ongs').insert({
                id,
                name,
                email,
                password: hashPassword,
                whatsapp,
                city,
                uf
            });

            return response.json({ id });
        } catch (err) {
            return response.status(400).json({ error: "ONG registration failed" });
        }
    }
};