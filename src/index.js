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
  const allKeys = _.union(key1, key2).sort();

  const diff = allKeys.map((node) => {
    if (_.has(filepath1, node) && _.has(filepath2, node)) {
      if (filepath1[node] === filepath2[node]) {
        return { key: node, value: filepath1[node], type: 'unchanged' };
      }

      if (filepath1[node] !== filepath2[node]) {
        return { key: node, value: filepath2[node], type: 'changed' };
      }
    }

    if (_.has(filepath1, node) && !_.has(filepath2, node)) {
      return { key: node, value: key1[node], type: 'deleted' };
    }

    if (_.has(filepath2, node) && !_.has(filepath1, node)) {
      return { key: node, value: filepath2[node], type: 'added' };
    }
  });
  return diff;
};
console.log(genDiff(filepath1, filepath2));

const render = (diff) => {
  const tree = diff.map((node) => {
    switch (node.type) {
      case 'added':
      case 'deleted':
      case 'unchanged':
        return `${symbols[node.type]}${node.key}: ${node.value}`;
      case 'changed':
        return ` - ${node.key}: ${node.oldValue}\n + ${node.key}: ${node.value}`;
      default:
        console.log('ERROR');
    }
  });

  return `{\n${tree.join('\n')}\n}`;
};
console.log(render(genDiff(filepath1, filepath2)));

export default genDiff;
