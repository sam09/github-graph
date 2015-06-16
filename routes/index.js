var express = require('express');
var router = express.Router();
var request = require("request");

var options = {
  url: 'https://api.github.com/',
  headers: {
    'User-Agent': 'request'
  }
};

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Github Graph' });
});

router.post('/graph', function(req, res) {

	var username = req.body.username;
	url = "https://api.github.com/users/" + username + "/repos";
	console.log(url);
	options.url = url;
	var info = null;

	request(options, function (error, response, body) {
  		if (!error && response.statusCode == 200 ) {
  			 info = JSON.parse(body);
  			var new_info = [];
  			for(var i =0 ; i<info.length; i++) {
  				if(info[i]['fork'] == false )
  					new_info.push(info[i]);
  			}
  			res.render('graph', {title: "Repo Stats", info: new_info });
  		}
  		if(error)
  			console.log("error");
	})
});

module.exports = router;
