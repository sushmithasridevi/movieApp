var path = require('path');
var webpack = require('webpack');
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config');
var index = require('./webserver/routes/index');
var users = require('./webserver/routes/users');
var app = express();
var passport = require('passport');
var LocalStrategy=require('passport-local').Strategy;
var user=require('./webserver/routes/loginSchema');
app.use(passport.initialize());
app.use(passport.session());
var compiler = webpack(config);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', express.static(path.join(__dirname, './webclient/')));
//Mongoose
var db = 'mongodb://localhost/test';
mongoose.connect(db);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("connnected with mongo");
});
//Ruotes
app.use('/home', index);
app.use('/stream',users);
//   });
  app.post('/login',
  passport.authenticate('local'),function(req,res) {
    console.log("hiii");
    console.log("hahuhs"+req.user.username);
    //res.send({'data':'logged in sucessfully'})
    //res.redirect('/users/' + req.user.username);
  });

  passport.use(new LocalStrategy(
    function(username,password, done) {
      user.findOne({ "username":username }, function(err, user) {
        if (err) {
          console.log(username);
          return done(err); }
        if (!user) {
          return done(null, false);
        }
        if (!user.validPassword(password)) {
          return done(null, false);
        }
        return done(null, user);
      });
    }
  ));
app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    stats: {
        colors: true
    },
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
}));

app.use(webpackHotMiddleware(compiler));
//Listening to port 8081
app.listen(8080, '0.0.0.0', function(err, result) {
    if (err) {
        console.error("Error ", err);
    }

    console.log("Server started at 8080");
});
