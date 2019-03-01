var categories =[
    {id: 1, name :'categoria 1' },
    {id: 2, name :'categoria 2' },
];

async function routes (fastify, options) {
    
    
    fastify.get('/', async (request, reply) => {
        return categories;
    });
    
    fastify.get('/:id', async (request, reply) => {
        let id = request.params.id;
        
        for(let i=0;i<categories.length;i++){
            let cat = categories[i];
            if(cat.id == id)
                return cat;
        }
        
        reply.status(404).send();
    });
    
    
  }
  
 module.exports = routes;
