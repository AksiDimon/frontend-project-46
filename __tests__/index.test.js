import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');


const allFormatForCompare = [['filepath1.json', 'filepath2.json','stylish','expect.txt'],
['filepath1.yml','filepath2.yaml','stylish','expect.txt'],
['filepath1.json','filepath2.json','plain','expectPlain.txt'],
['filepath1.yml','filepath2.json','plain','expectPlain.txt'],
['filepath1.json','filepath2.json','json','expectJSON.txt'],
['filepath1.yml','filepath2.yaml','json','expectJSON.txt']];


test.each(allFormatForCompare)('compare %o',(file1, file2, format, expected) => {
  const actual = genDiff(
    getFixturePath(file1),
    getFixturePath(file2),
    format,
  );
  expect(actual).toEqual(readFile(expected));
 },
);
