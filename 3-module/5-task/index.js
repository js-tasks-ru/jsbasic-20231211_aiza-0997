function getMinMax(str) {
  numbersArray = str.split(" ").map(item => Number(item)).filter(item => !isNaN(item));

  return {
    min : Math.min(...numbersArray),
    max : Math.max(...numbersArray)
  }
}