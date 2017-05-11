const fs = require('fs');
const path = require('path');
const http = require('http')
const express = require('express');
const app = express();

app.use('/',express.static('build'));

app.get('/imgList',function(req,res){
	var p = path.join(__dirname,'build/images/thumbnails')
	
	fs.readdir(p, function(err,files){
		var imgs = [];

		for(let i=0; i< files.length; i++){
			if (fs.statSync(p + '/' + files[i]).isFile()){
				imgs.push(files[i]);
			}
		}
		res.send({'imgs':imgs});
	});
	
})

http.createServer(app).listen(80);
console.log('listening')

//app.listen(3000, ()=>console.log('listening on port 3000'));


/*
use this for http request
{
	Japan2016: [],
	SF: [],
	LA: [],
	Japn2017: []

}


 */