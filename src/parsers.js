import yamlParser from 'js-yaml';


const parse = (data, type) => {
  switch (type) {
    case 'json':
      return JSON.parse(data);
    case 'yaml':
    case 'yml':
      return yamlParser.load(data);
    default:
      throw new Error(`Unknown order state: ${type}!`);
  }
};

export default parse;
