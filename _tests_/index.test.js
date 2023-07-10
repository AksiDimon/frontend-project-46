import genDiff from '../src';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) =>
  path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) =>
  fs.readFileSync(getFixturePath(filename), 'utf-8');

test('compaer flat tree', () => {
  const actualJson = genDiff(
    getFixturePath('filepath1.json'),
    getFixturePath('filepath2.json')
  );
  expect(actualJson).toEqual(readFile('expect.txt'));
});
