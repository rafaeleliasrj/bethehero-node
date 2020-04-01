const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1, limit = 20 } = request.query;
        const [count] = await connection('incidents').count('id');
        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(limit)
            .offset((page - 1) * limit)
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);
        response.header('X-Total-Count', count['count']);
        return response.json(incidents);
    },
    async create(request, response) {
        // if (!request.headers.authorization) {
        //     return response.status(401).json({ message: 'Operation not permitted' })
        // }

        const { title, description, value } = request.body;

        const [id] = await connection('incidents')
        .returning('id')
        .insert({
            title,
            description,
            value,
            ong_id: request.headers.ong_id
        })
        return response.json({ id });
    },
    async delete(request, response) {
        const { id } = request.params;
        const incident = await connection('incidents')
            .select('ong_id')
            .where('id', id)
            .first();

        if (!incident) {
            return response.status(404).json({ message: 'Incident not found' });
        }

        if (incident.ong_id !== request.headers.ong_id) {
            return response.status(401).json({ message: 'Operation not permitted' });
        }

        await connection('incidents').where('id', id).delete();
        return response.status(204).send();
    }
}