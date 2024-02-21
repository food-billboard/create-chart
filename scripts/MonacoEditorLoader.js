const fs = require("fs-extra");
const path = require("path");

const sourcePath = path.join(__dirname, "../node_modules/monaco-editor/min/vs");
const targetPath = path.join(__dirname, "../public/lib/monaco-editor/vs");

// Check if the source directory exists
if (!fs.existsSync(sourcePath)) {
  console.error(
    `Error: Source directory ${sourcePath} does not exist. Ensure the target package is correctly installed.`);
  process.exit(1);
}

// Ensure the target path exists, if not, create it
fs.ensureDirSync(targetPath);

// Attempt to copy
try {
  fs.copySync(sourcePath, targetPath, {
    overwrite: true,
    errorOnExist: false,
  });
  console.log(`Success: Copied from ${sourcePath} to ${targetPath}.`);
} catch (error) {
  console.error(`Error: An issue occurred during the copy process. Details: ${error.message}`);
  process.exit(1);
}

console.log(`Copied files from ${sourcePath} to ${targetPath}`);
