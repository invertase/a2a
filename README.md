# A2A - Async Await to Array

<a href="https://www.npmjs.com/package/a2a"><img src="https://img.shields.io/npm/dm/a2a.svg?style=flat-square" alt="NPM downloads"></a>
<a href="https://www.npmjs.com/package/a2a"><img src="https://img.shields.io/npm/v/a2a.svg?style=flat-square" alt="NPM version"></a>
<a href="/LICENSE"><img src="https://img.shields.io/npm/l/a2a.svg?style=flat-square" alt="License"></a>

Simplify your promise workflow.

## Install

```bash
npm install --save a2a
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
