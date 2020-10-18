### 分享思路
### redux中间件概念介绍
1：redux中间件的官方介绍
>如果你使用过 Express 或者 Koa 等服务端框架, 
>那么应该对 middleware 的概念不会陌生。 在这类框架中，
>middleware 是指可以被嵌入在框架接收请求到产生响应过程之中的代码。
>例如，Express 或者 Koa 的 middleware 可以完成添加 CORS headers、记录日志、
>内容压缩等工作。middleware 最优秀的特性就是可以被链式组合。
>你可以在一个项目中使用多个独立的第三方 middleware。
>相对于 Express 或者 Koa 的 middleware，Redux middleware 被用于解决不同的问题，
>但其中的概念是类似的。**它提供的是位于 action 被发起之后，到达 reducer 之前的扩展点**。 
>你可以利用 Redux middleware 来进行日志记录、创建崩溃报告、调用异步接口或者路由等等

2：前端开发中其他模块的中间件思想 比如 axios的拦截器 koa的中间件
3：在redux中，中间件的实现形式主要是对dispatch的一种封装

### 函数柯里化
函数柯里化的主要作用：参数复用 保存变量 延迟计算等
常见形式：
```javascript
const threeCallback = (...args1) => (...args2) => (...args3) => {
  // 经过三次调用，args1, args2, args3愉快相聚
  console.log(args1.concat(args2, args3))
}
threeCallback(1, 2)(3, 4, 5)(6, 7, 8, 9)
```
```javascript

function currying(func) {
  const args = [];
  return function result(...rest) {
      if (rest.length === 0)
          return func(...args);
      args.push(...rest);
      return result;
  }
}
  
const add = (...args) => args.reduce((a, b) => a + b);

const sum = currying(add);
sum(1,2)(3);
sum(4);
const a = sum(); // 10
const b = sum(1)(2,3)(4,5,6)() // 31

```

### 在不用中间件的情况下怎么写
```javascript
// 手动记录日志
const action = { type: 'TODO' }
console.log('dispatching', action)
store.dispatch(action)
console.log('next state', store.getState())

// 做一次封装
function dispatchAndLog(store, action) {
  console.log('dispatching', action)
  store.dispatch(action)
  console.log('next state', store.getState())
}
dispatchAndLog(store, action)

```
当在执行dispatch前后有更多的需求时就要不断的对上面的封装方法做修改，
不利于代码的维护和扩展，中间件的思想就可以解决这种**扩展性**的问题

### 运用中间件的写法
关于中间件的写法是怎么一步步演进过来的，官方文档有详细的说明，这里就不介绍了
1：同步中间件的写法示例
```javascript
const logMiddleware = ({ dispatch, getState }) => next => action => {
    console.log('log start');
    next(action);
    console.log('log end');
}
```
2：异步中间件的写法
```javascript
// redux-thunk的源码就是这么多！！！
function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument);
    }

    return next(action);
  };
}
```
ps:这是一种函数式编程的写法，思考下能用非函数式写法吗，
也就是写成(store, next, action) =>{}的形式

### 中间件的组合及链式调用
在redux中对中间件进行组合的方法是``applyMiddleware``，
调用方式为``applyMiddleware(...middlewares)``
ps:画一个洋葱模型的示意图，包括两种情况
1：在某一个中间件里如果调用了dispatch方法，其流程会重新走一遍所有中间件
在applyMiddleware的源码里有这样一段说明
>Because middleware is potentially asynchronous, this should be the first
  store enhancer in the composition chain.

这样异步中间件就在最外层，即使重新走一遍流程，对性能也会好些
2：如果某个中间件的实现里没有调用next方法，则其他中间件就不会执行了

四：redux结合中间件的代码示例

五：源码分析(重点分析next调用的流程，这是中间件链式执行的关键点)
1：总体执行流程梳理(以demo为例)
2：createStore applyMiddleware compose等源码分析
createStore函数调用后会返回一个对象
```
{
    dispatch,
    subscribe,
    getState,
    replaceReducer,
    [$$observable]: observable
  }
```
applyMiddleware函数其实是对createStore的一个增强,其返回值为一个函数
```javascript
export default function applyMiddleware(...middlewares) {
  return createStore => (...args) => {
    const store = createStore(...args)
    let dispatch = () => {
      // 主要是对中间件的一种约束，即在调用middleware(middlewareAPI)时不能
      // 调用dispatch方法，否则会报错，并给我报错原因
      throw new Error(
        'Dispatching while constructing your middleware is not allowed. ' +
          'Other middleware would not be applied to this dispatch.'
      )
    }
    // enhancer(createStore)(rootReducer, preloadedState)
    const middlewareAPI = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    }
    const chain = middlewares.map(middleware => middleware(middlewareAPI))
    dispatch = compose(...chain)(store.dispatch)
    /*
    * const middleware1 = ({dispatch, getState}) => (next) => (action) => {
    *   console.log('middleware1 start')
    *   next(action)
    *   console.log('middleware1 end')
    * }
    * 
    * const middleware2 = ({dispatch, getState}) => (next) => (action) => {
    *   console.log('middleware2 start')
    *   next(action)
    *   console.log('middleware2 end')
    * }
    * 
    * const middleware3 = ({dispatch, getState}) => (next) => (action) => {
    *   console.log('middleware3 start')
    *   next(action)
    *   console.log('middleware3 end')
    * }
    * 
    * 
    * chain中的函数已经去掉最外层的调用，所以转化为下面的形式
    * const foo1 = (next) => (action) => { next(action) }
    *                                 ||
    * const foo2 = (next) => (action) => { next(action) }
    *                                 ||
    * const foo3 = (next) => (action) => { next(action) }
    * 
    * compose(foo1, foo2, foo3)
    *      ||
    * (...args) => foo1(foo2(foo(...args)))
    *      ||
    * foo1(foo2(foo3(store.dispatch)))
    *      ||
    * dispatch = (action) => { next(action) }
    * 这就是最终封装的dispatch，是不是很绕
    *
    *
    */

    return {
      ...store,
      dispatch
    }
  }
}
// 这里的形参createStore在调用的时候就是上面的createStore函数，即回到调用
// createStore的流程，所以applyMiddleware是其的增强
```
在该源码的执行流程中，调用middlewares.map后会去掉一层函数，调用compose(...chain)后只剩下
一层函数，最终dispatch的形式为``dispatch = (action) => { next(action) }``
compose函数是实现中间件链式调用的关键，其返回值也是一个函数
```javascript
compose(a, b, c);
(...args) => a(b(c(...args)))
// 回溯
```

