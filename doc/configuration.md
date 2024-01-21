There are two ways to configure the library: **constructor** and **set** methods

### Set methods
The set method allows from an object to configure the main options of the library, as shown below:
 
```js
const srvAPI = require('kswc');
srvAPI.set({
    url: 'https://api.custom.com',
    end: '/api/person'
});
const data = await srvAPI.get(); 
```

The set method returns a reference to the library itself, so it can be invoked in a nested way. 

```js
const srvAPI = require('kswc');
srvAPI.set({
    url: 'https://api.custom.com',
    end: '/api/person',
    key: 'MTYyOTQ5NjMxMDI0MDpkZGE5NjVjM2VmNDMwM2I4Njc2YzU4MDAwNjkzMjQ2NQ==',
})
const address = await srvAPI.set({ end: '/api/address' }).get(); 
const place = await srvAPI.set({ end: '/api/place' }).get(); 
```

In the previous example, the endpoint or request route is changed, however, caution should be exercised as this is a centralized property, in case different endpoints or different configurations are required, see the [instances section](https://github.com/ameksike/ks-rest-client/wiki/Instances).