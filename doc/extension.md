It is possible to modify the way in which the different operations are carried out by extending the drivers types. For more information on operations see the ['Operations' section](https://github.com/ameksike/kswc/wiki/Operations).

```js
const srv = require('kswc');
```

### Simple example
Define your own handler extending from **'srv.API.type.KsCs'** which is the base class 
```js
class MyService extends srv.API.type.KsRest {

	constructor(payload = null) {
		super(payload);
	}

	async get(query = null) {
		const res = await super.get(query) || {};
		res.info = {
			subclass: 'MyService'
		};
		return res;
	}
}
```
In the previous example, the behavior of the get function is modified, which implements the type **'srv.API.type.KsRest'** which in turn extends from **'srv.API.type.KsCs'**. 

```js
srv.set({
	url: app.url(),
	end: '/api/person',
	driver: MyService
});

const data = await srv.get();
```

### Base Type
The **KsCs** controller, unlike **KsRest**, does not define how requests are made to the server, it only describes the main operations that each controller must have, for a better understanding see the specification that is shown below:
```js
class KsCs {
    /**
     * @description initialize the service 
     * @param {OBJECT} options
     */
    constructor(payload = null) {}

    /**
     * @description initialize the service 
     * @param {OBJECT} options
     * @return {OBJECT} KsCs
     */
    set(options = null) {}

    /**
     * @description list all entities, alias for list  
     * @param {OBJECT} query
     * @param {*} query 
     */
    async get(query = null) {}

    /**
     * @description list all entities 
     * @param {OBJECT} query
     * @return {*}  
     */
    async list(query = null) {}

    /**
     * @description insert an entity, alias for insert
     * @param {OBJECT} payload 
     * @return {OBJECT} entity 
     */
    async add(payload) {}

    /**
     * @description insert an entity
     * @param {OBJECT} payload 
     * @return {OBJECT} entity 
     */
    async insert(payload) {}

    /**
     * @description update an entity
     * @param {OBJECT} payload 
     * @param {STRING|NUMBER} id 
     * @param {OBJECT} query 
     * @return {OBJECT} entity 
     */
    async update(payload, id = null, query = null) {}

    /**
     * @description delete an entity
     * @param {STRING|NUMBER} id 
     * @return {OBJECT} entity 
     */
    async delete(id, query = null) {}

    /**
     * @description get an entity
     * @param {STRING|NUMBER} id 
     * @param {OBJECT} query 
     * @return {OBJECT} entity 
     */
    async select(id, query = null) {}

    /**
     * @description custom query, alias for request
     * @param {OBJECT} payload 
     * @return {OBJECT}
     */
    async query(payload) {}

    /**
     * @description custom query
     * @param {OBJECT} payload 
     * @return {OBJECT}
     */
    async request(payload) {}

    /**
     * @description get authentication token
     * @param {OBJECT} options 
     * @return {OBJECT} KsCs
     */
    async connect(options) {}

    /**
     * @description get value from path
     * @param {OBJECT} target 
     * @param {STRING} path 
     * @return {*}
     */
    getFromPath(target, path = null) {}

    /**
     * @description get url params as string 
     * @param {FUNCTION} param.log
     * @return {STRING}
     */
    paramToStr(param) {}
}
```