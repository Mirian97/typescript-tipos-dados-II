// const fs = require("fs");

// const lerJson = (): unknown => {
//   return JSON.parse(fs.readFileSync("./bd.json"));
// };

// const escreverJson = (obj: { nome: string }): void => {
//   let arquivoLido = lerJson() as { nome: string }[];
//   arquivoLido.push(obj);
//   fs.writeFileSync("./bd.json", JSON.stringify(arquivoLido));
// };

// escreverJson({ nome: "Paulo" });
// console.log(lerJson());
