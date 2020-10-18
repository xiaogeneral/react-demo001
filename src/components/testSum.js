function sum(...res) {
  return res.reduce((a ,b) => a + b);
}
sum.toString = function () {
  console.log('你大爷');
  return '炸弹';
}
const result = sum(1, 2, 3);