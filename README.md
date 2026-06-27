# Zaub Order

Aplicação de fluxo de pedidos desenvolvida como solução para um desafio técnico Frontend.

O projeto simula um pequeno e-commerce com autenticação, catálogo de produtos, carrinho de compras, checkout e histórico de pedidos, utilizando uma arquitetura moderna baseada em **Next.js App Router**, **Redux Toolkit** e **RTK Query**.

---

# Demonstração

## Funcionalidades

- Autenticação mockada
- Controle de acesso por perfil (RBAC)
- Catálogo de produtos
- Busca por produtos
- Filtro por categoria
- Paginação
- Carrinho de compras
- Checkout
- Histórico de pedidos
- Detalhes do pedido
- Persistência em localStorage
- Dark Mode
- Responsividade
- Acessibilidade
- Testes unitários

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

## Executar em desenvolvimento

```bash
npm run dev
```

Aplicação disponível em:

```
http://localhost:3000
```

---

## Lint

```bash
npm run lint
```

---

## Testes

```bash
npm run test:run
```

---

## Build de produção

```bash
npm run build
```

---

# Usuários de teste

## Administrador

**Email**

```
admin@zaub.com
```

**Senha**

```
admin123
```

### Permissões

- Visualizar catálogo
- Adicionar produtos ao carrinho
- Alterar quantidades
- Remover produtos
- Finalizar pedidos
- Consultar histórico
- Consultar detalhes dos pedidos

---

## Usuário somente leitura

**Email**

```
user@zaub.com
```

**Senha**

```
user123
```

### Permissões

- Visualizar catálogo
- Consultar histórico
- Consultar detalhes dos pedidos

---

# Arquitetura

O projeto foi organizado utilizando separação por responsabilidade.

```
src
├── app
├── sections
│   ├── auth
│   ├── home
│   ├── products
│   ├── cart
│   ├── checkout
│   └── orders
│
├── features
│   ├── auth
│   ├── cart
│   ├── orders
│   └── theme
│
├── services
│   ├── api
│   └── storage
│
├── store
├── components
├── hooks
├── constants
├── theme
├── types
└── utils
```

---

# Organização do projeto

## app

Contém apenas as rotas do App Router do Next.js.

Cada página possui apenas a responsabilidade de renderizar sua respectiva View.

Exemplo:

```tsx
import { ProductsListView } from '@/sections/products';

export default function ProductsPage() {
  return <ProductsListView />;
}
```

---

## sections

Responsável pela camada de interface da aplicação.

Cada seção representa um domínio visual.

Exemplo:

```
sections/
└── products
    ├── components
    ├── view
    └── index.ts
```

As Views concentram a composição da tela enquanto os componentes específicos ficam organizados dentro da própria seção.

---

## features

Contém exclusivamente o gerenciamento de estado global utilizando Redux Toolkit.

Exemplo:

```
features/
├── auth
├── cart
├── orders
└── theme
```

Cada feature possui seus reducers, actions e selectors.

---

## services

Centraliza toda comunicação externa.

### api

Responsável pelas integrações utilizando RTK Query.

Atualmente:

- productsApi

### storage

Responsável pela persistência utilizando localStorage.

---

## store

Configuração do Redux.

Contém:

- Store
- Redux Provider
- Persistence Gate
- Hooks tipados do Redux

---

## types

Modelos compartilhados entre toda a aplicação.

```
types/
├── auth.ts
├── cart.ts
├── order.ts
├── product.ts
└── index.ts
```

Todos os modelos utilizados por Redux, UI, API e testes ficam centralizados neste diretório.

---

## components

Componentes globais reutilizáveis.

Exemplos:

- AppShell
- Guards de autenticação

Componentes específicos permanecem dentro de suas respectivas Sections.

---

## hooks

Hooks reutilizáveis da aplicação.

Exemplo:

- useAuth

Os hooks relacionados ao Redux permanecem dentro da pasta `store`.

---

## utils

Funções utilitárias compartilhadas.

Exemplo:

- formatCurrency
- formatDateTime

---

# Funcionalidades implementadas

## Autenticação

- Login mockado
- Logout
- Persistência da sessão
- Controle de acesso por perfil

---

## Produtos

- Listagem
- Busca
- Filtro por categoria
- Paginação
- Loading
- Tratamento de erro
- Empty State

---

## Carrinho

- Adicionar produto
- Alterar quantidade
- Remover produto
- Total automático
- Persistência

---

## Checkout

- Resumo do pedido
- Criação do pedido
- Limpeza automática do carrinho
- Feedback visual

---

## Pedidos

- Histórico
- Página de detalhes
- Persistência

---

## Tema

- Dark Mode
- Persistência da preferência

---

## Acessibilidade

Foram implementadas diversas melhorias seguindo boas práticas de acessibilidade.

- Skip Link
- Landmarks semânticos
- Navegação por teclado
- Focus visível
- aria-label
- aria-live
- Feedback para leitores de tela
- Contraste adequado
- Formulários com autocomplete

---

## Testes

O projeto possui testes unitários utilizando:

- Vitest
- Testing Library

Cobertura atual:

- Cart Reducers
- Cart Selectors
- Orders Reducers

---

# Decisões técnicas

## Next.js App Router

Utilizado por ser o padrão recomendado atualmente para novas aplicações Next.js.

---

## Redux Toolkit

Responsável pelo gerenciamento do estado global.

Estados gerenciados:

- autenticação
- carrinho
- pedidos
- tema

---

## RTK Query

Responsável pelo consumo da API pública DummyJSON.

Benefícios:

- cache automático
- loading
- tratamento de erros
- redução de boilerplate
- invalidação de cache

---

## Material UI

Escolhido pela produtividade, acessibilidade e consistência visual.

---

## React Hook Form + Zod

Utilizados para construção de formulários tipados e validação.

---

## localStorage

Persistência de:

- sessão do usuário
- carrinho
- pedidos
- preferência de tema

---

# Trade-offs

Algumas decisões foram tomadas considerando o escopo do desafio.

## Autenticação

Foi utilizada autenticação mockada devido à ausência de backend.

---

## Persistência

Carrinho e pedidos permanecem em localStorage.

---

## API

Foi utilizada a DummyJSON para simular um catálogo real.

---

## Controle de acesso

Implementado utilizando RBAC com usuários mockados.

---

# Evoluções futuras

- Backend real
- JWT + Refresh Token
- Cadastro de usuários
- Painel administrativo
- Favoritos
- Gateway de pagamento
- Upload de imagens
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

---

# Considerações

Durante o desenvolvimento foram priorizados:

- Código limpo
- Componentização
- Arquitetura escalável
- Tipagem forte
- Responsividade
- Acessibilidade
- Organização por responsabilidades
- Boas práticas com Redux Toolkit
- Boas práticas com Next.js App Router
- Histórico de commits organizado por features
- Cobertura de testes para regras de negócio