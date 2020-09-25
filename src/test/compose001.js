const compose = (...funcs) => {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }
  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

function foo1(args1) {
  console.log('foo1')
  return args1;
}
function foo2(args2) {
  console.log(args2);
  return args2
}
function foo3(args3) {
  console.log(args3);
  return args3;
}
const compose1 = compose(foo1, foo2);
// (...args) => foo1(foo2(...args))
const compose2 = compose(foo1, foo2, foo3);
// 1: (...args) => foo1(foo2(...args))
// 2: (...args) => foo1(foo2(foo3(...args)))