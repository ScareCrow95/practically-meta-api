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
  res.json({
    Cheeks_Puff: 0.35,
    Eye_asian: 0.344,
    Eyebrow_Uni: 0.04,
    Eyebrow_thin: 0.09,
    Mouth_size: 0.43,
    Nose_Fat: 0.8698,
    Nose_size: 0.5488,
  })
  //   exec(
  //     `source /home/ankush/flask_env/bin/activate && python3 ./scripts/infer.py ./images/${req.file.originalname}`,
  //     (error, stdout, stderr) => {
  //       if (error) {
  //         console.log(`error: ${error.message}`)
  //         return
  //       }
  //       if (stderr) {
  //         console.log(`stderr: ${stderr}`)
  //         return
  //       }
  //       console.log(`stdout: ${stdout}`)
  //       exec('rm ./images/*', (err, out, serr) => {
  //         res.json(JSON.stringify(stdout))
  //       })
  //     }
  //   )
})
