var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev');

var app = express();
var compiler = webpack(config);

var port = 3000;

var fs = require('fs'),
	filepath = __dirname + '/users.json',
	bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); // manipulate POST

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride(function(req, res){
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
      }
}));

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

// app.get('*', function (req, res) {
//     res.sendFile(path.join(__dirname, 'index.html'));
// });

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/realtime/show', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/realtime/show/data', function(req, res) {
	var min = 0, max = 999;
	var randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
	console.log(randomNum)
    res.send(randomNum.toString());
});

//get all users
app.get('/users', function(req, res) {
    fs.readFile(filepath, 'utf8', function (err, data) {
	  	if (err) {
	  		res.send(err);
   	  	}
   	  	//console.log(data);
	  	res.json(data);
	});
})

//add a user
app.post('/users/new', function(req, res) {
	console.log('post hit');
	console.log(req.body);
	console.log(req.body.id);
	console.log(req.body.firstName);
	console.log(req.body.lastName);

    var user = { 
    	id: req.body.id, 
    	firstName: req.body.firstName, 
    	lastName: req.body.lastName 
    };

  	fs.readFile(filepath, 'utf8', function (err, data) {
       	if (err) {
	  	    res.send(err);
	    }

        var users;

        try{
            users = JSON.parse(data);
        } catch(e){
            res.send(e);
        }

		//
		if (users == null) {
			users = [];
		}
		//not zero (no same key) is true so push it
		if(!users.filter((user) => {
    		return user.id === req.body.id;
		}).length) {
    		users.push(user);
		} else {
			console.log('User ID already Exists');
		}
		// console.log(users);
		// if(users.filter((user) => {return user.id === req.body.id;}).length) {
  //   		console.log('User already Exists');
  //   		console.log(users);
		// } else {
		// 	users.push(user);
		// }
		
        fs.writeFile(filepath, JSON.stringify(users), function (err) {
            if(err) {
                res.send(err);
            }
      	});

      	res.json(users);
  	});
});

//delete a user by ID
app.delete('/users/:id', function (req, res) {
	console.log('delete hit');
	console.log(req.params.id);
   	var id = req.params.id;

	fs.readFile(filepath, 'utf8', function (err, data) {
        if (err) {
	  	    res.send(err);
	    }

	   	var users;

	   	try {
            users = JSON.parse(data);
        } catch(e){
            res.send(e);
        }
		
		//
    	users = users.filter((user) => {return user.id !== id});

	    fs.writeFile(filepath, JSON.stringify(users), function (err) {
            if(err) {
                res.send(err);
            }
      	});
		
		res.json(users);
    });
});

//put update a user by ID
app.put('/users/:id', function(req, res) {
	console.log('put hit');
   	var id = req.params.id;
   	var newId = req.body.id;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
  console.log(id);
	console.log(newId);
	console.log(firstName);
  console.log(lastName);

	fs.readFile(filepath, 'utf8', function (err, data) {
        if (err) {
	  	    res.send(err);
	    }

	   	var users;

	   	try {
            users = JSON.parse(data);
        } catch(e){
            res.send(e);
        }
		
		//
		if(!users.filter((user) => {
    		return user.id === newId;
		}).length) {
    		users.forEach(function(user) { if (user.id === id) {user.id = newId; user.firstName = firstName; user.lastName = lastName;} });
		} else {
			console.log('User ID already exist');
		}

	    fs.writeFile(filepath, JSON.stringify(users), function (err) {
            if(err){
                res.send(err);
            }
      	});
		
		res.json(users);
    });
});


app.listen(port, function onAppListening(err) {
    if (err) {
        console.error(err);
    } else {
        console.info('==> 🚧  Webpack development server listening on port %s', port);
    }
});
