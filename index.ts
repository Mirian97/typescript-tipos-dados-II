type Endereco = {
  cep: number;
  rua: string;
  complemento?: string;
  bairro: string;
  cidade: string;
};

type Usuario = {
  nome: string;
  email: string;
  cpf: number;
  profissao?: string;
  endereco?: Endereco | null;
};

const fs = require("fs");

const leituraArquivo = (): unknown => {
  return JSON.parse(fs.readFileSync("./bd.json"));
};

const escreverArquivo = (dados: any): void => {
  fs.writeFileSync("./bd.json", JSON.stringify(dados));
};

const dadosDoUsuario: Usuario = {
  nome: "Mirian 5",
  email: "mirian@email.com",
  cpf: 34320022,
  profissao: "front",
};

const cadastrarUsuario = (dadosDoUsuario: Usuario) => {
  const arquivo = leituraArquivo() as Usuario[];
  arquivo.push(dadosDoUsuario);
  escreverArquivo(arquivo);
  return arquivo;
};

const listarUsuarios = (filtro?: string): Usuario[] => {
  const usuarios = leituraArquivo() as Usuario[];
  const usuariosFiltrados = usuarios.filter((usuario) => {
    if (filtro) {
      return usuario.profissao?.includes(filtro);
    }
    return usuario;
  });
  if (!usuariosFiltrados.length) {
    throw new Error("Não foram encontrados usuários a profissão informada.");
  }
  return usuariosFiltrados;
};

const atualizarUsuario = (cpf: number, dadosAtualizados: Usuario) => {
  const usuarios = listarUsuarios();
  const usuarioEncontrado = usuarios.find((usuario) => usuario.cpf === cpf);
  if (!usuarioEncontrado) {
    throw new Error("Usuário inexistente para este cpf");
  }
  Object.assign(usuarioEncontrado, dadosAtualizados);
  escreverArquivo(usuarios);
};

const detalharUsuario = (cpf: number): Usuario => {
  const usuarios = listarUsuarios();
  const usuarioEncontrado = usuarios.find((usuario) => usuario.cpf === cpf);
  if (!usuarioEncontrado) {
    throw new Error("Usuário inexistente para este cpf");
  }
  return usuarioEncontrado;
};

const excluirUsuario = (cpf: number): Usuario => {
  const usuarios = listarUsuarios();
  const usuarioEncontrado = usuarios.find((usuario) => usuario.cpf === cpf);
  if (!usuarioEncontrado) {
    throw new Error("Usuário inexistente para este cpf");
  }
  const excluirUsuarioEncontrado = usuarios.filter(
    (usuario) => usuario.cpf !== cpf
  );
  escreverArquivo(excluirUsuarioEncontrado);
  return usuarioEncontrado;
};

const filtrarUsuarios = (profissao: string): Usuario[] => {
  const usuarios = listarUsuarios();
  const usuariosFiltrados = usuarios.filter((usuario) =>
    usuario.profissao?.includes(profissao)
  );
  if (!usuariosFiltrados.length) {
    throw new Error("Não foram encontrados usuários a profissão informada.");
  }
  return usuariosFiltrados;
};
