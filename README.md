# 💈 BarberPro Backend - Sistema de Gerenciamento de Barbearia

## 📋 Descrição do Projeto

Este é um projeto backend completo para gerenciamento de barbearia, desenvolvido com TypeScript, Express e Prisma. O sistema oferece funcionalidades essenciais para administração de barbearias, incluindo gestão de usuários, cortes, agendamentos e assinaturas.

## 🚀 Tecnologias Utilizadas

- **Linguagem:** TypeScript
- **Framework:** Express
- **ORM:** Prisma
- **Autenticação:** JWT (JSON Web Token)
- **Pagamentos:** Stripe
- **Segurança:** Bcrypt

## ✨ Funcionalidades

### Usuários
- Criação de conta
- Autenticação
- Detalhes do usuário
- Atualização de perfil

### Cortes de Cabelo
- Adicionar tipos de corte
- Listar cortes
- Editar cortes
- Ativar/Desativar cortes
- Contagem de cortes

### Agendamento
- Criar novos agendamentos
- Listar agendamentos
- Finalizar agendamentos
- Fila de espera

### Assinaturas e Planos
- Assinar plano via Stripe
- Verificar status de assinatura
- Criar portal de gerenciamento de assinatura
- Webhooks para eventos de pagamento

## 🔧 Configuração e Instalação

### Pré-requisitos
- Node.js (v14 ou superior)
- Yarn ou npm
- Conta no Stripe

### Passos de Instalação

1. Clone o repositório
```bash
git clone https://seu-repositorio/barber-backend.git
cd barber-backend
```

2. Instale as dependências
```bash
yarn install
# ou
npm install
```

3. Configure as variáveis de ambiente
Crie um arquivo `.env` com as seguintes variáveis:
```
DATABASE_URL="sua_url_de_banco_de_dados"
JWT_SECRET="sua_chave_secreta"
PORT="porta_do_server"

NEXT_PUBLIC_STRIPE_PUBLIC_KEY="sua_chave_publica_stripe"
STRIPE_API_KEY="sua_chave_secreta_stripe"
STRIPE_PRICE="seu_id_do_produto"
STRIPE_SUCCESS_URL="url_em_caso_de_sucesso"
STRIPE_CANCEL_URL="url_de_cancelamento"
STRIPE_WEBHOOK_SECRET="Segredo_da_assinatura"
```

4. Gere as migrações do Prisma
```bash
npx prisma generate
npx prisma migrate dev
```

5. Inicie o servidor em modo de desenvolvimento
```bash
yarn dev
# ou
npm run dev
```

## 🌐 Rotas da API

### Usuário
- `POST /users` - Criar usuário
- `POST /session` - Autenticação
- `GET /me` - Detalhes do usuário
- `PUT /users` - Atualizar usuário

### Cortes
- `POST /haircut` - Criar corte
- `GET /haircuts` - Listar cortes
- `PUT /haircut` - Atualizar corte
- `GET /haircut/check` - Verificar assinatura
- `GET /haircut/count` - Contagem de cortes

### Agendamento
- `POST /schedule` - Novo agendamento
- `GET /schedule` - Listar agendamentos
- `DELETE /schedule` - Finalizar agendamento

### Assinatura
- `POST /subscribe` - Assinar plano
- `POST /webhooks` - Webhooks do Stripe
- `POST /create-portal` - Criar portal de gerenciamento

## 🔒 Autenticação
Rotas protegidas utilizam middleware `isAuthenticated` que verifica o token JWT.

## 💳 Pagamentos
Integração com Stripe para gerenciamento de assinaturas e pagamentos.

## 🤝 Contribuição
1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença
Este projeto está sob a licença MIT.

**Desenvolvido com ❤️ para gerenciamento de barbearias**
