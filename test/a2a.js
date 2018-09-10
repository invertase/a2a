const assert = require('assert');
const A2A = require('../');

describe('A2A', function () {
    it('should resolve an undefined value', async function () {
        const [error, result] = await A2A();

        assert(error === null);
        assert(result === undefined);
    });

    it('should resolve a falsey value', async function () {
        const [error, result] = await A2A('');

        assert(error === null);
        assert(result === '');
    });

    it('should take a promise a single promise and resolve', async function () {
       const prom = new Promise(res => res('foo'));

       const [error, result] = await A2A(prom);

       assert(error === null);
       assert(result === 'foo');
    });

    it('should take a promise a single promise and reject', async function () {
        const prom = new Promise((res, rej) => rej(
            new Error('bar')
        ));

        const [error, result] = await A2A(prom);

        assert(result === undefined);
        assert(error.message === 'bar');
    });

    it('should resolve a callable promise', async function () {
        const prom = () => new Promise(res => res('foo'));

        const [error, result] = await A2A(prom);

        assert(error === null);
        assert(result === 'foo');
    });

    it('should reject a callable promise', async function () {
        const prom = () => new Promise((res, rej) => rej(
            new Error('bar')
        ));

        const [error, result] = await A2A(prom);

        assert(result === undefined);
        assert(error.message === 'bar');
    });

    it('should resolve an array of promises', async function () {
        const prom = [
            Promise.resolve('foo'),
            Promise.resolve('bar'),
        ];

        const [error, result] = await A2A(prom);

        assert(error === null);
        assert(Array.isArray(result));
        assert.deepStrictEqual(result, [
            'foo', 'bar',
        ]);
    });

    it('should reject an array of promises', async function () {
        const prom = [
            Promise.resolve('foo'),
            Promise.reject(new Error('foobar')),
        ];

        const [error, result] = await A2A(prom);

        assert(result === undefined);
        assert(error.message === 'foobar');
    });

    it('should resolve an array of callable promises', async function () {
        const prom = [
            () => Promise.resolve('foo'),
            () => Promise.resolve('bar'),
        ];

        const [error, result] = await A2A(prom);

        assert(error === null);
        assert(Array.isArray(result));
        assert.deepStrictEqual(result, [
            'foo', 'bar',
        ]);
    });

    it('should reject if a single promise fails', async function () {
        const prom = [
            () => Promise.resolve('foo'),
            () => Promise.resolve('bar'),
            () => Promise.reject(new Error('foobar')),
        ];

        const [error, result] = await A2A(prom);

        assert(result === undefined);
        assert(error.message === 'foobar');
    });

    it('should resolve an error value', async function () {
        const [error, result] = await A2A(new Error('error'));

        assert(result === undefined);
        assert(error.message === 'error');
    });

    it('should resolve a none promise value', async function () {
        const [error, result] = await A2A(1337);

        assert(error === null);
        assert(result === 1337);
    });
});
