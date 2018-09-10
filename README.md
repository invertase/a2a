# A2A - Async Await to Array

Simplify your promise workflow.

## Install

```bash
npm install --save a2a
```

## Example

```js
const A2A = require('a2a');
const axios = require('axios');

async function example1() {
    const request = axios.get('https://api.com/users');
    const [error, users] = await A2A(request);

    if (error) throw new Error(error);

    console.log('Users', users);
}

async function example2() {
    const requests = [
        () => axios.get('https://api.com/users'),
        () => axios.get('https://api.com/profile'),
    ];

    const [error, results] = await A2A(requests);

    if (error) throw new Error(error);

    console.log('Users', results[0]);
    console.log('Profile', results[1]);
}

example1();
example2();
```
