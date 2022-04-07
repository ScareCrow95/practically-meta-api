import express, { json } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import multer from 'multer'
import { exec } from 'child_process'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage: storage })

const morgan = require('morgan')
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(helmet())
app.use(cors())
app.use(morgan('dev'))
app.use(json())

const port = 5000

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

app.get('/', (req, res) => {
  res.send('shorturl.at/hqCK0')
})

app.post('/upload', upload.single('file'), function (req, res) {
  console.log(req.file.originalname)

  exec(
    `./exec.sh ../images/${req.file.originalname}`,
    (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`)
        return
      }
      console.log(`[EXEC COMMAND] stdout: ${stdout}`)
      exec('rm ./images/*', (err, out, serr) => {
        res.json(JSON.stringify(stdout))
      })
    }
  )
})
