const { createServer } = require('http')
const Corrosion = require('corrosion')
const { loadNuxt, build } = require('nuxt')
const corrosion = new Corrosion({
  codec: 'plain',
  prefix: '/fetch/'
})

const dev = process.argv[2] === 'development';

(async () => {
  const nuxt = await loadNuxt(dev ? 'dev' : 'start')
  const server = createServer()

  if (dev) { build(nuxt); }

  corrosion.bundleScripts();

  server.on('request', (req, res) => {
    req.url.startsWith('/fetch') ? corrosion.request(req, res) : nuxt.render(req, res);
  })

  server.on('upgrade', corrosion.upgrade);

  server.listen(3000, (err) => {
    if (err) { throw err; }
    /* eslint-disable no-console */
    console.log('\u001B[36mi\u001B[0m Server listening on port 3000');
  })
})()
