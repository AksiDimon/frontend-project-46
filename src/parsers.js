let dataParse1;
let dataParse2;
const getParth = (filepath1, filepath2, data1, data2) => {
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
};
export default getParth;