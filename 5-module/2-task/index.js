function toggleText() {
  let btn = document.querySelector(".toggle-text-button");

  btn.addEventListener('click', () => {
    let text = document.querySelector("#text");
    if (text.hidden) {
      text.hidden = false;
    } else {
      text.hidden = true;
    }
  })
}
