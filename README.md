# A2A - Async Await to Array

Simplify your promise workflow.

## Install

```bash
npm install --save @iinc/a2a
```

## Example

```js
const A2A = require('@iinc/a2a');
const axios = require('axios');

async function example1() {
  const [ error, users ] = await A2A(axios.get('https://api.com/users'));
  if (error) {
    // ... do something
  }

  console.log('Users', users);
}

async function example2() {
  const [ error, [ users, profile ] ] = await A2A([
    axios.get('https://api.com/users'),
    axios.get('https://api.com/profile'),
  ]);
  
  if (error) {
    // ... do something
  }
  
  console.log('Users', users);
  console.log('Profile', profile);
}

example1();
example2();
```
