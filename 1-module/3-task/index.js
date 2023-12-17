function ucFirst(str) {
  if (str) {
    if (str.length === 1) {
      return str.toUpperCase();
    } else {
      return str[0].toUpperCase() + str.slice(1);
    }
  } else {
    return str;
  }
}