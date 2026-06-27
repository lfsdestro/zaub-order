# Zaub Order

Fluxo de pedidos estilo e-commerce desenvolvido como solução para um desafio técnico Frontend.

A aplicação permite autenticação, consulta de produtos, busca, filtro por categoria, carrinho de compras, checkout, histórico de pedidos e detalhes completos de cada pedido.

---

# Tecnologias

- Next.js 15
- React 19
- TypeScript (Strict Mode)
- Redux Toolkit
- RTK Query
- Material UI
- React Hook Form
- Zod
- Vitest
- Testing Library
- localStorage

---

# Como executar

## Requisitos

- Node.js 20+
- npm

## Instalação

```bash
npm install
```

## Rodar em desenvolvimento

```bash
npm run dev
```

Acesse:

```
http://localhost:3000
```

## Rodar lint

```bash
npm run lint
```

## Rodar testes

```bash
npm run test:run
```

## Gerar build

```bash
npm run build
```

---

# Usuários de teste

## Administrador

Email

```
admin@zaub.com
```

Senha

```
admin123
```

Permissões

- Visualizar catálogo
- Adicionar produtos ao carrinho
- Alterar quantidades
- Remover itens
- Finalizar pedidos
- Consultar histórico
- Consultar detalhes dos pedidos

---

## Usuário somente leitura

Email

```
user@zaub.com
```

Senha

```
user123
```

Permissões

- Visualizar catálogo
- Consultar histórico
- Consultar detalhes dos pedidos

---

# Funcionalidades

- Login mockado
- Controle de permissões por perfil (RBAC)
- Catálogo de produtos utilizando DummyJSON
- Busca de produtos
- Filtro por categoria
- Paginação
- Carrinho utilizando Redux Toolkit
- Atualização de quantidade
- Remoção de itens
- Checkout
- Histórico de pedidos
- Página de detalhes do pedido
- Persistência em localStorage
- Dark Mode
- Estados de Loading
- Estados de Erro
- Empty States
- Responsividade
- Acessibilidade
- Testes unitários

---

# Funcionalidades extras implementadas

Além dos requisitos obrigatórios do desafio foram implementados:

- Dark Mode
- Controle de acesso por perfil
- Persistência em localStorage
- Página de detalhes do pedido
- Testes unitários
- RTK Query
- Responsividade Mobile First
- Melhorias de acessibilidade
- Feedback visual durante operações

---

# Arquitetura

O projeto foi organizado seguindo arquitetura baseada em Features.

```
src
├── app
├── components
├── constants
├── features
│   ├── auth
│   ├── cart
│   ├── orders
│   ├── products
│   └── theme
├── hooks
├── services
├── store
├── theme
├── types
└── utils
```

Cada feature possui sua própria organização contendo reducers, selectors, tipos e lógica de negócio.

Componentes reutilizáveis permanecem separados dentro da pasta `components`.

---

# Decisões técnicas

## Next.js App Router

Foi utilizado o App Router para aproveitar o modelo atual recomendado pelo Next.js.

## Redux Toolkit

Responsável pelo gerenciamento dos estados globais da aplicação.

Estados controlados:

- autenticação
- carrinho
- pedidos
- tema

## RTK Query

Utilizado para consumo da API pública DummyJSON.

Principais benefícios:

- cache automático
- loading
- tratamento de erro
- invalidação
- redução de boilerplate

## Material UI

Biblioteca escolhida para acelerar o desenvolvimento mantendo consistência visual e excelente suporte à acessibilidade.

## React Hook Form + Zod

Utilizados para validação de formulários com tipagem completa.

## localStorage

Responsável pela persistência de:

- usuário logado
- carrinho
- pedidos
- preferência de tema

---

# Acessibilidade

Foram implementadas diversas melhorias de acessibilidade:

- Skip Link
- landmarks semânticos (`header`, `nav`, `main`, `section`, `article`)
- aria-label
- aria-live
- foco visível
- autocomplete em formulários
- contraste adequado
- navegação por teclado
- feedback para leitores de tela

---

# Testes

Foram criados testes unitários utilizando:

- Vitest
- Testing Library

Cobertura atual:

- reducers do carrinho
- selectors do carrinho
- reducers de pedidos

---

# Trade-offs

Algumas decisões foram tomadas considerando o escopo do desafio.

## Autenticação

Foi utilizada autenticação mockada pois não havia backend disponível.

## Persistência

Pedidos e carrinho permanecem em localStorage.

## API

Foi utilizada a DummyJSON por ser uma API pública adequada para demonstração.

## Controle de acesso

Foi implementado RBAC utilizando usuários mockados para demonstrar separação de permissões.

---

# O que faria em uma evolução do projeto

- Backend real
- JWT
- Refresh Token
- Cadastro de usuários
- Painel administrativo
- Upload de imagens
- Favoritos
- Integração com gateway de pagamento
- Internacionalização (i18n)
- Testes E2E com Playwright
- GitHub Actions
- Deploy automatizado

---

# Scripts disponíveis

```bash
npm run dev
npm run lint
npm run test:run
npm run build
npm run start
```