function factorial(n) {
  let result = 1;
  for (n; n > 1; n = n-1) {
    result = result * n;
  }
  return result;
}