const { promises: fs } = require("fs")
const path = require("path")

const commandArgs = process.argv.slice(2);

const copyDir = async (src, dest) => {
  await fs.mkdir(dest, { recursive: true });

  // files or directories
  const entries = await fs.readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    entry.isDirectory() ?
      await copyDir(srcPath, destPath) :
      await fs.copyFile(srcPath, destPath);
  }
}

copyDir(commandArgs[0], commandArgs[1]);

