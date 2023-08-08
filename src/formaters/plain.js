const stringify = (node) => {
  if (node === null) {
    return null;
  }
  if (typeof node === 'string') {
    return `'${node}'`;
  }
  if (typeof node === 'object' && node !== null) {
    return '[complex value]';
  }
  return node;
};

const getPlain = (value) => {
  const iter = (tree, format) => {
    const result = tree.flatMap((val) => {
      switch (val.type) {
        case 'added':
          return `Property '${format}${
            val.name
          }' was added with value: ${stringify(val.value)}`;
        case 'deleted':
          return `Property '${format}${val.name}' was removed`;
        case 'changed':
          return `Property '${format}${
            val.name
          }' was updated. From ${stringify(val.value1)} to ${stringify(
            val.value2,
          )}`;
        case 'nested':
          return iter(val.children, `${format}${val.name}.`);
        case 'unchanged':
            return null;
        default:
          throw new Error(`Unknown order state!: ${val.type}!`);
      }
    });
    return result.filter((val) => val !== null).join('\n');
  };
  return iter(value, '');
};
export default getPlain;
