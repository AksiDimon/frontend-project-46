import _ from 'lodash';
import { readFileSync } from 'fs';
import path from 'path';

const buildFixturesPath = (fileName) => path.resolve('__fixtures__', fileName);

const symbols = {
  added: ' + ',
  deleted: ' - ',
  unchanged: '   ',
};

const genDiff = (filepath1, filepath2) => {
  const data1 = readFileSync(buildFixturesPath(filepath1), 'utf-8');
  const data2 = readFileSync(buildFixturesPath(filepath2), 'utf-8');

  let dataParse1;
  let dataParse2;

  if (filepath1.endsWith('.json')) {
    dataParse1 = JSON.parse(data1);
  } else if (filepath1.endsWith('.yml') || filepath1.endsWith('.yaml')) {
    dataParse1 = YAML.parse(data1);
  } else {
    throw new Error('Unsupported file format');
  }

  if (filepath2.endsWith('.json')) {
    dataParse2 = JSON.parse(data2);
  } else if (filepath2.endsWith('.yml') || filepath2.endsWith('.yaml')) {
    dataParse2 = YAML.parse(data2);
  } else {
    throw new Error('Unsupported file format');
  }

  const key1 = _.keys(dataParse1);
  const key2 = _.keys(dataParse2);
  const allKeys = _.union(key1, key2).sort();

  const diff = allKeys.map((node) => {
    if (_.has(dataParse1, node) && _.has(dataParse2, node)) {
      if (dataParse1[node] === dataParse2[node]) {
        return { key: node, value: dataParse1[node], type: 'unchanged' };
      }

      if (dataParse1[node] !== dataParse2[node]) {
        return {
          key: node,
          value: dataParse2[node],
          oldValue: dataParse1[node],
          type: 'changed',
        };
      }
    }

    if (_.has(dataParse1, node) && !_.has(dataParse2, node)) {
      return { key: node, value: dataParse1[node], type: 'deleted' };
    }

    if (_.has(dataParse2, node) && !_.has(dataParse1, node)) {
      return { key: node, value: dataParse2[node], type: 'added' };
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
export default genDiff;
