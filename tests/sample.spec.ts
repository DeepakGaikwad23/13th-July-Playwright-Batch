//create a function to perform addition of two numbers array 
function addNumbersArray(arr1: number[], arr2: number[]): number[] {
  return arr1.map((num, index) => num + arr2[index]);
}