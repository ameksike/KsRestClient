const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = {
	protocol: 'http',
	host: '127.0.0.1',
	port: process.env.PORT || 3333,
	www: null,
	srv: null
};

app.start = () => {
	try {
		if (app.www) return app;
		app.www = express();
		app.www.use(bodyParser.json());
		app.www.use(cors());
		app.www.use(bodyParser.urlencoded({
			extended: false
		}));

		app.www.post('/auth/basic', (req, res, next) => {
			res.json({
				auth: {
					token: 'MTYyOTQ5NjMxMDI0MDpkZGE5NjVjM2VmNDMwM2I4Njc2YzU4MDAwNjkzMjQ2NQ=='
				},
				metadata: {
					body: req.body,
					path: req.path,
					param: req.query,
					params: req.params,
					method: req.method,
					header: req.headers
				}
			});
		});
		
		app.www.post('/oauth/client/credential', (req, res, next) => {
			res.json({
				"metadata": {
					body: req.body,
					path: req.path,
					param: req.query,
					params: req.params,
					method: req.method,
					header: req.headers
				},
				"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVkZW50aWFsSWQiOiIxNDQ2Mjk5YTIxM2MwOTcwNzNjZDU2NTFkMTMzM2Q1MiIsImlkIjoiZTI5MzE5MjAtZTQwMi0xMWVhLWEzMGQtODNjOTc4YTc0YWFhIiwiaWF0IjoxNjMwMTk0NTQ5LCJleHAiOjE2MzAxOTQ2MzV9.k4q2GpU6E_T1_XqbALIuMquJ2Qborn5H7D9EBQOH3vM",
				"refresh_token": "TTMzMzM6OTgzM2Q5ZjJmZjI1ODFiMjgxMmQzYTU2NWEyM2M3YjA=",
				"token_type": "Bearer",
				"expires_in": 1630194635,
				"scope": "read write"
			});
		});
		
		app.www.all('*', (req, res, next) => {
			res.json({
				metadata: {
					body: req.body,
					path: req.path,
					param: req.query,
					params: req.params,
					method: req.method,
					header: req.headers
				}
			});
		});

		app.srv = app.www.listen(() => {
			//console.log('<<<', `http://localhost:${app.port}`);
		});

		app.srv.on('error', (e) => {
			if (e.code === 'EADDRINUSE') {
				console.log('Address in use, retrying...');
				setTimeout(() => {
					app.srv.close();
					app.srv.listen();
				}, 1000);
			}
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

app.url = () => {
	if (app && app.srv) {
		const srvInfo = app.srv.address();
		app.port = srvInfo.port;
		app.host = srvInfo.family === "IPv6" ? '127.0.0.1' : srvInfo.address;
		const url = `${app.protocol}://${app.host}:${app.port}`;
		return url;
	}
	return '';
}
module.exports = app;