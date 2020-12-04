#!/usr/bin/env node
const child_process = require('child_process');
function test() {
  console.log('ddddd');
  // eslint-disable-next-line no-unused-expressions
  const branchName = child_process.execSync(
    'git name-rev --name-only HEAD',
    {'encoding': 'utf8'}
    );
  console.log(branchName.length, 'branchName')
  console.log(typeof branchName, 'branchName type')
  if (branchName.includes('feature/form-validate')) {
    console.log('禁止以命令行在master上merge')
    child_process.execSync(
      'git merge --abort'
    );
    process.exitCode = 1;
  } else {
    console.log('er han')
    process.exitCode = 0
  }

}
test()
