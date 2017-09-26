
	// Node module imports 
	var keys = require("./keys.js");
	var request = require("request");
	var twitter = require("twitter");
	var Spotify = require ("node-spotify-api");
	var fs = require("fs"); // Load the fs package to read and write
	//var twitterKeys = keys.twitterKeys;
	var action = process.argv[2];
	var value = process.argv[3];
	
	// The switch-case will direct which function gets run.
	switch(action) {
		case "my-tweets": 
			myTweets(); 
			break;
		case "spotify-this-song":
			spotifyThisSong(); 
			break;
		case "movie-this":
			movieThis();
			break;
		case "do-what-it-says":
			doWhatItSays();
			break;
		};
// Defining functions		
//---------------------------------------------------------		
function myTweets() {
	var client = new twitter(keys);
		/*{
		consumer_key: twitterKeys.consumer_key,
		consumer_secret: twitterKeys.consumer_secret,
		access_token_key: twitterKeys.access_token_key,
		access_token_secret: twitterKeys.access_token_secret
	});*/
	var twitterUserName = process.argv[3];
	if(!twitterUserName){
			twitterUserName = "lbjfansforever1";
		}
	var params = {screen_name: twitterUserName, count: 20};
	console.log(params);
	client.get('statuses/user_timeline', params, function(error, tweets, response){
		if (!error) {
			
	            for (var i=0; i<tweets.length; i++) {
	            	console.log("******************************************************************************************************");
			        console.log(tweets[i].created_at);
			        console.log(tweets[i].text);
			        console.log("******************************************************************************************************");}
			        log (tweets);
				            
	         }else{
					console.log("Error: " + error[0].message);
					return;
		}
	});

};// myTweets function ends

//lbjfansforever1
//---------------------------------------------------------
function movieThis(){
	var movie = process.argv[3];
	if(!movie){
			movie = "mr nobody";
		}
	request("http://www.omdbapi.com/?t="+ movie + "&y=&tomatoes=true&r=json&plot=short&apikey=40e9cece", function(error, response, body) {

  // If the request is successful (i.e. if the response status code is 200)
  	if (!error && response.statusCode === 200) {
	
				 
					 var movieData= JSON.parse(body);
					 console.log("******************************************************************************************************");
			         console.log("Title: " + movieData.Title);
			         console.log("Year: " + movieData.Year);
			         console.log("IMDB Rating: " + movieData.imdbRating);
			         console.log("Country: " + movieData.Country);
			         console.log("Language: " + movieData.Language);
			         console.log("Plot: " + movieData.Plot);
			         console.log("Actors: " + movieData.Actors);
			         console.log("Rotten Tomatoes Rating: " + movieData.tomatoRating);
			         console.log("******************************************************************************************************");
			         log (movieData);
				 }else{
					console.log("Error :"+ error);
					return;
		}
	});
};// end movieThis function
//---------------------------------------------------------
function spotifyThisSong(value){
	var spotify = new Spotify({id: "40ac70ed964748cd9ce2659f048ce6bd", secret: "87cbef5330b74882a41912bb8d5fb981"});
	var songName = process.argv[3];
	if(!songName){
			songName = "What's my age again";
		}     
	spotify.search({ type: 'track', query: songName }, function(error, data) {
		if (!error) {
						    
					 var data = data.tracks.items[0];
					 console.log("******************************************************************************************************");
					 console.log("Artist: " + data.artists[0].name);
				     console.log("The song's name : " + data.album.name);
				     console.log("Album the song is from : " + data.name);
				     console.log("Preview link : " + data.preview_url);
				   	 console.log("******************************************************************************************************");
				   	 log (data);
				} else {
					 console.log("Error :"+ error);
					 return;
		}

    });
}; // end spotifyThisSong function   
//---------------------------------------------------------
function doWhatItSays() {
		fs.readFile("random.txt", "utf8", function(error, data){
			if (!error) {
				var text = data.split(",");
				spotifyThisSong(text[0], text[1]);
			} else {
				console.log("Error :" + error);
			}
		});
	}; // end doWhatItSays function
//----------------------------------------------------------	
	function log(logResults) {
	  fs.appendFile("log.txt", JSON.stringify(logResults, null, 2), (error) => {
	    if(error) {
	      throw error;
	    }
	  });
	};//log function ends
	
		