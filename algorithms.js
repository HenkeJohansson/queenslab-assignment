const generateRandomString = (length) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  const resultArray = Array(length);

  for (let i = 0; i < length; i++) {
    resultArray[i] = characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return resultArray.join("");
};

// Text (30min)
// "ffdttttyy" should return "ffdtttyy"
// "iiikigggg" should return "iiikiggg"
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
const stressTestString = generateRandomString(2000000);
const startTime1 = performance.now();
const outputText = stringFunction(stressTestString);
const endTime1 = performance.now();
const executionTime1 = `${endTime1 - startTime1}ms`;
console.log("outputNumbers", outputText, executionTime1);

// Arrays (30min)
// [19, 2, 42, 18] should return 61
// [61, 32, 51] should return 93
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
// const stressTestArr = Array.from({ length: 2000000 }, () => Math.floor(Math.random() * 1500000));
// const startTime2 = performance.now();
// const outputNumbers = arrayFunction(stressTestArr);
// const endTime2 = performance.now();
// const executionTime2 = `${endTime2 - startTime2}ms`;
// console.log("outputNumbers", outputNumbers, executionTime);

const arrayFunctionInefficient = (numbers) => {
  let highestOddNumber = 0;
  const orderedNumbers = numbers.sort((a, b) => b - a);

  for (let i = 0; i < orderedNumbers.length; i++) {
    const higherNumber = orderedNumbers[i];

    for (let j = i + 1; j < orderedNumbers.length; j++) {
      const lowerNumber = orderedNumbers[j];
      const result = higherNumber + lowerNumber;
      if (result % 2) {
        // return result;
        if (result > highestOddNumber) {
          highestOddNumber = result;
        }
      }
    }
  }

  return highestOddNumber;
};
// const output2 = arrayFunctionInefficient(stressTestArr);
// console.log("output2", output);
