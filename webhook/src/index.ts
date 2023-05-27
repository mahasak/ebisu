import fastify from 'fastify'

const mode = process.env.mode ? "prod" : "dev";
const logOptions = {
  dev: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
  prod: true,
  test: false,
}
const environment = "dev"

const server = fastify({
  logger: logOptions[mode] ?? true })

server.get('/ping', async (request, reply) => {
  return 'ponsg\n'
})

server.listen({ port: 5000 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})