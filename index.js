const express = require('express')
const { useStore } = require('vuex')
const app = express()
const mysql = require('mysql')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')

const db = mysql.createPool({
    host: 'us-cdbr-east-06.cleardb.net',
    user: 'b55b54d996426f',
    password: 'c3cee916',
    database: 'heroku_88940b006fcfea1'
})

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname + "/public")))
app.use(bodyParser.urlencoded({extended: true}))
const PORT = process.env.PORT

app.post('/api/insert', (req, res) => {

    const InputGrade = req.body.InputGrade
    const InputName = req.body.InputName 
    const InputComment = req.body.InputComment

    const sqlInsert = 
        "INSERT INTO ratings (create_time, grade, name, commentaire) VALUES (NOW(), ?, ?, ?);"
    db.query(sqlInsert, [InputGrade, InputName, InputComment], (err, result) => {
        console.log(result)
    })
})

app.listen(PORT)