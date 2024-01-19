If necessary, multiple endpoints can be defined, which share the same configuration, including authentication options. To get this, the **'end'** property must be specified as an object, where each property defines a different endpoint and can be accessed by the same name of the property that identifies it.

### Simple example
```js
const srv = require('kswc');
srv.set({
	url: app.url(),
	end: {
		default: '/api/person',
		address: '/api/address',
		work: '/api/work'
	}
});

const dataDefault = await srv.list();
const dataAddress = await srv.address.select(4566);
const dataWork = await srv.work.insert({ 
	name: 'SON',
	personId: dataDefault[0].id,
	address: dataAddress.name
});
```
Keep in mind the default path is mandatory otherwise you will have an error. Notice in the previous example how the call of the list operation is made directly from the object of the lib *'srv.list()'* being similar to *'srv.default.list()'*. 

### Auth
```js
const srv = require('kswc');
srv.set({
	url: app.url(),
	end: {
		default: '/api/person',
		address: '/api/address',
		work: '/api/work'
	}, 
	basic: {
		client_id: 'my.username.plain',
		client_secret: 'my.password.plain',
		url_access: 'https://auth.custom.com/api/access/login'
	}
});

const token = await srv.connect();

const dataDefault = await srv.default.list();
const dataAddress = await srv.address.select(4566);
const dataWork = await srv.work.insert({ 
	name: 'SON',
	personId: dataDefault[0].id,
	address: dataAddress.name
});
```
Notice how in the previous example the authentication is required only once and all the endpoints use the same access token. For a better understanding of the authentication options, see the [following section](https://github.com/ameksike/kswc/wiki/Authorization).  