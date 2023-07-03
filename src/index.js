import _ from 'lodash';
import { readFileSync } from 'fs';
import path from 'path';

const buildFixturesPath = (fileName) => path.resolve('__fixtures__', fileName);

const genDiff = (filepath1, filepath2) => {
  const data1 = readFileSync(buildFixturesPath(filepath1), 'utf-8');
  const data2 = readFileSync(buildFixturesPath(filepath2), 'utf-8');

  const dataParse1 = JSON.parse(data1);
  const dataParse2 = JSON.parse(data2);

  const key1 = _.keys(dataParse1);
  const key2 = _.keys(dataParse2);
  const allKeys = _.union(key1, key2);
  console.log(allKeys);

  const diff = {};

  for (const key of allKeys) {
    switch (true) {
      case !key1.includes(key):
        diff[`+ ${key}`] = dataParse2[key];
        break;
      case !key2.includes(key):
        diff[`- ${key}`] = dataParse1[key];
        break;
      case dataParse1[key] !== dataParse2[key]:
        diff[`- ${key}`] = dataParse1[key];
        diff[`+ ${key}`] = dataParse2[key];
        break;
      case dataParse1[key] === dataParse2[key]:
        diff[`  ${key}`] = dataParse1[key];
        break;
      default:
        break;
    }
  }
  return diff;
};
export default genDiff;
