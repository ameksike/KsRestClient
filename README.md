# KsRestClient
Simple library to operate with REST API as a local library in your project. For more information see our [wiki](https://github.com/ameksike/ks-rest-client/wiki). 


### Get started
1. Install
```npm
npm install ks-rest-client
```
2. Load
```js
const srvAPI = require('ks-rest-client');
```
3. [Simple example](https://github.com/ameksike/ks-rest-client/wiki/Simple-example)

### Common topics
1. [Configuration](https://github.com/ameksike/ks-rest-client/wiki/Configure)
2. [Asynchronous and Synchronous](https://github.com/ameksike/ks-rest-client/wiki/Asynchronous)

### Advanced topics
1. [Different Service Instances](https://github.com/ameksike/ks-rest-client/wiki/Instances)
2. [Authorization](https://github.com/ameksike/ks-rest-client/wiki/Authorization)


### Example 
```js
(async function(data){

    const srvAPI = require('ks-rest-client');

    srvAPI.set({
        url: 'https://api.custom.com',
        end: '/api/person'
    });

    const list = await srvAPI.list();

    for(let i of list){
        console.log('<<', i.name, " << ", i.dni);
    }

    data = await srvAPI.select('82113031705'); 
    data = await srvAPI.insert({ name: "Juan" });
    data = await srvAPI.update({ name: "Lucy" }, '82113031705');    
    data = await srvAPI.delete('82113031705');

    console.log('>>', data);

})();
```