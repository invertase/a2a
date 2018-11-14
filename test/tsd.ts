import a2a from '../';

a2a(Promise.resolve(1))
  .then(([err, result]) => {
    console.log(result as number);
  });

a2a([Promise.resolve(1)])
  .then(([err, result]) => {
    console.log(result as number[]);
  });
