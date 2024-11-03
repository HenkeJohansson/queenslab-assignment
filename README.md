# queenslab-assignment

## Algorithms

### String

```javascript
const stringFunction = (string, maxIdenticalCharsinRow) => {
  const formattedString = [];
  const lastXChars = [];

  for (let i = 0; i < string.length; i++) {
    currentChar = string[i];
    lastXChars.push(currentChar);
    // keep only the latest X characters so we later can check if we can add the current char
    lastXChars.splice(-maxIdenticalCharsinRow - 1, lastXChars.length - maxIdenticalCharsinRow);
    const isLastXCharsTheSame =
      lastXChars.length < maxIdenticalCharsinRow - 1 ? false : lastXChars.every((char, idx, arr) => char === arr[0]);

    if (!isLastXCharsTheSame) {
      // building new array because editing in an existing array is slower
      formattedString.push(currentChar);
    }
  }

  return formattedString.join("");
};
```

### Array

```javascript
const arrayFunction = (numbers) => {
  const orderedNumbers = numbers.sort((a, b) => b - a);

  for (let i = 0; i < orderedNumbers.length; i++) {
    const higherNumber = orderedNumbers[i];

    // No point in trying with the higher number again
    // and it won't add it by it self
    for (let j = i + 1; j < orderedNumbers.length; j++) {
      const lowerNumber = orderedNumbers[j];
      const result = higherNumber + lowerNumber;
      if (result % 2) {
        // Because of ordering the array with highest to lowest
        // just return the first result that is odd
        return result;
      }
    }
  }

  return orderedNumbers;
};
```
