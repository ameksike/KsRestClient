
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