# magicProxy

A module help you make calling chain.

you can use it like:

```javascript
var _ = require('magicProxy')

 Promise.resolve({a: 12333})
 .then(_.a.toString().split('').length)
 .then(console.log.bind(null, 'result:'), console.error.bind(null, 'catch error:'));
```

this module actually create function like that

```javascript
function (args, _){
  return _.a.toString().split(args[0]).length
}
```
so you can know it's vary quick and easy-use