#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const readline = require('readline');
const { Select } = require('enquirer');
const os = require('os');

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

    // Convert to absolute path
    const projectDir = path.resolve(projectPath);

    // Create project directory
    fs.mkdirSync(projectDir, { recursive: true });

    // Copy common template files
    const commonDir = path.join(__dirname, 'templates/common');
    fs.cpSync(commonDir, projectDir, { recursive: true });

    // .gitignore 파일 이름 변경 처리
    if (fs.existsSync(path.join(projectDir, '_gitignore'))) {
      fs.renameSync(
        path.join(projectDir, '_gitignore'),
        path.join(projectDir, '.gitignore')
      );
    }

    // Modify build_config.json based on OS
    const buildConfigPath = path.join(projectDir, 'build_config.json');
    const buildConfig = JSON.parse(
      fs.readFileSync(buildConfigPath, 'utf8')
    );

    const platform = os.platform();
    if (platform === 'darwin') {
      buildConfig.icon = 'src-pyloid/icons/icon.icns';
    } else if (platform === 'win32') {
      buildConfig.icon = 'src-pyloid/icons/icon.ico';
    } else if (platform === 'linux') {
      buildConfig.icon = 'src-pyloid/icons/icon.png';
    }

    fs.writeFileSync(buildConfigPath, JSON.stringify(buildConfig, null, 2));

    // Copy selected template files
    const frameworkDir = path.join(
      __dirname,
      frameworks[selectedFramework],
      selectedLanguage
    );
    fs.cpSync(frameworkDir, projectDir, { recursive: true });

    fs.writeFileSync(
      path.join(projectDir, 'package.json'),
      fs
        .readFileSync(path.join(frameworkDir, 'package.json'), 'utf8')
        .replace('{package-manager}', selectedPackageManager)
    );

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

// function mergePackageJsonFiles(mainPath, scriptsPath, outputPath) {
//   return new Promise((resolve, reject) => {
//     try {
//       const mainContent = JSON.parse(fs.readFileSync(mainPath, 'utf8'));
//       const scriptsContent = JSON.parse(fs.readFileSync(scriptsPath, 'utf8'));

//       const mergedContent = {
//         ...mainContent,
//         scripts: {
//           ...(scriptsContent.scripts || {}),
//         },
//       };

//       fs.writeFileSync(outputPath, JSON.stringify(mergedContent, null, 2));
//       resolve();
//     } catch (error) {
//       reject(error);
//     }
//   });
// }

createProject();
