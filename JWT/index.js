const bcrypt = require('bcrypt');
const fastify = require('fastify')({
    logger: true,
    ignoreTrailingSlash: true
});

const saltRounds = 10;
// Link utili per eseguire l'hash delle password e farne la verifica
// https://www.npmjs.com/package/bcrypt
// https://www.abeautifulsite.net/hashing-passwords-with-nodejs-and-bcrypt

fastify.register(require('fastify-jwt'), {
    secret: 'supersecret'
})

fastify.post('/token', (request, reply) => {
    // some code
    let model = request.body;

    let passwordHash = bcrypt.hashSync(model.password, saltRounds);
    console.log('passwordHash: ' + passwordHash);

    if (model.username == model.password) {
        var user = {
            id: 1,
            username: model.username
        };
        const token = fastify.jwt.sign({ payload: user });
        reply.send({ token });
    } else {
        reply.status(401).send({
            statusCode: 401,
            error: "Unauthorized",
            message: "Inavalid username or passord."
        });
    }
});

fastify.get('/verify', function (request, reply) {
    request.jwtVerify(function (err, decoded) {
        return reply.send(err || decoded)
    })
});


fastify.register(async function (fastify, opts) {
    fastify.addHook("onRequest", async (request, reply) => {
        try {
            await request.jwtVerify()
        } catch (err) {
            reply.send(err)
        }
    });

    fastify.get('/', async (request, reply) => {
            let tokenJwt = request.user;

            return {
                hello: 'world',
                user: tokenJwt.payload
            }
        });
});

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
start();