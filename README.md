# KsRestClient
Simple library to operate with REST API as a local library in your project. For more information see our [wiki](https://github.com/ameksike/ks-rest-client/wiki). 


### Install
```js
npm install ks-rest-client
```

### Load
```js
const srvAPI = require('ks-rest-client');
```

### Configure
```js
srvAPI.set({
    url: 'https://api.custom.com',
    end: '/api/person',
    key: 'MTYyOTQ5NjMxMDI0MDpkZGE5NjVjM2VmNDMwM2I4Njc2YzU4MDAwNjkzMjQ2NQ==',
});
```

### Asynchronous example  
```js
srvAPI.list().then(list => {
    for(let i of list){
        console.log('<<', i.name, " << ", i.dni);
    }
});

srvAPI.select('82113031705').then(data => console.log(data));
srvAPI.insert({ name: "Juan" }).then(data => console.log(data));
srvAPI.update({ name: "Lucy" }, '82113031705').then(data => console.log(data));
srvAPI.delete('82113031705').then(data => console.log(data));
```

### Synchronous example 
```js
(async function(data){

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

### Different service instances 
```js
const srvPerson = new srvAPI.API({
    url: 'https://person.api.com',
    end: '/api/person',
    key: 'MTYyOTQ5NjMxMDI0MDpkZGE5NjVjM2VmNDMwM2I4Njc2YzU4MDAwNjkzMjQ2NQ==',
});

const persons = await srvPerson.list();

// ........................................

const srvPets = new srvAPI.API({
    url: 'https://pets.api.com',
    end: '/api/pets',
    key: 'TWERTW434344442534DFZGE5NjVjM2VmNDMwM2I4Njc2YzU4MDAwNjkzMjQ2NQ==',
    log: (inf) => console.log(inf)
});

const pets = await srvPets.list();
```