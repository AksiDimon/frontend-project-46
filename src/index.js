import { readFileSync } from 'node:fs';
import path from 'node:path';
import parse from './parsers.js';
import makeTree from './buildTree.js';
import checkFormat from './formaters/index.js';

const buildFixturesPath = (fileName) => path.resolve(process.cwd(), fileName);

const getData = (filepath, extention) => {
  const rawData = readFileSync(buildFixturesPath(filepath), 'utf-8');
  const parsedData = parse(rawData, extention);
  return parsedData;
}

const getFileExtention = (file) => {
  return path.extname(file).slice(1);
}


const genDiff = (filepath1, filepath2, format = 'stylish') => {

  const extention1 = getFileExtention(filepath1);
  const extention2 = getFileExtention(filepath2)

  const parsedData1 = getData(filepath1, extention1);
  const parsedData2 = getData(filepath2, extention2);

  const result = makeTree(parsedData1, parsedData2);
  return checkFormat(result, format);
};

export default genDiff;
