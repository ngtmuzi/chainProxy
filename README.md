# chainProxy
A module help you make calling chain.
I like `bluebird` but I hate some method like `.get` and `.call`, it's ugly!
So I make this module make sync calling to be easy like spark language


# Note
this module only can run in NodeJs6 because it use `Proxy`


# Usage
you can use it like:

```javascript
var _ = require('chainproxy')();

Promise.resolve({a: 12333})
  .then(_.a.toString().split('')[0].toString().replace('1', 'replaceStr').length)
  .then(console.log.bind(null, 'result:'), console.error.bind(null, 'catch error:'));
```
you can set default value in `require('chainproxy')();` param, if not, will throw an error, see test example.

this module actually create function like that

```javascript
function (args, _){
  _.a.toString().split(args[0])[args[1]].toString().replace(args[2], args[3]).length
}
```
so you can see it's vary quick and easy-use