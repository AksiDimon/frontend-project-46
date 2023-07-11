import { readFileSync } from 'node:fs';
import path from 'node:path';
import _ from 'lodash';
import parse from './parsers.js';

const buildFixturesPath = (fileName) => path.resolve('__fixtures__', fileName);

const symbols = {
  added: ' + ',
  deleted: ' - ',
  unchanged: '   ',
};

const genDiff = (filepath1, filepath2) => {
  const rawData1 = readFileSync(buildFixturesPath(filepath1), 'utf-8');
  const rawData2 = readFileSync(buildFixturesPath(filepath2), 'utf-8');

  const extension1 = path.extname(filepath1).slice(1);
  const extension2 = path.extname(filepath2).slice(1);

  let parsedData1 = parse(rawData1, extension1);
  let parsedData2 = parse(rawData2, extension2);

  const key1 = _.keys(parsedData1);
  const key2 = _.keys(parsedData2);
  const allKeys = _.union(key1, key2).sort();

  const diff = allKeys.map((node) => {
    if (_.has(parsedData1, node) && _.has(parsedData2, node)) {
      if (parsedData1[node] === parsedData2[node]) {
        return { key: node, value: parsedData1[node], type: 'unchanged' };
      }

      if (parsedData1[node] !== parsedData2[node]) {
        return {
          key: node,
          value: parsedData2[node],
          oldValue: parsedData1[node],
          type: 'changed',
        };
      }
    }

    if (_.has(parsedData1, node) && !_.has(parsedData2, node)) {
      return { key: node, value: parsedData1[node], type: 'deleted' };
    }

    if (_.has(parsedData2, node) && !_.has(parsedData1, node)) {
      return { key: node, value: parsedData2[node], type: 'added' };
    }
  });

  const tree = diff.map((node) => {
    switch (node.type) {
      case 'added':
      case 'deleted':
      case 'unchanged':
        return `${symbols[node.type]}${node.key}: ${node.value}`;
      case 'changed':
        return ` - ${node.key}: ${node.oldValue}\n  + ${node.key}: ${node.value}`;
      default:
        console.log('ERROR');
    }
  });
  return `{\n ${tree.join('\n ')}\n}`;
};

// console.log(genDiff('filepath1.json', 'filepath2.yml'));
// const parsedPath = path.parse('src/files/config.json').dir;
// console.log(parsedPath);

export default genDiff;
