A Web API is an application programming interface for either a web server or a web browser. It is a web development concept, usually limited to a web application's client-side (including any web frameworks being used), and thus usually does not include web server or browser implementation details such as SAPIs or APIs unless publicly accessible by a remote web application.  

### REST
Representational state transfer ([REST](https://en.wikipedia.org/wiki/Representational_state_transfer)) is a software architectural style that was created to guide the design and development of the architecture for the World Wide Web. REST defines a set of constraints for how the architecture of an Internet-scale distributed hypermedia system, such as the Web, should behave. The REST architectural style emphasises the scalability of interactions between components, uniform interfaces, independent deployment of components, and the creation of a layered architecture to facilitate caching components to reduce user-perceived latency, enforce security, and encapsulate legacy systems.

REST has been employed throughout the software industry and is a widely accepted set of guidelines for creating stateless, reliable web APIs. A web API that obeys the REST constraints is informally described as RESTful. RESTful web APIs are typically loosely based on [HTTP](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) methods to access resources via URL-encoded parameters and the use of JSON or XML to transmit data. 

"Web resources" were first defined on the World Wide Web as documents or files identified by their URLs. Today, the definition is much more generic and abstract, and includes every thing, entity, or action that can be identified, named, addressed, handled, or performed in any way on the Web. In a RESTful Web service, requests made to a resource's URI elicit a response with a payload formatted in HTML, XML, JSON, or some other format. For example, the response can confirm that the resource state has been changed. The response can also include hypertext links to related resources. The most common protocol for these requests and responses is HTTP. It provides operations (HTTP methods) such as GET, POST, PUT, and DELETE.[2] By using a stateless protocol and standard operations, RESTful systems aim for fast performance, reliability, and the ability to grow by reusing components that can be managed and updated without affecting the system as a whole, even while it is running.

The goal of REST is to increase performance, scalability, simplicity, modifiability, visibility, portability, and reliability. This is achieved through following REST principles such as a client–server architecture, statelessness, cacheability, use of a layered system, support for code on demand, and using a uniform interface. These principles must be followed for the system to be classified as REST. 

### Classification models
Several models have been developed to help classify REST APIs according to their adherence to various principles of REST design, such as the [Richardson Maturity Model](https://en.wikipedia.org/wiki/Richardson_Maturity_Model). It divides the principle parts of RESTful design into three steps: resource identification ([URI](https://en.wikipedia.org/wiki/Uniform_Resource_Identifier)), HTTP verbs, and hypermedia controls (e.g. hyperlinks).

### Applied to web services
Web service APIs that adhere to the REST architectural constraints are called RESTful APIs.[12] HTTP-based RESTful APIs are defined with the following aspects:
- a base URI, such as http://api.example.com/;
- standard HTTP methods (e.g., GET, POST, PUT, and DELETE);
- a media type that defines state transition data elements (e.g., Atom, microformats, application/vnd.collection+json,[13]:91–99 etc.). The current representation tells the client how to compose requests for transitions to all the next available application states. This could be as simple as a URI or as complex as a Java applet.

### Endpoints
Endpoints are important aspects of interacting with server-side web APIs, as they specify where resources lie that can be accessed by third party software. Usually the access is via a URI to which HTTP requests are posted, and from which the response is thus expected. Web APIs may be public or private, the latter of which requires an access token.

Endpoints need to be static, otherwise the correct functioning of software that interacts with it cannot be guaranteed. If the location of a resource changes (and with it the endpoint) then previously written software will break, as the required resource can no longer be found at the same place. As API providers still want to update their web APIs, many have introduced a versioning system in the URI that points to an endpoint, for example the Clarifai API: The endpoint for the tagging functionality within the web API has the following URI: "https://api.google.com/v1/tag/". The "/v1/" part of the URI specifies access to the first version of the web API. If Clarifai decides to update to version two, they can do this while still maintaining support for third party software that uses the first version.

### Request methods
HTTP defines methods to indicate the desired action to be performed on the identified resource. 
- **GET:** The GET method requests that the target resource transfers a representation of its state. GET requests should only retrieve data and should have no other effect. The W3C has published guidance principles on this distinction, saying, "Web application design should be informed by the above principles, but also by the relevant limitations.

- **HEAD:** The HEAD method requests that the target resource transfers a representation of its state, like for a GET request, but without the representation data enclosed in the response body. This is useful for retrieving the representation metadata in the response header, without having to transfer the entire representation.

- **POST:** The POST method requests that the target resource processes the representation enclosed in the request according to the semantics of the target resource. For example, it is used for posting a message to an Internet forum, subscribing to a mailing list, or completing an online shopping transaction.

- **PUT:** The PUT method requests that the target resource creates or updates its state with the state defined by the representation enclosed in the request.

- **DELETE:** The DELETE method requests that the target resource deletes its state.

- **CONNECT:** The CONNECT method request that the intermediary establishes a TCP/IP tunnel to the origin server identified by the request target. It is often used to secure connections through one or more HTTP proxies with TLS.

- **OPTIONS:** The OPTIONS method requests that the target resource transfers the HTTP methods that it supports. This can be used to check the functionality of a web server by requesting '*' instead of a specific resource.

- **TRACE:** The TRACE method requests that the target resource transfers the received request in the response body. That way a client can see what (if any) changes or additions have been made by intermediaries.

- **PATCH:** The PATCH method requests that the target resource modifies its state according to the partial update defined in the representation enclosed in the request.

All general-purpose HTTP servers are required to implement at least the GET and HEAD methods, and all other methods are considered optional by the specification.
