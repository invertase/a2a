function A2A(oOrP) {
    if (!oOrP) return Promise.resolve([null, oOrP]);

    // single promise
    if (oOrP.then) {
        return oOrP.then((r) => [null, r]).catch((e) => [e, undefined]);
    }

    // function that returns a single promise
    if (typeof oOrP === 'function') {
        return oOrP()
            .then((r) => [null, r])
            .catch((e) => [e, undefined]);
    }

    // array of promises
    if (Array.isArray(oOrP) && oOrP.length && oOrP[0].then) {
        return Promise.all(oOrP)
            .then((r) => [null, r])
            .catch((e) => [e, undefined]);
    }

    // array of functions that returns a single promise
    if (Array.isArray(oOrP) && oOrP.length && typeof oOrP[0] === 'function') {
        return Promise.all(oOrP.map((f) => f()))
            .then((r) => [null, r])
            .catch((e) => [e, undefined]);
    }

    // non promise values - error
    if (oOrP instanceof Error) return Promise.resolve([oOrP, undefined]);

    // non promise values - any other value
    return Promise.resolve([null, oOrP]);
}

module.exports = A2A;
