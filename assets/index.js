document.querySelector(".exit-button").addEventListener("click", () => {
  window.close();
});
document.querySelector(".start-button").addEventListener("click", () => {
  document.querySelector("#initial-page").classList.add("d-none");
  document.querySelector("#game-page").classList.remove("d-none");
});
