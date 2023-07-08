import genDiff from '../src';
import fs from 'fs';
import path from 'path';

const findingfile1 = '../__fixtures__/filepath1.json';
const findingfile2 = '../__fixtures__/filepath2.json';

const result = fs.readFileSync(
  path.resolve(process.cwd(), '__fixtures__/expect.txt'),
  'utf-8'
);

test('compaer flat tree', () => {
  const actual = genDiff(findingfile1, findingfile2);
  expect(actual).toEqual(result);
});
