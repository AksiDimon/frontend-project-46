import { readFileSync } from 'node:fs';
import path from 'node:path';
import parse from './parsers.js';
import makeTree from './buildTree.js';
import checkFormat from './formaters/index.js';

const buildFixturesPath = (fileName) => path.resolve('__fixtures__', fileName);

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const rawData1 = readFileSync(buildFixturesPath(filepath1), 'utf-8');
  const rawData2 = readFileSync(buildFixturesPath(filepath2), 'utf-8');

  const extension1 = path.extname(filepath1).slice(1);
  const extension2 = path.extname(filepath2).slice(1);

  const parsedData1 = parse(rawData1, extension1);
  const parsedData2 = parse(rawData2, extension2);

  const result = makeTree(parsedData1, parsedData2);
  return checkFormat(result, format);
};

// console.log(genDiff('filepath1.json', 'filepath2.yml'));
// const parsedPath = path.parse('src/files/config.json').dir;
// console.log(parsedPath);

export default genDiff;
