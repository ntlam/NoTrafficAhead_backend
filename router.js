//set variables for environment
var express = require('express');
var app = express();
var path = require('path');
var http = require('http');
var server = http.createServer(app);
var mongoose = require('mongoose');
var bodyParser = require('body-parser')

app.use(bodyParser.json())


//Set server port
server.listen(2000);

server.listen(app.get('port'), function () {
    console.log('Express server running, listening on port ' + server.address().port);
});

mongoose.connect('mongodb://nta_admin_user:Avo-R2V-rK4-79e@ds031872.mongolab.com:31872/nta_resource_guide');

mongoose.connection.on('connected', function () {
    console.log('Mongoose connected.');
});


app.post('/newResource', function(request, response){
	//Posts new resource to the TEMPORARY database for approval by admin.
	//No auth requirements here.
	console.log("POST /newResource called.");

	var Schema = mongoose.Schema;
	//bring in the mongo schema. 
	var resourceSchema = new Schema({resourceBody:{}}, {strict:false});
	//Create model based on schema. Third argument is collection name- PLURALIZE in DB, or mongoose will pluralize for you (problems??)..!
	var ResourceModel = mongoose.model('newResource', resourceSchema, 'nta_guide_preApprovals');
	var guideEntry = new ResourceModel();
	
 	console.log(request.body.resourceBody);


	guideEntry.resourceBody = request.body.resourceBody;
	//guideEntry.markModified('resourceBody');
	
	guideEntry.save(function(err) {
	       console.log("New Resource CREATED");
	       console.log(guideEntry.resourceBody);
	});
	
});