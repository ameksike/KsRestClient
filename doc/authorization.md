Authorization is the function of specifying access rights/privileges to resources, which is related to general information security and computer security, and to access control in particular. More formally, "to authorize" is to define an access policy. For example, human resources staff are normally authorized to access employee records and this policy is often formalized as access control rules in a computer system. During operation, the system uses the access control rules to decide whether access requests from (authenticated) consumers shall be approved (granted) or disapproved (rejected). Resources include individual files or an item's data, computer programs, computer devices and functionality provided by computer applications. 

## Basic
In the context of an HTTP transaction, [basic access authentication](https://en.wikipedia.org/wiki/Basic_access_authentication) is a method for an HTTP user agent (e.g. a web browser) to provide a user name and password when making a request. In basic HTTP authentication, a request contains a header field in the form of Authorization: Basic <credentials>, where credentials is the Base64 encoding of ID and password joined by a single colon : It is specified in RFC [7617](https://datatracker.ietf.org/doc/html/rfc7617) from 2015, which obsoletes RFC [2617](https://datatracker.ietf.org/doc/html/rfc2617) from 1999.  

### Static Access Token
When you have the access token, you can specify it explicitly in the **key** property, as shown below: 
```js
const srv = require('kswc');

srv.set({
    url: 'https://api.custom.com',
    end: '/api/person',
    key: 'MTYyOTQ5NjMxMDI0MDpkZGE5NjVjM2VmNDMwM2I4Njc2YzU4MDAwNjkzMjQ2NQ==',
});
 
data = await srv.list();
```

### Dynamic Access Token
In the previous case, it is assumed by default that the prefix of the token will be of the **Bearer** type, which is one of the most used and can be redefined in the **token** property. 

```
     +--------+                               +---------------+
     |        |--(A)----- Access Token ------>|    Resource   |
     | Client |                               |     Server    |
     |        |<-(B)--- Protected Resource ---|               |
     +--------+                               +---------------+
```

In this case, a previous connection is not required to request the access token from the server, so the access token is previously available, however in many cases it is required to request the access token, as shown in the example below: 

```
     +--------+                               +---------------+
     |        |--(A)-- Authorization Grant -->| Authorization |
     |        |                               |     Server    |
     |        |<-(B)----- Access Token -------|               |
     |        |                               +---------------+
     | Client |
     |        |                               +---------------+
     |        |--(C)----- Access Token ------>|    Resource   |
     |        |                               |     Server    |
     |        |<-(D)--- Protected Resource ---|               |
     +--------+                               +---------------+
```
Example of implementation of this flow as client could be: 

```js
const srv = require('kswc');

srv.set({
	url: 'https://api.custom.com',
	end: '/api/v2/credential/grant/list', 
	basic: {
		client_id: 'my.username.plain',
		client_secret: 'my.password.plain',
		url_access: 'https://auth.custom.com/api/access/login'
	}
});

const token = await srv.connect();
data = await srv.get();
```
Note how in the previous example the following line is used:  
```js
const token = await srv.connect(); 
```
In this case **connect** is an asynchronous function that allows obtaining a token from an authentication server. Also automatically stores the generated token in the **key** property, taking the path defined in the **token_path property** from the response in JSON format. For this type of authentication model, a request would be formed as follows:

**REQUEST:**
```
POST https://auth.custom.com/api/access/login
HEADER Authorization Basic MTYyOTQ5NjMxMDI0MDpkZGE5NjVjM2VmNDMwM2I4Njc2YzU4MDAwNjkzMjQ2NQ==
``` 
Being equivalent to:
```
POST https://auth.custom.com/api/access/login
HEADER Authorization Basic Base64Encode(my.username.plain:my.password.plain)
``` 

**RESPONSE:**
```json
{
    "token": "MTYyOTQ5NjMxMDI0MDpkZGE5NjVjM2VmNDMwM2I4Njc2YzU4MDAwNjkzMjQ2NQ==" 
}
```
### Dynamic but Non-standard Basic Authentication 
In many cases a non-standard form of the basic model is also used. where the ones given in the header of the request are not sent but in the body. In this way, the username and password credentials must be explicitly specified. 

```js
const srv = require('kswc');

srv.set({
	url: 'https://api.server.com',
	end: '/api/v2/credential/grant/list', 
	basic: {
		client_id: 'my.username.plain@domain.com',
		client_secret: 'my.password.plain',
		url_access: 'https://auth.server.com/api/access/login',

		client_authentication: 'body',
		client_id_field: 'email',
		client_secret_field: 'password',
		token_path: 'access.token'
	}
});

const token = await srv.connect();
data = await srv.get();
```
For the previous example, at the call to the **connect** function would be generated a flow as described below:

**REQUEST:**
```
POST https://auth.server.com/api/access/login
BODY {
    "email": "my.username.plain@domain.com",
    "password": "my.password.plain",
}
```

**RESPONSE:**
```json
{
    "access":{
        "token": "MTYyOTQ5NjMxMDI0MDpkZGE5NjVjM2VmNDMwM2I4Njc2YzU4MDAwNjkzMjQ2NQ==" 
    }
}
```

The options supported in the basic authentication model are described below: 
* **client_id:** {STRING} [REQUIRED] it is client identifier and username is also supported as property name
* **client_secret:** {STRING}  [REQUIRED] it is client secret code and password  is also supported as property name
* **url_access:** {STRING} [REQUIRED] it is url access from authentication server 
* **token_path:** {STRING} [OPTIONAL] it is a path to find access token in response object  
* **client_id_field:** {STRING} [OPTIONAL] it is a name for the property that contains the value of client_id, only when the credential data is sent in body and by default is username
* **client_secret_field:** {STRING} [OPTIONAL] it is a name for the property that contains the value of client_secret, only when the credential data is sent in body and by default is password
* **client_authentication:** {STRING} [OPTIONAL] it defines if the credential data is sent in the header or in the body, by default it is header 


## OAuth
[OAuth ](https://datatracker.ietf.org/doc/rfc6749/)([Open Authorization](https://en.wikipedia.org/wiki/OAuth)) is an open standard for access delegation, commonly used as a way for Internet users to grant websites or applications access to their information on other websites but without giving them the passwords. This mechanism is used by companies such as Amazon, Google, Facebook, Microsoft and Twitter to permit the users to share information about their accounts with third party applications or websites. OAuth is a service that is complementary to and distinct from [OpenID](https://openid.net/).

```
     +--------+                               +---------------+
     |        |--(A)- Authorization Request ->|   Resource    |
     |        |                               |     Owner     |
     |        |<-(B)-- Authorization Grant ---|               |
     |        |                               +---------------+
     |        |
     |        |                               +---------------+
     |        |--(C)-- Authorization Grant -->| Authorization |
     | Client |                               |     Server    |
     |        |<-(D)----- Access Token -------|               |
     |        |                               +---------------+
     |        |
     |        |                               +---------------+
     |        |--(E)----- Access Token ------>|    Resource   |
     |        |                               |     Server    |
     |        |<-(F)--- Protected Resource ---|               |
     +--------+                               +---------------+
```

An OAuth 2.0 flow has the following roles:

-   **Resource Owner:** Entity that can grant access to a protected resource. Typically, this is the end-user.
-   **Resource Server:** Server hosting the protected resources. This is the API you want to access.
-   **Client:** Application requesting access to a protected resource on behalf of the Resource Owner.
-   **Authorization Server:** Server that authenticates the Resource Owner and issues access tokens after getting proper authorization. In this case, Auth0.

### OAuth Grant Types

The OAuth framework specifies several grant types for different use cases, as well as a framework for creating new grant types. The most common OAuth grant types used are listed below:

-   **1. Client Credentials:** for External App to an authorization server for System integration. 
-   **2. Authorization Code with PKCE:** for External App to an authorization server for User integration.

### Client Credentials

Client Credentials is the appropriate flow when you need to integrate an external application with an authorization server, it is what is known in other contexts as _backend-to-backend_ or _machine-to-machine (M2M)_ integration. The Client Credentials grant type is used by clients to obtain an access token outside of the context of a user. This is typically used by clients to access resources about themselves rather than to access a user's resources.

```
     +--------+                               +---------------+
     |        |--(A)-- Authorization Grant -->| Authorization |
     |        |                               |     Server    |
     |        |<-(B)----- Access Token -------|               |
     |        |                               +---------------+
     | Client |
     |        |                               +---------------+
     |        |--(C)----- Access Token ------>|    Resource   |
     |        |                               |     Server    |
     |        |<-(D)--- Protected Resource ---|               |
     +--------+                               +---------------+
```

Example of implementation of this flow as client could be: 
```js
const srv = require('kswc');

srv.set({
	url: 'https://api.custom.com',
	end: '/api/v2/credential/grant/list'
});

const token = await srv.connect({ oauth: {
	grant_type: 'client_credentials',
	client_id: '5d6fd52d1796bd41632099cb5444b7f6',
	client_secret: 'b4ffbdb0e2c9efb45d5963370c2381a5',
	url_access: 'https://auth.custom.com/api/v2/access/token',
	scope: 'read write',
}});

const data = await srv.list();
```
Another way to do it could be similar to the cases described above where the authentication data is specified in the library configuration. 
```js
const srv = require('kswc');

srv.set({
	url: 'https://api.server.com',
	end: '/api/v2/credential/grant/list', 
	oauth: {
		grant_type: 'client_credentials',
		client_authentication: 'header',
		client_id: '5d6fd52d1796bd41632099cb5444b7f6',
		client_secret: 'b4ffbdb0e2c9efb45d5963370c2381a5',
		url_access: 'https://oauth.server.com/api/v2/access/token',
		scope: 'read write',
	}
});

const token = await srv.connect();
const data = await srv.get();
```
Note that the connect method must be invoked before executing any action that requires this authorization model, in this way the access token is automatically managed. On the other hand, you can change the way in which the access credentials are sent to the authentication server through the **client_authentication** property, determining it is sent from the **header** or the **body** of the request, this depends on the implementation that supports the authentication server.

The options supported in the OAuth Client Credentials flow are described below:
* **client_id:** {STRING} [REQUIRED] it is client identifier and username is also supported as property name
* **client_secret:** {STRING} [REQUIRED] it is client secret code and password  is also supported as property name
* **url_access:** {STRING} [REQUIRED] it is url access from authentication server 
* **grant_type:** {STRING} [REQUIRED] it refers to the way an application gets an access token
* **client_authentication:** {STRING} [OPTIONAL] it defines if the credential data is sent in the header or in the body, by default it is body
* **scope:** {STRING} [OPTIONAL] Scope is a mechanism in OAuth 2.0 to limit an application's access to a user's account. An application can request one or more scopes, this information is then presented to the user in the consent screen, and the access token issued to the application will be limited to the scopes granted. 


For the previous example, at the call to the **connect** function would be generated a flow as described below:

**REQUEST 1:**
```
POST https://oauth.server.com/api/access/login
BODY {
    "grant_type": "client_credentials",
    "client_id": "5d6fd52d1796bd41632099cb5444b7f6",
    "client_secret": "b4ffbdb0e2c9efb45d5963370c2381a5",
    "scope": "read write"
}
```

**RESPONSE 1:**
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVkZMquJ2Qborn5H7D9EBQOH3vM",
    "refresh_token": "TTMzMzM6OTgzM2Q5ZjJmZjI1ODFiMjgxMmQzYTU2NWEyM2M3YjA=",
    "token_type": "Bearer",
    "expires_in": 1630194635,
    "scope": "read write"
}
```

**REQUEST 2:**
```
GET https://api.server.com
HEADER Authorization Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVkZMquJ2Qborn5H7D9EBQOH3vM
```

**RESPONSE 2:**
```json
{
    "total": 3,
    "data": [
       { "den": "ATM", "code":34546 },
       { "den": "TS1", "code":67846 },
       { "den": "SUM", "code":75456 }
    ]
}
```
