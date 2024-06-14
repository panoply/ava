import { readdirSync, copyFileSync, rmSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';

type TO = (
  | `e2e/${string}`
  | `cli/format/${string}`
  | `cli/watch/${string}`
)

/**
 * Imports Samples
 *
 * The `from` entry imports from the `samples` directory and copying
 * to the `to` directory related to the tests. Optionally accepts `ext`
 * be provided, when omitted will use the samples directory name.
 *
 * @example
 *
 * import test from 'ava'
 * import { samples } from '@liquify/ava/esthetic';
 *
 * test.before('samples', async () => {
 *
 *  await samples.get({
 *    from: 'liquid',
 *    to: 'e2e/esm/liquid',
 *    ext:'.liquid'
 *  })
 *
 * });
 */
async function get (options: {
  from: string,
  to: TO,
  ext?: string
}) {

  const basePath = join(process.cwd(), 'tests');
  const readPath = join(basePath, 'samples', options.from);
  const writePath = join(basePath, options.to);
  const currentFiles = readdirSync(writePath);
  const sampleFiles = readdirSync(readPath);
  const extension = options?.ext ? options.ext : dirname(options.to);

  for (const file of currentFiles) {
    rmSync(file);

  }

  for (const file of sampleFiles) {
    const output = join(writePath, basename(file, '.txt')) + `${extension}`;
    copyFileSync(join(readPath, file), output);
  }
}

/**
 * Clear Samples
 *
 * Removes all the sample from the directory
 *
 * @example
 * import test from 'ava'
 * import { samples } from '@liquify/ava/esthetic';
 *
 * test.after('samples', async () => {
 *
 *  await samples.clear('e2e/esm/liquid');
 *
 * });
 */
async function clear (path: TO) {

  const basePath = join(process.cwd(), 'tests');
  const clearPath = join(basePath, path);
  const currentFiles = readdirSync(clearPath);

  for (const file of currentFiles) {
    rmSync(file);
  }

}

export { get, clear };
