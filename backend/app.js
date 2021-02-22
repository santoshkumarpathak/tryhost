let express = require('express'),
  path = require('path'),
  mongoose = require('mongoose'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  dataBaseConfig = require('./database/db');

// Connecting mongoDB
mongoose.Promise = global.Promise;
mongoose.connect(dataBaseConfig.db, {
  useNewUrlParser: true,
  useFindAndModify: false
}).then(() => {
    console.log('Database connected sucessfully => app.js ');
  },
  error => {
    console.log('Could not connected to database : ' + error + '=> app.js');
  }
)

// Set up express js port
const studentRoute = require('./routes/student.route')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors());

// Setting up static directory
app.use(express.static(path.join(__dirname, 'dist/angular8-meanstack-angular-material')));


// RESTful API root
app.use('/api', studentRoute)

// PORT
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log('Connected to port ' + port)
  console.log("server conection>app.js")
})

// Find 404 and hand over to error handler
app.use((req, res, next) => {
  next(createError(404));
  console.log("Find 404 and hand over to error handler=> api.js")
});

// Index Route
app.get('/', (req, res) => {
  res.send('invaild endpoint');
  console.log("Index Route => app.js");
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/angular8-meanstack-angular-material/index.html'));
  console.log("app.get=> * index rout=> app.js")
});


// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
  console.log("error handling => app.js")
});
