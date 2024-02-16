# Sistema de Gerenciamento de Fazendas e Gados

O Sistema de Gerenciamento de Fazendas e Gados é feito para ajudar fazendeiros a gerenciar suas fazendas e gados de forma mais eficiente. Com ele é possível realizar o cadastro de gados, dietas e pesagens dos animais, além de gerar relatórios para análises de produtividade dos animais.

## Tecnologias Utilizadas

- **Next.js**: Framework de React para produção.
- **Prisma**: ORM para consultas de banco de dados.
- **TailwindCSS**: Framework de CSS para design rápido e responsivo.
- **PostgreSQL**: Sistema de gerenciamento de banco de dados relacional.

## Funcionalidades

As principais funcionalidades do sistema são:

- Gerenciamento de gados e dietas (cadastro, edição, exclusão).
- Monitoramento de produtividade dos animais.
- Gestão de lotes da fazenda.
- Relatórios e análises.

## Instalação e Execução

Instruções passo a passo sobre como configurar o ambiente de desenvolvimento e executar o projeto localmente.

### Pré-requisitos

- Node.js (20 ou maior)
- PostgreSQL
- npm

### Configuração

```bash
# Clone o repositório
git clone https://github.com/pedroddjkkk/ProjetoFazenda.git

# Instale as dependências
cd ProjetoFazenda
npm install

# Configure o banco de dados e o JWT no .env
# Instruções para configurar o PostgreSQL e o Prisma
npx prisma migrate dev

# Execute o projeto
npm run dev
```


## Imagens do Projeto

![Lista de Usuários](/images/main.png)
![Cadastro de Pesagens](/images/pesagem.png)

## Contato

Pedro Valério - contato@pedrovalerio.com

Link do Projeto: [fazenda](https://github.com/pedroddjkkk/ProjetoFazenda)