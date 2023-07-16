import _ from 'lodash';

const makeTree = (parsedData1, parsedData2) => {
  const key1 = _.keys(parsedData1);
  const key2 = _.keys(parsedData2);
  const allKeys = _.union(key1, key2).sort();

  const diff = allKeys.map((node) => {
    if (_.isObject(parsedData1[node]) && _.isObject(parsedData2[node])) {
      return {
        name: node,
        type: 'nested',
        children: makeTree(parsedData1[node], parsedData2[node]),
      };
    }
    if (_.has(parsedData1, node) && !_.has(parsedData2, node)) {
      return { name: node, value: parsedData1[node], type: 'deleted' };
    }
    if (_.has(parsedData2, node) && !_.has(parsedData1, node)) {
      return { name: node, value: parsedData2[node], type: 'added' };
    }
    if (parsedData1[node] !== parsedData2[node]) {
      return {
        name: node,
        value2: parsedData2[node],
        value1: parsedData1[node],
        type: 'changed',
      };
    }

    return { name: node, value: parsedData1[node], type: 'unchanged' };
  });
  return diff;
};

export default makeTree;
