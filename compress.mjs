import { createRequire } from 'module';
import { readdirSync, statSync } from 'fs';
import { join } from 'path';

const require = createRequire(import.meta.url);
const sharp = require('sharp');

const dir = './sandal.pic';
const files = readdirSync(dir).filter(f => f.endsWith('.png'));

for (const f of files) {
  const input  = join(dir, f);
  const output = join(dir, f.replace('.png', '.jpg'));
  await sharp(input)
    .resize({ width: 1400, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(output);
  const before = statSync(input).size;
  const after  = statSync(output).size;
  console.log(`${f}: ${Math.round(before/1024)}KB → ${Math.round(after/1024)}KB`);
}
console.log('Done!');
