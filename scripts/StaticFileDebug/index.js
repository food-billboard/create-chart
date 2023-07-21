const Koa = require('koa')
const Cors = require('koa-cors')
const KoaStatic = require('koa-static')
const path = require('path')
const chalk = require('chalk')

const app = new Koa()

app
.use(Cors())
.use(KoaStatic(path.resolve(process.cwd(), 'dist'), {
  setHeaders: (res, path, stats) => {},
  extensions: true,
  maxage: 1000 * 60 * 60 * 24,
  gzip: true
}))

app.listen( process.env.PORT || 4002, () => {
  console.log(chalk.bgCyan('Koa Server is run in port 4002'))
})

module.exports = app