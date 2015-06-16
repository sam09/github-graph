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
  			res.writeHead(200, {'Content-Type': 'text/plain'});
  			res.write("UserRepos\tStars\tForks\tWatchers\n")
  			info = JSON.parse(body);
  			for(var i =0 ; i<info.length; i++) {
  				console.log(info[i]["name"]);
  				res.write(info[i]["name"] + "\t");
  				res.write(info[i]["stargazers_count"] + "\t");
  				res.write(info[i]["forks_count"] + "\t");
  				res.write(info[i]["watchers_count"] + "\n");	
  			}
  			res.end("\n");
  		}
  		if(error)
  			console.log("error");
	})
});

module.exports = router;
