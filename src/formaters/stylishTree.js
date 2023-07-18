const replacer = ' ';
const getIndent = (depth) => replacer.repeat(depth * 4 - 2);

const stringify = (data, depth = 1) => {
  if (typeof data !== 'object' || data === null) {
    return `${String(data)}`;
  }
  const entries = Object.entries(data);
  const lines = entries.map(
    ([node, value]) => `${getIndent(depth)}  ${node}: ${stringify(value, depth + 1)}`,
  );
  const result = ['{', ...lines, `${getIndent(depth - 1)}  }`].join('\n');
  return result;
};

const stylish = (tree) => {
  const iter = (currentValue, depth) => {
    const lastIndent = depth === 1 ? '' : `${getIndent(depth - 1)}  `;
    const values = Object.values(currentValue);
    const lines = values.map((val) => {
      const firstIndent = getIndent(depth);
      const {
        type, name, value, value1, value2, children,
      } = val;

      switch (type) {
        case 'nested':
          return `${firstIndent}  ${name}: ${iter(children, depth + 1)}`;
        case 'added':
          return `${firstIndent}+ ${name}: ${stringify(value, depth + 1)}`;
        case 'deleted':
          return `${firstIndent}- ${name}: ${stringify(value, depth + 1)}`;
        case 'changed':
          return `${firstIndent}- ${name}: ${stringify(
            value1,
            depth + 1,
          )}\n${getIndent(depth)}+ ${name}: ${stringify(value2, depth + 1)}`;
        default:
          return `${firstIndent}  ${name}: ${stringify(value, depth + 1)}`;
      }
    });
    return ['{', ...lines, `${lastIndent}}`].join('\n');
  };
  return iter(tree, 1);
};
export default stylish;
