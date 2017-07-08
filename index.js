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
		console.log(imgs)
		res.send({'imgs':imgs});
	});
	
})

app.listen(3000, ()=>console.log('listening on port 3000'));
