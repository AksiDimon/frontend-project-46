const checkValue = (node) => {
  if (node === null) {
    return null;
  }
  if (typeof node === 'string') {
    return `'${node}'`;
  }
  if (typeof node === 'object' && node !== null) {
    return '[complex value]';
  }
  return String(node);
};

const getPlain = (value) => {
  const iter = (tree, format) => {
    const result = tree.flatMap((val) => {
      switch (val.type) {
        case 'added':
          return `Property '${format}${
            val.name
          }' was added with value: ${checkValue(val.value)}`;
        case 'deleted':
          return `Property '${format}${val.name}' was removed`;
        case 'changed':
          return `Property '${format}${
            val.name
          }' was updated. From ${checkValue(val.value1)} to ${checkValue(
            val.value2
          )}`;
        case 'nested':
          return iter(val.children, `${format}${val.name}.`);
        default:
          return [];
      }
    });
    return result.join('\n');
  };
  return iter(value, '');
};
export default getPlain;
