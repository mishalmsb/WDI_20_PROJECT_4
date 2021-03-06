var express         = require('express');
var cors            = require('cors');
var path            = require('path');
var morgan          = require('morgan');
var bodyParser      = require('body-parser');
var mongoose        = require('mongoose');
var passport        = require('passport');
var cookieParser    = require("cookie-parser");
var methodOverride  = require("method-override");
var jwt             = require('jsonwebtoken');
var expressJWT      = require('express-jwt');
var app             = express();
var config          = require('./config/config');
var User            = require('./models/user');
var secret          = require('./config/config').secret;
var online          = [];
var onlineUsers     = [];
var onlineUserId    = null;

// var User = require('./models/user');
// User.collection.drop();
//

mongoose.connect(config.database);

require('./config/passport')(passport);

app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors());
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + "/bower_components"));
app.use(passport.initialize());

app.use('/api', expressJWT({ secret: secret })
  .unless({
    path: [
      { url: '/api/login', methods: ['POST'] },
      { url: '/api/register', methods: ['POST'] }
    ]
  }));

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({message: 'Unauthorized request.'});
  }
  next();
});

var routes = require('./config/routes');
app.use("/api", routes);

var io = require('socket.io').listen(app.listen(config.port));

io.on('connection', function(socket){
    //console.log('a user connected');

    socket.on('onlineUser', function(user) {
      if (user) {
        onlineUserId = user._id;
        socket.userId = user._id;
        if (onlineUsers.indexOf(user._id) == -1) {
          onlineUsers.push(socket.userId);
        }
      }
      io.sockets.emit('onlineUser' , onlineUsers);
    })

    socket.on('chat message' , function(data) {

        io.emit('chat message' , data);
        //socket.broadcast.emit('chat message' , data);
        //socket.broadcast.emit('chat message', data);
    });

    socket.on('room', function(data) {
      socket.join(data.room);
      io.sockets.in(data.room).emit('message', data);
    });

    socket.on('logOut', function(data) {
        var index = onlineUsers.indexOf(data._id);
        if (index > -1) {
            onlineUsers.splice(index, 1);
        }
        io.sockets.emit('onlineUser' , onlineUsers);
    });


    socket.on('disconnect', function(data){
      //console.log(socket.userId);
      var index = onlineUsers.indexOf(socket.userId);
      if (index > -1) {
          onlineUsers.splice(index, 1);
      }
      io.sockets.emit('onlineUser' , onlineUsers);
      //console.log('user disconnected');
    });



});
