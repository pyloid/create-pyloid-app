#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const readline = require('readline');
const { Select } = require('enquirer');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const frameworks = {
  react: 'templates/framework/react',
  vue: 'templates/framework/vue',
  svelte: 'templates/framework/svelte',
};

const packageManagers = {
  npm: 'templates/package-manager/npm',
  pnpm: 'templates/package-manager/pnpm',
  yarn: 'templates/package-manager/yarn',
  bun: 'templates/package-manager/bun',
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

    // Convert to absolute path
    const projectDir = path.resolve(projectPath);

    // Create project directory
    fs.mkdirSync(projectDir, { recursive: true });

    // Copy common template files
    const commonDir = path.join(__dirname, 'templates/common');
    fs.cpSync(commonDir, projectDir, { recursive: true });

    // Copy selected template files
    const frameworkDir = path.join(
      __dirname,
      frameworks[selectedFramework],
      selectedLanguage
    );
    fs.cpSync(frameworkDir, projectDir, { recursive: true });

    // Selected package manager template
    const packageManagerDir = path.join(
      __dirname,
      packageManagers[selectedPackageManager],
      selectedLanguage
    );

    // Merge package.json files
    await mergePackageJsonFiles(
      path.join(frameworkDir, 'package.json'),
      path.join(packageManagerDir, 'package.scripts.json'),
      path.join(projectDir, 'package.json')
    );

    // Print success message only when all operations complete successfully
    const isCurrentDir = ['.', './', '.\\'].includes(projectPath);
    console.log(`
✨ Project created successfully!

To get started:
${
  !isCurrentDir ? `cd ${path.basename(projectDir)}\n` : ''
}${selectedPackageManager} run init
${selectedPackageManager} run dev
`);
  } catch (error) {
    console.error('An error occurred while creating the project:', error);
    process.exit(1);
  } finally {
    rl.close();
  }
}

function mergePackageJsonFiles(mainPath, scriptsPath, outputPath) {
  return new Promise((resolve, reject) => {
    try {
      const mainContent = JSON.parse(fs.readFileSync(mainPath, 'utf8'));
      const scriptsContent = JSON.parse(fs.readFileSync(scriptsPath, 'utf8'));

      const mergedContent = {
        ...mainContent,
        scripts: {
          ...(scriptsContent.scripts || {}),
        },
      };

      fs.writeFileSync(outputPath, JSON.stringify(mergedContent, null, 2));
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

createProject();
