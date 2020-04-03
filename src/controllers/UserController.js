const crypto = require('crypto')
const connection = require('../database/connection');
const bcrypt = require('bcryptjs');

module.exports = {
    async index(request, response) {
        const users = await connection('users').select('*');
        return response.json(users);
    },
    async create(request, response) {
        try {
            const { name, email, password, phone, city, uf } = request.body;
            const user = await connection('users')
                .where('email', email)
                .first();
            if (user) {
                return response.status(400).json({ message: "User already exists" });
            }
            const id = crypto.randomBytes(4).toString('HEX');
            const hashPassword = await bcrypt.hash(password, 8);
            await connection('users').insert({
                id,
                name,
                email,
                password: hashPassword,
                phone,
                city,
                uf
            });

            return response.json({ id });
        } catch (err) {
            return response.status(400).json({ message: "User registration failed" });
        }
    }
};