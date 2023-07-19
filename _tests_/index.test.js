import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('compaer Json nested tree', () => {
  const actual1 = genDiff(
    getFixturePath('filepath1.json'),
    getFixturePath('filepath2.json'),
    'stylish',
  );
  expect(actual1).toEqual(readFile('expect.txt'));
});
test('compaer Yml and Yaml nested tree', () => {
  const actual2 = genDiff(
    getFixturePath('filepath1.yml'),
    getFixturePath('filepath2.yaml'),
    'stylish',
  );
  expect(actual2).toEqual(readFile('expect.txt'));
});
test('compaer Json to plain tree', () => {
  const actual3 = genDiff(
    getFixturePath('filepath1.json'),
    getFixturePath('filepath2.json'),
    'plain',
  );
  expect(actual3).toEqual(readFile('expectPlain.txt'));
});
test('compaer Yml and Json to plain tree', () => {
  const actual4 = genDiff(
    getFixturePath('filepath1.yml'),
    getFixturePath('filepath2.json'),
    'plain',
  );
  expect(actual4).toEqual(readFile('expectPlain.txt'));
});
test('compaer Json to Json tree', () => {
  const actual3 = genDiff(
    getFixturePath('filepath1.json'),
    getFixturePath('filepath2.json'),
    'json',
  );
  expect(actual3).toEqual(readFile('expectJSON.txt'));
});
test('compaer Yml to Json tree', () => {
  const actual3 = genDiff(
    getFixturePath('filepath1.yml'),
    getFixturePath('filepath2.yaml'),
    'json',
  );
  expect(actual3).toEqual(readFile('expectJSON.txt'));
});
