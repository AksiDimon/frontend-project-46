import _ from 'lodash';

const makeTree = (data1, data2) => {
  const key1 = _.keys(data1);
  const key2 = _.keys(data2);
  const allKeys = _.union(key1, key2).sort();

  const diff = allKeys.map((node) => {
    if (_.isPlainObject(data1[node]) && _.isPlainObject(data2[node])) {
      return {
        name: node,
        type: 'nested',
        children: makeTree(data1[node], data2[node]),
      };
    }
    if (_.has(data1, node) && !_.has(data2, node)) {
      return { name: node, value: data1[node], type: 'deleted' };
    }
    if (_.has(data2, node) && !_.has(data1, node)) {
      return { name: node, value: data2[node], type: 'added' };
    }
    if (!_.isEqual(data1[node], data2[node])) {
      return {
        name: node,
        value2: data2[node],
        value1: data1[node],
        type: 'changed',
      };
    }

    return { name: node, value: data1[node], type: 'unchanged' };
  });
  return diff;
};

export default makeTree;
