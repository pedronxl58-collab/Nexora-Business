# NEXORA Business — base da plataforma

## Estado desta etapa

- A apresentação e os painéis são uma fundação visual.
- O formulário de acesso não autentica usuários nem cria uma sessão.
- Não há contas, organizações, métricas, movimentações ou pagamentos de demonstração.
- As rotas privadas negam acesso enquanto não existir uma sessão verificada.
- O serviço de autenticação ainda precisa ser conectado antes de uso com clientes.

## Limites de acesso

O navegador não é uma fonte confiável de identidade ou permissões. A implementação de autenticação deverá validar a sessão no servidor e criar um principal verificado a partir do provedor. A autorização deve seguir estas regras:

1. O painel Nexora Admin exige uma identidade presente na lista de administradores da plataforma. Uma associação a uma empresa, mesmo com papel `owner` ou `admin`, nunca concede acesso administrativo global.
2. O painel da empresa exige uma associação ativa à organização e usa o `tenantId` obtido dessa associação; não deve confiar em `tenantId` enviado pelo navegador.
3. Toda consulta e alteração de dados de uma empresa deve ser limitada pelo `tenantId` autorizado no servidor.
4. Endpoints privados devem negar por padrão se a identidade, associação ou papel não puder ser validado.
5. Uma futura implementação pode reforçar o filtro da aplicação com políticas PostgreSQL de Row-Level Security, sempre aplicadas dentro da transação que define o contexto do tenant.

## Modelo PostgreSQL preparado

O esquema inicial define organizações (`nexora_tenants`), associações por empresa e papel (`nexora_tenant_memberships`), administradores globais em uma tabela separada (`nexora_platform_admins`) e módulos habilitados por empresa (`nexora_tenant_modules`). Nenhum registro é criado automaticamente.

## Estrutura do app

- `src/App.tsx`: roteamento e composição das áreas públicas e privadas.
- `src/pages/`: apresentação, acesso, shell do painel e bloqueio de áreas privadas.
- `src/components/brand.tsx`: marca NEXORA reutilizável.
- `src/data/modules.ts`: catálogo dos sete módulos previstos.
- `src/auth/`: contratos e proteção de rotas; a sessão começa como não autenticada até que um provedor confiável seja conectado.
- `src/index.css`: tema, identidade visual e regras responsivas.
- `ARCHITECTURE.md`: limites de segurança e decisões de isolamento multiempresa.

## Tecnologias da fundação

React, TypeScript, Vite, wouter, Tailwind CSS e lucide-react no navegador; PostgreSQL, Drizzle ORM e Zod no modelo de dados. A autenticação real permanece pendente de integração segura.
