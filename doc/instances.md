### Different service instances 

By default, the library implements the Singleton design pattern, which is favorable in environments where the configuration options do not vary and would be centralized, in case it is required to work with different configurations at the same time, it is possible by means of the same configuration. 

```js
const srv = require('kswc');
```
Through the **API** property you have access to the class or main interface of the library:
 
```js
const srvPerson = new srv.API({
    url: 'https://person.api.com',
    end: '/api/person',
    key: 'MTYyOTQ5NjMxMDI0MDpkZGE5NjVjM2VmNDMwM2I4Njc2YzU4MDAwNjkzMjQ2NQ==',
});

const persons = await srvPerson.list();
```

```js
const srvPets = new srv.API({
    url: 'https://pets.api.com',
    end: '/api/pets',
    key: 'TWERTW434344442534DFZGE5NjHDFH6566GHFSD5jc2YzU4MDAwNjkzMjQ2NQ==',
    log: (inf) => console.log(inf)
});

const pets = await srvPets.list();
```

Note how in this way two separate instances are created that can be treated as totally different services.