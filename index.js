/**
 * Iterates over each element in an array and calls a function on it with a delay between each call.
 * @param  {Array} input  An array you wish to iterate over.
 * @param  {Number} time How many miliseconds should pass between each function call.
 * @param  {Function} fn  A function to be called on each element in the array
 * @param {Number} [index] An optional index to begin the loop at, begins at 0 by default.
 * @param {Array} [result] The result array that will be returned, you can optionally pass a starting array, each element on the input array will be passed in 1 by 1 and pushed to the result array.
 * @return {Promise} Returns a promise which will resolve as a new array with the function called against each element.
 */
function iterateWithTimeout(input, time, fn, index = 0, _result = []) {
  if (!Array.isArray(input)) throw new Error('Invalid type to iterate over!');

  const result = [..._result];
  if (index >= input.length)
    throw new Error(`Index of ${index} is too high for that array ${input}`);

  return _iterate(input, time, fn, index, result);
}

function _iterate(input, time, fn, index, result) {
  return new Promise((resolve, reject) => {
    if (index >= input.length) return resolve(result);
    try {
      result.push(fn(input[index]));

      setTimeout(() => resolve(_iterate(input, time, fn, index + 1, result)), time);
    } catch (err) {
      Promise.reject(new Error('Error with input', input));
    }
  });
}

module.exports = iterateWithTimeout;
