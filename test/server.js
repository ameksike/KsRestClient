const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = {};

app.host = '127.0.0.1';
app.port = process.env.PORT || 3333;
app.url = `http://${app.host}:${app.port}`;

app.start = () => {
	try {
		if(app.www) return app;
		app.www = express();
		app.www.use(bodyParser.json());
		app.www.use(cors());
		app.www.use(bodyParser.urlencoded({
			extended: false
		}));

		app.www.all('*', (req, res, next) => {
			res.json({
				body: req.body,
				path: req.path,
				param: req.query,
				params: req.params,
				method: req.method,
				header: req.headers
			});
		});

		app.srv = app.www.listen(app.port, () => {
			//console.log('<<<', `http://localhost:${app.port}`);
		});

		return app;

	} catch (error) {
		console.log('<<<', error.message);
		return null;
	}
};

app.stop = () => {
	if (app && app.srv && app.srv.close) {
		app.srv.close();
		delete app.www;
	}
}

module.exports = app;