# iterateWithTimeout

Loops through every item in an array (or optionally skips some) and calls a function against each element, using a timeout you pass in. Returns a promise which resolves to a `new` array.

For when you want to asyncronously iterate over an array with a delay, but also get the result from the function being called.

### Example usage

#

Simply using it to loop and do something with an interval between each call

```javascript
async function getData() {
  const newArray = await iterateWithTimeout([1, 2, 3, 4, 5], 1000, x => x + 100);
  console.log(newArray); // 5 seconds later.. [ 101, 102, 103, 104, 105 ]
}
```

Optionally skipping over indexes at the start, it will not need to be called on the first 5 elements so it only takes 1 second, doesn't return the elements it skipped over.

```javascript
async function getData() {
  const newArray = await iterateWithTimeout([0, 0, 0, 0, 0, 600], 1000, x => x + 100, 5);
  console.log(newArray); // 1 second later -> [ 700 ]
}
```

```javascript
async function getData() {
  const array = [0, 0, 0, 0, 0];
  const newArray = await iterateWithTimeout([100, 200, 300, 400], 1000, x => x + 100, 0, array);

  console.log(newArray); // 4 seconds later -> [ 0, 0, 0, 0, 0, 200, 300, 400, 500 ]
  console.log(array); // [0,0,0,0,0], array is not mutated and we returned a new one.
}
```

Simplified by passing in variables to make it readable.

```javascript
async function getData() {
  const array = [0, 0, 0, 0, 0];
  const input = [100, 200, 300, 400];
  const delay = 1000;
  const addFifty = x => x + 50;

  const newArray = await iterateWithTimeout(input, delay, addFifty, 0, array);

  console.log(newArray); // 4 seconds later -> [ 0, 0, 0, 0, 0, 150, 250, 350, 450 ]
  console.log(array); // [0,0,0,0,0], array is not mutated and we returned a new one.
}
```
