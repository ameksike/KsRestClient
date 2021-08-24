KsWc is a simple library to make your Web API deployment easier, with it you can operate with [REST](https://en.wikipedia.org/wiki/Representational_state_transfer) API as a local library in your project, focused on the [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) pattern implemented by RESTful services, and support of different automated authentication flows. 

### Get started
1. Install
```npm
npm install kswc
```
2. Load
```js
const srvAPI = require('kswc');
```
3. [Simple example](https://github.com/ameksike/kswc/wiki/Simple-example)

### Common topics
1. [Operations](https://github.com/ameksike/kswc/wiki/Operations)
2. [Configuration](https://github.com/ameksike/kswc/wiki/Configuration)
3. [Asynchronous and Synchronous](https://github.com/ameksike/kswc/wiki/Asynchronous)

### Advanced topics
1. [Different Service Instances](https://github.com/ameksike/kswc/wiki/Instances)
2. [Authorization](https://github.com/ameksike/kswc/wiki/Authorization)

### Example

```js
(async function(data){

    const service = require('kswc');
    
	service.set({
		url: 'https://api.domain',
		end: '/api/service',
		key: 'MTYyOTQ5NjMxMDIDMwM24MDAwNjkzMjQ2NQ==',
	});

    data = await service.list();

    for(let item of data){
        console.log('<<', item.name);
    }

    data = await service.select('3kmkskw1x8o'); 
    data = await service.insert({ name: "Juan" });
    data = await service.update({ name: "Mary" }, '3kmkskw1x8o');    
    data = await service.delete('3kmkskw1x8o');

    console.log('>>', data);

})();
```