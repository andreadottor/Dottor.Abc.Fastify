async function routes (fastify, options) {
    fastify.get('/', async (request, reply) => {
      return ['categoria1', 'categoria2'];
    })
  }
  
 module.exports = routes;