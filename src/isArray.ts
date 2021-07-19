const isArray =
  Array.isArray ||
  function (arr: unknown): arr is Array<any> {
    return {}.toString.call(arr) === "[object Array]";
  };
export default isArray;
