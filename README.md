# 🧩 ERP Front-End (React + Bootstrap)

Este projeto é a interface de um sistema ERP (Enterprise Resource Planning), desenvolvido com **React**, estilizado com **Bootstrap 5**, e que consome uma API REST em **Spring Boot**.

[Frontend React] → chama → [Spring Boot - API principal na Render]
                               ↑
                               │
                  [FastAPI - Serviço de relatório]
                  (puxa dados da API do Spring Boot)

                  

## 🧠 Stack do Projeto ERP

### 🔹 Frontend
- **React 19** com **Vite**
- **Bootstrap 5** para estilização responsiva
- **JavaScript (ES6+)**
- Consumo de API REST usando **Axios**
- Interface organizada com layout "lado a lado", permitindo exibir dados (como clientes, produtos, etc.) ao lado dos detalhes selecionados

### 🔹 Backend
- **Spring Boot** (Java), hospedado na **Render**
- API RESTful para fornecer os dados ao frontend
- Integração com microserviço Python para geração de relatórios

### 🔹 Relatórios
- Serviço auxiliar em **Python (FastAPI)**
- Consome dados diretamente da API do backend Java
- Gera relatórios (PDF, Excel ou visualizações) sob demanda

---

## 📦 Funcionalidades

- 📦 Estoque: visualização de produtos e quantidades (em desenvolvimento)
- 💰 Financeiro (em desenvolvimento)
- 🚚 Vendas (em desenvolvimento)
- 🛒 Compras (em desenvolvimento)
- 📊 Relatórios (em desenvolvimento)
- 🤝 Clientes (em desenvolvimento)

## 🔧 Como rodar o projeto localmente

### Pré-requisitos

- Node.js (v18+)
- NPM ou Yarn

### Passos

```bash
# Clone o repositório
git clone git@github.com:felipenewplayer/front-mini-erp.git

# Acesse a pasta do projeto
cd seu-repo

# Instale as dependências
npm install

# Rode o projeto
npm run dev
