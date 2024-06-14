#!/usr/bin/env node

import prompts from 'prompts';
import minimist from 'minimist';
import { basename, join } from 'node:path';
// import { copy } from 'fs-extra/esm';
import { readdirSync, existsSync, readFileSync, rmSync, copyFileSync, mkdirSync } from 'node:fs';
import { spawn } from 'node:child_process';
import chalk from 'chalk';

// tests -s
// tests --clean-samples
(async () => {

  console.log('\x1B[H\x1B[2J');

  const args = minimist(process.argv.slice(1), {
    alias: {
      tests: 't',
      samples: 's',
      clean: 'c'
    },
    default: {
      cwd: join(process.cwd(), 'tests'),
      e2e: false,
      clean: null // clean samples
    },
    boolean: [
      'e2e',
      'clean'
    ],
    string: [
      't',
      's'
    ]
  });

  function getTests (uri: string) {

    const choices: prompts.Choice[] = [];
    const read = readFileSync(join(process.cwd(), uri)).toString();
    const titles = read.matchAll(/(?<=(?!test\.skip)^test(?:\.\w+)?\(['"]).*?(?=['"])/gm);

    for (const title of titles) {

      choices.push({
        title: title[0],
        value: `--match='${title}'`,
        description: uri.slice(6)
      });

    }

    return choices;

  }

  function getChoices () {

    const choices: prompts.Choice[] = [];
    const dirs: string[] = args.tests.split(',');

    for (const dir of dirs) {

      if (!existsSync(join(args.cwd, dir))) continue;

      for (const file of readdirSync(join(args.cwd, dir)).filter(x => !x.startsWith('.'))) {
        if (/\.test\.(mjs|js|ts|cjs)$/.test(file)) {
          choices.push({
            title: `${file}`,
            description: `${dir}`,
            value: `tests/${dir}/${file}`
          });
        } else {
          if (!existsSync(join(args.cwd, dir, file))) continue;
          for (const nest of readdirSync(join(args.cwd, dir, file)).filter(x => !x.startsWith('.'))) {
            if (/\.test\.(mjs|js|ts|cjs)$/.test(nest)) {
              choices.push({
                title: `${nest}`,
                description: `${dir}/${file}`,
                value: `tests/${dir}/${file}/${nest}`
              });
            }
          }
        }
      }
    }

    return choices;

  }

  if (args.s !== null) {

    const samplesPath = join(args.cwd, 'samples');
    const e2ePath = join(args.cwd, 'e2e', 'samples');

    if (!existsSync(e2ePath)) mkdirSync(e2ePath);

    if (args.clean) {

      if (args.e2e) {

        const files = readdirSync(e2ePath);

        for (const file of readdirSync(e2ePath)) rmSync(join(e2ePath, file));

        console.log(chalk.gray(`Removed ${files.length} Files`));

      }

    } else {

      if (args.e2e) {

        const files = readdirSync(e2ePath);

        for (const file of readdirSync(e2ePath)) rmSync(join(e2ePath, file));

        console.log(chalk.gray(`Removed ${files.length} Files`));

      }

      const dirs = args.s.split(',').filter(Boolean);

      if (dirs.length === 0) {

        console.log(chalk.yellowBright.bold('Directory Required, provide 1 or the following:'));
        const available: string[] = [];

        for (const dir of readdirSync(samplesPath).filter(x => !x.startsWith('.'))) {
          available.push(`${chalk.gray('-')} ${chalk.yellowBright(`${dir}`)}`);
        }

        console.log(available.join('\n'));

        return;
      }

      for (const dir of dirs) {

        const path = join(samplesPath, dir);

        if (!existsSync(path)) {
          console.log(chalk.red(`No samples directory found: samples/${dir}`));
          continue;
        }

        const files = readdirSync(path)
          .filter(x => !x.startsWith('.'))
          .map(file => join(path, file));

        if (args.e2e) {

          for (const file of files) {
            const output = join(e2ePath, basename(file, '.txt')) + `.${dir}`;
            copyFileSync(file, output);
          }

          console.log(chalk.gray(`Copied ${files.length} Files`));

        }

      }

    }

  } else {

    const command = await prompts([
      {
        type: 'autocomplete',
        name: 'test',
        message: 'Select Test',
        limit: 50,
        choices: getChoices()
      },
      {
        type: 'select',
        name: 'command',
        message: 'Command',
        choices: [
          {
            title: 'Watch',
            value: '--watch --colors',
            description: 'Invoke with watch mode'
          },
          {
            title: 'Run',
            value: '--colors',
            description: 'Run all tests'
          },
          {
            title: 'Specific',
            value: 'find',
            description: 'Run a specific test'
          }
        ]
      }
    ]);

    if (command.command === 'find') {

      const match = await prompts([
        {
          type: 'autocomplete',
          name: 'test',
          message: 'Choose Test',
          limit: 50,
          choices: getTests(command.test)
        },
        {
          type: 'select',
          name: 'command',
          message: 'Command',
          choices: [
            {
              title: 'Watch',
              value: '--watch --colors',
              description: 'Invoke with watch mode'
            },
            {
              title: 'Run',
              value: '--colors',
              description: 'Run all tests'
            }
          ]
        }
      ]);

      if (match.command === undefined) {
        console.log(chalk.gray('\nExited, no tests will run\n'));
        return;
      }

      spawn('ava', [
        command.test,
        ...match.test.split(' '),
        ...match.command.split(' ')
      ], {
        stdio: 'inherit'
      }).on('exit', function (error) {

        if (!error) console.log(chalk.gray('\nExited, no tests will run\n'));

      });

    } else {

      if (command.command === undefined) {
        console.log(chalk.gray('\nExited, no tests will run\n'));
        return;
      }

      spawn('ava', [
        command.test,
        ...command.command.split(' ')
      ], {
        stdio: 'inherit'
      }).on('exit', function (error) {

        if (!error) console.log(chalk.gray('Exited Spawned AVA Process'));

      });
    }

  }

})();
