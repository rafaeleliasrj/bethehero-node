const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const ong = JSON.parse(request.headers.ong);
        const incidents = await connection('incidents')
        .select('*')
        .where('ong_id',ong.id);
        return response.json(incidents);
    }
}