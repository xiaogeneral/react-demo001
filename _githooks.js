#!/usr/bin/env node
const child_process = require('child_process');
function test() {
  console.log('ddddd');
  // eslint-disable-next-line no-unused-expressions
  const branchName = child_process.execSync(
    'git name-rev --name-only HEAD',
    {'encoding': 'utf8'}
    );
  console.log(branchName, 'branchName')
  if (branchName === 'feature/form-validate') {
    console.log('hi process')
    process.exitCode = 1;
    console.log('还会执行吗')
  } else {
    console.log('er han')
    process.exitCode = 0
  }

}
test()
