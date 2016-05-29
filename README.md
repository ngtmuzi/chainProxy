# chainProxy
A module help you make calling chain.
I like `bluebird` but I hate some method like `.get` and `.call`, it's ugly!
So I make this module make sync calling to be easy like spark language


# Note
this module only can run in NodeJs6 because it use `Proxy`


# Usage
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