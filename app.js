// app.js
const express = require('express')
const app = express()
const port = 3000

app.use(function (req, res, next) {
  const date = new Date(Date.now())
  const start = process.hrtime()
  const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  const reqType = req.method
  const reqURL = req.url
  const serverLog = `${dateString} | ${reqType} from ${reqURL}`
  res.on('finish', () => {
    const durationInMilliseconds = getDurationInMilliseconds(start)
    console.log(`${serverLog} | ${durationInMilliseconds.toLocaleString()} ms`)
  })
  next()
})

app.get('/', (req, res) => {
  res.send('列出全部 Todo')
})

app.get('/new', (req, res) => {
  res.send('新增 Todo 頁面')
})

app.get('/:id', (req, res) => {
  res.send('顯示一筆 Todo')
})

app.post('/', (req, res) => {
  res.send('新增一筆  Todo')
})

app.listen(port, () => {
  console.log(`App running on port ${port} `)
})

const getDurationInMilliseconds = (start) => {
  const NS_PER_SEC = 1e9
  const NS_TO_MS = 1e6
  const diff = process.hrtime(start)

  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS
}
