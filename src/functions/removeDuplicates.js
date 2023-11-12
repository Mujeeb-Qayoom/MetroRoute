module.exports = {

removeDuplicates : (arr,property) => {
    const uniqueMap = new Map();
  const result = [];

  for (const item of arr) {
    const key = item[property];

    if (!uniqueMap.has(key)) {
      uniqueMap.set(key, true);
      result.push(item);
    }
  }

  return result;
}
}