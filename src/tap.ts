import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

writeFileSync(join(process.cwd(), 'node_modules', '.cache', 'cases.txt'), '0');
