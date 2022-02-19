type TCreateArrayFromObject = (object: object, idName?: string) => string[];

/**
 * Creates and returns an array from the selected object
 * @param {object} obj - The object that will be returned as an array
 * @param {string} idName - name of an additional key in the object
 */
export const createArrayFromObject: TCreateArrayFromObject = (obj, idName) => {
  const list = [];

  if (idName) {
    for (let key in obj) {
      list.push({
        // @ts-ignore
        ...obj[key],
        [idName]: key,
      });
    }

    return list;
  }

  for (let key in obj) {
    // @ts-ignore
    list.push(obj[key]);
  }

  return list;
};

type TArray = string[];
type TGetMatchesAcrossArrays = (
  firstArray: TArray,
  secondArray: TArray
) => TArray;

/**
 * The function will return matches across arrays
 * @param {array} firstArray - array
 * @param {array} secondArray - array
 */
export const getMatchesAcrossArrays: TGetMatchesAcrossArrays = (
  firstArray,
  secondArray
) => {
  const firstSet = new Set(firstArray);
  const secondSet = new Set(secondArray);

  return [...firstSet].filter((x) => secondSet.has(x));
};
