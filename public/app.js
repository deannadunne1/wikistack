const express = require('express')
const app = express()
const morgan = require('morgan')
const layout = require('../views/layout.js')
const PORT = 3000
const { db, Page, User } = require('../models');
const userRoutes = require('../routes/user.js')
const wikiRoutes =  require('../routes/wiki.js')

app.use(morgan('dev'))

app.use(express.static(__dirname + '/public'))

app.use(express.urlencoded({ extended: false }));
//const bodyParser = require('body-parser')

db.authenticate().
then(() => {
  console.log('connected to the database');
})

app.use('/wiki', wikiRoutes)
app.use('/user', userRoutes)





app.get('/', (req, res) => {
    let log = console.log("hello world")
    let page = layout("");
//    res.send('page');
    res.redirect('/wiki')

})

const init = async () => {
    try{
        await Page.sync();
        await User.sync();
        await db.sync();

        app.listen(PORT, () => {
            console.log(`App listening in port ${PORT}`)
        })

    }catch(e) {
        console.log('Not working', e)
    }
}

init();

