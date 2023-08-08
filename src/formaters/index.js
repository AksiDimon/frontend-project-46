import getPlain from './plain.js';
import stylish from './stylishTree.js';

const checkFormat = (tree, format) => {
  if (format === 'stylish') {
    return stylish(tree);
  }
  if (format === 'json') {
    return JSON.stringify(tree);
  }
  if (format === 'plain') {
    return getPlain(tree);
  }
  throw new Error(`Unknown order state: ${format}!`);
};
export default checkFormat;
