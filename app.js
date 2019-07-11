const express = require('express');
const mongoose = require('mongoose');



const dev_db_url = 'mongodb://test-user:restart987@ds017852.mlab.com:17852/heroku_xttflwq1';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// const path = require('path');
// // Serve static files from the React frontend app
// app.use(express.static(path.join('client/build')));
// // Anything that doesn't match the above, send back index.html
// app.get('*', (req, res) => {
//   res.sendFile(path.join('/client/build/index.html'))
// });

require('./models/task.model');

require('./routes/task.route')(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});