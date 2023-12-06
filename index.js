const prompt = require("prompt-sync")();
const fs = require("fs");

let especies = [];
let portes = [];
let continentes = [];

function adicionar() {
  console.log("\nAdicionar Aves");
  console.log("--------------------");

  const e = prompt("Espécie: ");
  const p = prompt("Tamanho (porte): ");
  const c = prompt("Continente: ");

  especies.push(e.toUpperCase());
  portes.push(p.toUpperCase());
  continentes.push(c.toUpperCase());

  console.log("Ave cadastrada com sucesso." + `${e + p + c}`);
}

function listar() {
  console.log("\nAves:");
  console.log("---------------------------------");

  console.log("\nEspécie.............:  Porte.........:  Continente:");

  for (let i = 0; i < especies.length; i++) {
    console.log(
      `${especies[i].padEnd(14)} ${portes[i].padEnd(15)} ${continentes[i]}`
    );
  }
}

function pesq_especie() {
  console.log("\nPesquisa por Espécie");
  console.log("------------------");

  const pesquisa = prompt("Espécie: ");

  console.log("\nEspécie.............:  Porte.........:  Continente:");

  let contador = 0;
  for (let i = 0; i < especies.length; i++) {
    if (especies[i].toUpperCase() == pesquisa.toUpperCase()) {
      console.log(`${especies[i] + portes[i] + continentes[i]}`);
      contador = contador + 1;
    }
  }

  if (contador == 0) {
    console.log("Erro: nenhuma espécie encontrada.");
  }
}

function alterar() {
  const opcao = prompt("Alterar o\n1. Nome\n2. Porte\n3. Continente\n- ");

  console.log("De qual ave?");

  let i = 1;
  especies.forEach((ave) => {
    console.log(`${i}. ${ave}`);
    i++;
  });

  const ave = prompt("- ");

  const alteracao = prompt(`Novo valor: `);

  if (opcao == 1) {
    especies[ave - 1] = alteracao.toUpperCase();
  } else if (opcao == 2) {
    portes[ave - 1] = alteracao.toUpperCase();
  } else if (opcao == 3) {
    continentes[ave - 1] = alteracao.toUpperCase();
  } else {
    console.log("Invalid Input");
  }
}

function excluir() {
  console.log("\nExcluir Aves");
  console.log("--------------------");

  const opcao = prompt(
    `Excluir aves:\n1. Todas as aves\n2. Selecionar a ave\n3. Cancelar\n- `
  );

  if (opcao == 1) {
    especies = [];
    portes = [];
    continentes = [];
  } else if (opcao == 2) {
    console.log("Qual ave?\n");

    let i = 1;
    especies.forEach((ave) => {
      console.log(`${i}. ${ave}`);
      i++;
    });

    const escolha = Number(prompt("- "));

    especies.splice(escolha - 1);
    portes.splice(escolha - 1);
    continentes.splice(escolha - 1);
  } else if (opcao == 3) {
    return;
  }
}

function gravarDados() {
  const aves = [];
  for (let i = 0; i < especies.length; i++) {
    aves.push(especies[i] + "; " + portes[i] + "; " + continentes[i]);
  }

  fs.writeFileSync("data/aves.txt", aves.join("\n"));

  console.log("Dados salvos com sucesso.");
}

function carregarDados() {
  if (fs.existsSync("data/aves.txt")) {
    const aves = fs.readFileSync("data/aves.txt", "utf8").split("\n");

    for (let i = 0; i < aves.length; i++) {
      const ave = aves[i].split(";");

      especies.push(ave[0]);
      portes.push(ave[1]);
      continentes.push(ave[2]);
    }
  }
}

// chama "antes de tudo"
carregarDados();

do {
  const input = prompt(
    "\n1. Adicionar Aves \n2. Listar Aves \n3. Pesquisa por Espécie \n4. Agrupar por [...] \n5. Alterar Aves \n6. Excluir Aves \n7. Finalizar\n- "
  );
  if (input == 1) {
    adicionar();
    gravarDados();
  } else if (input == 2) {
    listar();
  } else if (input == 3) {
    pesq_especie();
  } else if (input == 4) {
    console.log("Não funcional");
  } else if (input == 5) {
    alterar();
    gravarDados();
  } else if (input == 6) {
    excluir();
    gravarDados();
  } else if (input == 7) {
    break;
  }
} while (true);

// chama a função que salva os dados dos vetores no arquivo
gravarDados();
