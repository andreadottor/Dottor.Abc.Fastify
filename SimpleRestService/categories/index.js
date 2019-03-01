var categories =[
    {id: 1, name :'categoria 1' },
    {id: 2, name :'categoria 2' },
];

async function routes (fastify, options) {
    
    
    fastify.get('/', async (request, reply) => {
      return categories;
    })
  }
  
 module.exports = routes;
