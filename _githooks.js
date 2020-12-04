#!/usr/bin/env node
const child_process = require('child_process');
function test() {
  const branchName = child_process.execSync(
    'git name-rev --name-only HEAD',
    {'encoding': 'utf8'}
    );
  if (branchName.includes('feature/form-validate')) {
    console.log('禁止以命令行在master上merge')
    child_process.execSync(
      'git merge --abort'
    );
    process.exitCode = 1;
  } else {
    process.exitCode = 0
  }

}
test()
