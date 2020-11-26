// if (document.querySelectorAll(".content-kuss-ads")) {
//   const Adds = Array.from(document.querySelectorAll(".content-kuss-ads"));
//   Adds.map((add) => {
//     add.remove();
//   });
// }

const hplogo = document
  .querySelector("img#hplogo")
  .classList.add("hplogo-animation");
const manifest = (document.createElement("script").src = "./manifest.json");
console.log(JSON.parse(manifest));
