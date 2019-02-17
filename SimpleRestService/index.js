/*
    ignoreTrailingSlash
    Fastify uses find-my-way to handle routing. 
    This option may be set to true to ignore trailing slashes in routes. 
    This option applies to all route registrations for the resulting server instance.
*/

// Require the framework and instantiate it

const fastify = require('fastify')({ 
    logger: true, 
    ignoreTrailingSlash: true 
})


/*
    Route Prefixing
    Sometimes you need to maintain two or more different versions of the same api, 
    a classic approach is to prefix all the routes with the api version number, /v1/user for example. 
    Fastify offers you a fast and smart way to create different version 
    of the same api without changing all the route names by hand, route prefixing.
*/
fastify.register(require('./categories'), { prefix: '/api/categories' })

/*
    Shorthand declaration
    The above route declaration is more Hapi-like, but if you prefer an Express/Restify approach, we support it as well:
    fastify.get(path, [options], handler)
    fastify.head(path, [options], handler)
    fastify.post(path, [options], handler)
    fastify.put(path, [options], handler)
    fastify.delete(path, [options], handler)
    fastify.options(path, [options], handler)
    fastify.patch(path, [options], handler)
*/
fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})

fastify.get('/api/products', async (request, reply) => {
    return ['prodotto1', 'prodotto2', 'prodotto3']
  })

fastify.get('/api/products/:id', async (request, reply) => {
    return 'prodotto' + request.params['id'];
  })

fastify.post('/api/products/', async (request, reply) => {
    /*
        console.log(request.body)
        console.log(request.query)
        console.log(request.params)
        console.log(request.headers)
        console.log(request.raw)
        console.log(request.id)
    */

    console.log(request.body)
    var name = request.body.name;
    console.log("name: " + name)

    reply.code(204).send();
  })

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000)
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()

