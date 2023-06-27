# Projeto Portal Imperial

Este e um projeto desenvolvido para a criação das carteirinhas digitais para a Atletica Imperial. Onde é possível cadastrar novos membros, visualizar a lista de membros atuais e etc.

## para rodar o projeto

1. Antes de iniciar o projeto, é necessário configurar as variáveis de ambiente. Para isso, copie o ``.env.example`` para ``.env`` e preencha as variáveis de acordo com o ambiente.

```bash
cp .env.example .env # Linux/Macos
copy .env.example .env # Windows
```

2. Rode as migrations para criar as tabelas do banco de dados

```bash
npx sequelize-cli db:migrate

```

3. Caso esteja em Development, rode as seeders para ter dados para testes

```bash
npx sequelize-cli db:seed:all
```

## Execução

1. Inicie o servidor com

```bash
node .
```

## pendencias

- Adicionar um algoritmo de verificação de caso a filiação esteja vencida, alterar o a Bollean Active para False, e ?excluir o dado da data?, caso usuário tente logar avisar que a filiação venceu.
- corrigi como esta salvando a foto de perfil na tabela
- criar controller/route para adicao do titulos nos usuarios

### versao 2.0

versao para fins comercias, venda para outras atleticas.

- adicao do controller/route para os ``users`` com ``role admin/diretoria``? # dashboard
- especie de qrcode para ganhar cargo automatico no evento?
- renovacao da filiacao direto pelo site? integracao api payments?
