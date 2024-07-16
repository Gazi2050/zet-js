#!/usr/bin/env node

const { program } = require('commander');
const path = require('path');
const fs = require('fs-extra');
const execa = require('execa');
const templatesDir = path.resolve(__dirname, '../src/templates');

program
    .version('0.0.1')
    .arguments('<project-name>')
    .action(async (projectName) => {
        const projectPath = path.resolve(process.cwd(), projectName);
        try {
            console.log(`Creating project at ${projectPath}`);
            await fs.copy(templatesDir, projectPath);
            console.log('Installing dependencies...');
            await execa('npm', ['install'], { cwd: projectPath, stdio: 'inherit' });
            console.log('Project setup complete!');
        } catch (error) {
            console.error('Error creating project:', error);
        }
    });

program.parse(process.argv);
