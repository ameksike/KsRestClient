KsWc is a simple library to make your Web API deployment easier, with it you can operate with [REST](https://en.wikipedia.org/wiki/Representational_state_transfer) API as a local library in your project, focused on the [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) pattern implemented by RESTful services, and support of different automated authentication flows. Keep in mind that there are several frameworks that allow you to develop your own REST API, such is the case [KsMf](https://github.com/ameksike/ksmf/wiki). 

Note that a Web API is an application programming interface for either a web server or a web browser. It is a web development concept, usually limited to a web application's client-side (including any web frameworks being used), and thus usually does not include web server or browser implementation details such as SAPIs or APIs unless publicly accessible by a remote web application. On the other hand, the goal of REST is to increase performance, scalability, simplicity, modifiability, visibility, portability, and reliability. This is achieved through following REST principles such as a client–server architecture, statelessness, cacheability, use of a layered system, support for code on demand, and using a uniform interface. These principles must be followed for the system to be classified as REST. For more theoretical elements refer to the [introductory section](./introduction.md). 

### Get started
1. Install
```npm
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
