const express = require('express');
const bodyParser = require('body-parser');
var fs = require('fs');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(3000, () => console.log('Webhook server is listening, port 3000'));

eval(fs.readFileSync('gymlund.js')+'');

app.get('/', function (req, res) {
	const hubChallenge = req.query['hub.challenge'];
	const hubMode = req.query['hub.mode'];
	const verifyTokenMatches = (req.query['hub.verify_token'] === 'gymlund');
	if (hubMode && verifyTokenMatches) {
		res.status(200).send(hubChallenge);
	} else {
		res.status(403).end();
	};
})

app.post('/', function(req, res) {
	if (req.body.object === 'page') {
		console.log(req.body.entry);
		req.body.entry.forEach(entry => {
			entry.messaging.forEach(event => {
				if (event.message && event.message.text) {
					processMessage(event);
				}else if (event.message && event.message.attachments) {
					
				};
			});
		});
	res.status(200).end();
	}
});

const FACEBOOK_ACCESS_TOKEN = '[Place for facebook access_token]';
const request = require('request');
function sendTextMessage(senderId, text) {
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: { access_token: FACEBOOK_ACCESS_TOKEN },
		method: 'POST',
		json: {
			recipient: { id: senderId },
			message: { text },
		}
	});
};
var storedval = [];
function processMessage(event){
	console.log(event);
	const senderId = event.sender.id;
	var message = event.message.text;
	var checkforcommand = message.split('');
	if(checkforcommand.length == 2){
		if(!global.storedval || global.storedval.length == 0){
			console.log('Hittade inget som är sparat...');
		}else{
			if(checkforcommand[0] == '!'){
				var number = parseInt(checkforcommand[1]);
				if(number == ''){}else{
					var index = (number - 1);
					console.log(index);
					var gyminfo = global.storedval[index];
					console.log(gyminfo);
					if(gyminfo.exraid){
						var ps = ' (EX-raid gym!)';
					}else{
						var ps = '';
					};
					var messagetosend = '"' + gyminfo.namn + '"' + ps + ' hittar du med följande länk: http://maps.google.com/?q=' + gyminfo.location.longitud + ',' + gyminfo.location.latitud;
					sendTextMessage(senderId, messagetosend);
				};
			};
		};
	}else{
		var messagesplit = message.split('"');
		var messagetosend = 'false';
		var messagearray = [];
		if(messagesplit.length == 3){
			for (var a = gyms.length - 1; a >= 0; a--) {
				if(gyms[a].namn.toLowerCase().startsWith(messagesplit[1].toLowerCase())){
					console.log(gyms[a].namn)
					messagearray.push(gyms[a]);
					//messagetosend = 'Ursäkta om jag tränger mig på, men kunde inte missa att höra att ni pratar om ' + gyms[a].namn + '. Om du inte vet var den finns använd följande länk: http://maps.google.com/?q=' + gyms[a].location.longitud + ',' + gyms[a].location.latitud;
				};
			}
		};
		if(messagearray.length == 1){
			if(messagearray[0].exraid){
				var ps = ' (EX-raid gym!)';
			}else{
				var ps = '';
			};
			messagetosend = 'Ursäkta om jag tränger mig på, men kunde inte missa att höra att ni pratar om "' + messagearray[0].namn + '"' + ps + '. Om du inte vet var den finns använd följande länk: http://maps.google.com/?q=' + messagearray[0].location.longitud + ',' + messagearray[0].location.latitud;
		}else if(messagearray.length == 0){

		}else{
			var questiontext = '';
			global.storedval = messagearray;
			for (var i = 0; i < messagearray.length; i++){
				var questiontext = questiontext + '\n' + (i + 1) + '. ' + messagearray[i].namn;
			}
			messagetosend = 'Ursäkta om jag tränger mig på, men kunde inte missa att höra att ni pratar om gym. Vilken av följande gym pratar ni om?' + questiontext + '\nOm du vill veta var gymmet är skriv då "!" och nummer (exempel !1).';
		}
		if(messagetosend == 'false'){}else{
			sendTextMessage(senderId, messagetosend);
		};
		console.log('Text: ' + message + ' (' + senderId + ')');
	};
};