const fs = require('fs');
const path = require('path');
const { program } = require('commander');

program.option('--token <letters>', 'write sentry token');

program.parse();

const { token } = program.opts();

if (token) {
  const filePath = path.join(__dirname, '../', '.sentryclirc');
  const exists = fs.existsSync(filePath);
  let fileData = '';
  if (exists) {
    fileData = fs.readFileSync(filePath).toString();
  }
  fileData = fileData.replace('token=token', `token=${token}`);
  fs.writeFileSync(filePath, fileData);
}
