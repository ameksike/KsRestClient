KsWc is a simple library to make your Web API deployment easier, with it you can operate with [REST](https://en.wikipedia.org/wiki/Representational_state_transfer) API as a local library in your project, focused on the [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) pattern implemented by RESTful services, and support of different automated authentication flows. 

This library belong to the **Ksike** ecosystem:
- [KsMf](https://www.npmjs.com/package/ksmf) - Microframework (WEB, REST API, CLI, Proxy, etc)
- [Ksdp](https://www.npmjs.com/package/ksdp) - Design Patterns Library (GoF, GRASP, IoC, DI, etc)
- [KsCryp](https://www.npmjs.com/package/kscryp) - Cryptographic Library (RSA, JWT, x509, HEX, Base64, Hash, etc) 
- [KsHook](https://www.npmjs.com/package/kshook) - Event Driven Library
- [KsEval](https://www.npmjs.com/package/kseval) - Expression Evaluator Library 
- [KsWC](https://www.npmjs.com/package/kswc) - Web API deployment Library

### Get started
1. Install
```
npm install kswc
```
2. Load
```js
const srvAPI = require('kswc');
```
3. [Simple example](./simple.example.md)

### Common topics
1. [Operations](https://github.com/ameksike/kswc/wiki/Operations)
2. [Configuration](./configuration.md)
3. [Asynchronous and Synchronous](./asynchronous.md)

### Advanced topics
1. [Different Service Instances](./instances.md)
2. [Authorization](./authorization.md)
3. [Multi endpoints](./multiendpoints.md)
4. [Extension](./extension.md)

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