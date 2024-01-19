The operations that can be performed with this library are those defined by the [REST](https://en.wikipedia.org/wiki/Representational_state_transfer) standard that is in tune with the implementation of the [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) design pattern, there are several frameworks that are designed for this purpose, such is the case of [KsMf](https://github.com/ameksike/ksmf/wiki). In general, the fundamental actions of a CRUD are those listed below:
 
```
-----------------------------------------------------
 METHOD | URL PATH             | CONTROLLER ACTION
-----------------------------------------------------
 GET      /prefix/resource        Controller::list
 GET      /prefix/resource/:id    Controller::select
 POST     /prefix/resource        Controller::insert
 PUT      /prefix/resource/:id    Controller::update
 PATCH    /prefix/resource/:id    Controller::update
 DELETE   /prefix/resource/:id    Controller::delete
 DELETE   /prefix/resource        Controller::clean
 -----------------------------------------------------
```

Consequently, with those expressed above, the main methods would be: 
```js
const srvAPI = require('kswc');

srvAPI.set({
    url: 'https://api.custom.com',
    end: '/api/person'
});
```
## Basic 
```js
const list = await srvAPI.list();
```

```js
data = await srvAPI.select('82113031705'); 
```

```js
data = await srvAPI.insert({ name: "Juan" });
```

```js
data = await srvAPI.update({ name: "Lucy" }, '82113031705');    
```

```js
data = await srvAPI.delete('82113031705');
```

## Alias
```js
const list = await srvAPI.list();
const list = await srvAPI.get();
```

```js
data = await srvAPI.insert({ name: "Juan" });
data = await srvAPI.add({ name: "Juan" });
```

## Others
```js
srvAPI.set({
    url: 'https://api.custom.com',
    end: '/api/person'
});
```

```js
const token = await srv.connect({ oauth: {
	grant_type: 'client_credentials',
	client_id: '5d6fd52d1796bd41632099cb5444b7f6',
	client_secret: 'b4ffbdb0e2c9efb45d5963370c2381a5',
	url_access: 'http://localhost:3001/api/v2/access/token',
	scope: 'read write',
}});
```
