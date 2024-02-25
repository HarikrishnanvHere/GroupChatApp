let express = require('express');
let bodyParser = require('body-parser');
let dotenv = require('dotenv');
let cors = require('cors');

dotenv.config();

let app = express();
app.use(cors());

let sequelize = require('./database');

app.use(bodyParser.json({extended: true}));

let userRoutes = require('./routes/user');
let chatRoutes = require('./routes/chat');

app.use('/user', userRoutes);
app.use('/chat', chatRoutes);


sequelize.sync({})
.then((result)=>{
    app.listen(process.env.PORT || 3000)
})
.catch(err=>console.log(err));