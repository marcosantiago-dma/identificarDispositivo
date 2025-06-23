<h1 align="center">
    <img alt="Bloquear Inputs" src=".github/dma-logo.png" height="100px" />
    <br>Identificar Dispositivo<br/>
    ReactJS
</h1>

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/marcosantiago-dma/identificarDispositivo?style=flat-square">

  <img alt="Made by" src="https://img.shields.io/badge/made%20by-santiagoidu-%23063386?style=flat-square">
</p>

<p align="center">
  <a href="#bookmark-sobre">Sobre</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#rocket-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#wrench-como-usar">Como Usar</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#octocat-como-contribuir">Como Contribuir</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-licença">Licença</a>
</p>

<p align="center">
  <img alt="Demonstração do projeto" width="650px" src=".github/demo.png" />
</p>

## :bookmark: Sobre

Este projeto consiste em uma aplicação desenvolvida em React.js que tem como principal objetivo **identificar de forma única e persistente cada dispositivo que acessa o sistema**, mesmo antes do processo de login e independentemente de reinicializações ou desligamentos do equipamento. Para alcançar essa identificação, o projeto utiliza uma biblioteca especializada de fingerprinting disponível via npm, que coleta e analisa diversas características do ambiente do navegador do usuário.

Principais funcionalidades:
- Identificação única de cada dispositivo que acessa o sistema, utilizando técnicas de fingerprinting do navegador.
- Geração de um identificador persistente para o dispositivo, que permanece o mesmo mesmo após reinicializações ou desligamentos.
Realização da identificação do dispositivo antes do processo de login do usuário, permitindo o reconhecimento do equipamento desde o primeiro acesso.
- Auxílio na prevenção de múltiplos cadastros ou tentativas de fraude, associando cada dispositivo a um único identificador.
- Aumento da segurança e do controle de acesso ao sistema, possibilitando monitoramento detalhado dos dispositivos conectados.
- Funcionamento transparente para o usuário, sem necessidade de instalação de aplicativos ou permissões adicionais, operando diretamente no navegador.

## :rocket: Tecnologias

- [ReactJS](https://reactjs.org/)
- [JavaScript (ES6+)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [CSS3](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
- [Vercel](https://vercel.com/) (deploy)

## :wrench: Como Usar

1. **Clone o repositório:**
   ```sh
   git clone https://github.com/marcosantiago-dma/identificarDispositivo.git
   cd blockInput
   ```

2. **Instale as dependências:**
   ```sh
   npm install
   # ou
   yarn
   ```

3. **Inicie o projeto:**
   ```sh
   npm start
   # ou
   yarn start
   ```

4. **Acesse:**  
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

5. **Deploy:**  
   O deploy pode ser feito facilmente na [Vercel](https://vercel.com/).

## :octocat: Como Contribuir

- Faça um fork do projeto
- Crie uma branch para sua feature (`git checkout -b feat/minha-feature`)
- Commit suas alterações (`git commit -m 'feat: minha nova feature'`)
- Push para a branch (`git push origin feat/minha-feature`)
- Abra um Pull Request

## :memo: Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

---
<h2 align="center">Projeto desenvolvido por DMA Distribuidora S/A</h2>
<p align="center">
  <a href="https://grupodma.com.br" target="_blank">www.grupodma.com.br</a>
</p>
