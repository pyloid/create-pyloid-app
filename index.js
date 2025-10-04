#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const readline = require('readline');
const { Select } = require('enquirer');
const ejs = require('ejs');
const glob = require('glob');

// Display version information
const { version } = require('./package.json');
console.log(`create-pyloid-app v${version}`);

// Function to find all .ejs files recursively
function findEjsFiles(dir) {
  return glob
    .sync('**/*.ejs', { cwd: dir })
    .map((file) => path.join(dir, file));
}

// Function to process .ejs files
function processEjsFiles(projectDir, templateData) {
  const ejsFiles = findEjsFiles(projectDir);

  for (const ejsFile of ejsFiles) {
    const templateContent = fs.readFileSync(ejsFile, 'utf8');
    const result = ejs.render(templateContent, templateData);

    // Remove .ejs extension to get the final filename
    const finalFile = ejsFile.slice(0, -4); // Remove '.ejs'

    fs.writeFileSync(finalFile, result);
    fs.unlinkSync(ejsFile); // Remove the .ejs file
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const frameworks = {
  react: 'templates/framework/react',
  vue: 'templates/framework/vue',
  svelte: 'templates/framework/svelte',
  nextjs: 'templates/framework/nextjs',
  sveltekit: 'templates/framework/sveltekit',
};

async function createProject() {
  try {
    // Get project path input (default: pyloid-app)
    const projectPath = await new Promise((resolve) => {
      rl.question(
        'Enter the path to create the project (default: pyloid-app): ',
        (answer) => {
          resolve(answer || 'pyloid-app');
        }
      );
    });

    // Package manager selection prompt
    const packageManagerPrompt = new Select({
      name: 'packageManager',
      message: 'Select a package manager',
      choices: [
        {
          name: 'npm',
          message: 'npm',
        },
        {
          name: 'pnpm',
          message: 'pnpm',
        },
        {
          name: 'yarn',
          message: 'yarn',
        },
        {
          name: 'bun',
          message: 'bun',
        },
      ],
    });

    const selectedPackageManager = await packageManagerPrompt.run();

    // Framework selection prompt
    const frameworkPrompt = new Select({
      name: 'framework',
      message: 'Select a framework',
      choices: [
        { name: 'react', message: 'React' },
        { name: 'vue', message: 'Vue' },
        { name: 'svelte', message: 'Svelte' },
        { name: 'nextjs', message: 'Next.js' },
        { name: 'sveltekit', message: 'SvelteKit' },
      ],
    });

    const selectedFramework = await frameworkPrompt.run();

    // Language selection prompt
    const languagePrompt = new Select({
      name: 'language',
      message: 'Select a language',
      choices: ['javascript', 'typescript'],
    });

    const selectedLanguage = await languagePrompt.run();

    // Backend selection prompt
    const backendPrompt = new Select({
      name: 'backend',
      message: 'Select a backend',
      choices: ['pyloidrpc', 'fastapi'],
    });

    const selectedBackend = await backendPrompt.run();

    // Convert to absolute path
    const projectDir = path.resolve(projectPath);

    // Create project directory
    fs.mkdirSync(projectDir, { recursive: true });

    // Copy common template files
    const commonDir = path.join(
      __dirname,
      `templates/common/${selectedBackend}`
    );
    fs.cpSync(commonDir, projectDir, { recursive: true });

    // rename _gitignore to .gitignore
    if (fs.existsSync(path.join(projectDir, '_gitignore'))) {
      fs.renameSync(
        path.join(projectDir, '_gitignore'),
        path.join(projectDir, '.gitignore')
      );
    }

    // Copy selected template files
    const frameworkDir = path.join(
      __dirname,
      frameworks[selectedFramework],
      selectedLanguage
    );
    fs.cpSync(frameworkDir, projectDir, { recursive: true });

    // Process .ejs template files
    const templateData = {
      packageManager: selectedPackageManager,
      framework: selectedFramework,
      language: selectedLanguage,
      backend: selectedBackend,
      pyloidjsVersion: '^0.3.1',
    };
    processEjsFiles(projectDir, templateData);

    // Print success message only when all operations complete successfully
    const isCurrentDir = ['.', './', '.\\'].includes(projectPath);
    console.log(`
✨ Project created successfully!

To get started:
${
  !isCurrentDir ? `cd ${path.basename(projectDir)}\n` : ''
}${selectedPackageManager} run setup
${selectedPackageManager} run dev
`);
  } catch (error) {
    console.error('An error occurred while creating the project:', error);
    process.exit(1);
  } finally {
    rl.close();
  }
}

createProject();
