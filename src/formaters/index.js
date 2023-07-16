import stylish from './stylishTree.js';

const checkFormat = (tree, format) => {
  if (format === 'stylish') {
    return stylish(tree);
  }
  if (format === 'json') {
    return JSON.stringify(tree);
  }
  return 'type is not supported';
};
export default checkFormat;
