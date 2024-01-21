Example of how to obtain the result returned by an endpoint published in a REST API: 
```js
const srvAPI = require('kswc');

srvAPI.set({
    url: 'https://api.custom.com',
    end: '/api/person'
});

const list = await srvAPI.get();

for(let i of list){
	console.log('<<', i.name, " << ", i.dni);
}
```
If we analyze the previous example, the process of traditional REST requests is automated, which would be as follows:

**REQUEST:**
```
GET https://api.custom.com/api/person
```

**RESPONSE:**
```json
[
	{ "name": "Tem", "dni": "8545654524" },
	{ "name": "Tas", "dni": "3434654524" },
	{ "name": "Min", "dni": "3456764589" },
	{ "name": "Lus", "dni": "1215453233" },
	{ "name": "Hos", "dni": "9045654524" },
]
``` 

Observe how the library is imported in general, then it is configured by specifying the url of the server or service provider, as well as the endpoint or path of the service on said server. For a better understanding of the operations that can be performed with the library, see the [operations section](https://github.com/ameksike/ks-rest-client/wiki/Operations), on the other hand see the [configuration section](https://github.com/ameksike/ks-rest-client/wiki/Configuration) to better understand the options that can be set. In case your api requires authentication see the [authorization](https://github.com/ameksike/ks-rest-client/wiki/Authorization) section.
