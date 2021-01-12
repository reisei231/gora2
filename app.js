const express        = require('express');
const bodyParser     = require('body-parser');
const app            = express();
const port = 8000;

const Bot = require('./Bot');

app.use(bodyParser.urlencoded({ extended: true }));
app.listen(port, () => {
  console.log('We are live on ' + port);
});

app.post('/start', (req, res) => {
	try{
		global.bot = new Bot(req.body.login, req.body.password);
		console.log("Запускается бот с логином ",req.body.login)
		res.send("OK")
	}
	catch (e) {
		res.send("Fail")
		console.log(e)
	}
	
});

app.post('/invite', (req, res) => {
	try {
		global.bot.addFriend(req.body.steam_id);
	}
	catch (e) {
		if ( e instanceof TypeError) {
			res.send("Бот еще не запущен")
		}
		res.send("Fail")
		console.log(e)
	}
	res.send("OK");
	console.log(req.body);
});

app.post('/sendMessage', (req, res) => {
	try {
		global.bot.sendMessage(req.body.steam_id, req.body.msg);
	}
	catch (e) {
		if ( e instanceof TypeError) {
			res.send("Бот еще не запущен")
		}
		res.send("Fail");
		console.log(e)
	}
	res.send("Success");
});