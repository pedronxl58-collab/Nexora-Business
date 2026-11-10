import {
  Boxes,
  ChartNoAxesCombined,
  Layers3,
  Route,
  ShoppingCart,
  UsersRound,
  Wallet,
} from 'lucide-react';

export const modules = [
  { title: 'Financeiro', icon: Wallet, detail: 'Uma visão organizada para decisões financeiras mais seguras.' },
  { title: 'Vendas', icon: ShoppingCart, detail: 'Processos comerciais preparados para acompanhar sua operação.' },
  { title: 'Estoque', icon: Boxes, detail: 'Controle e visibilidade do fluxo de materiais.' },
  { title: 'Funcionários', icon: UsersRound, detail: 'Estrutura para apoiar a gestão de pessoas.' },
  { title: 'Operações', icon: Layers3, detail: 'Rotinas conectadas ao contexto do seu negócio.' },
  { title: 'Logística', icon: Route, detail: 'Planejamento de movimentação e distribuição.' },
  { title: 'Indicadores', icon: ChartNoAxesCombined, detail: 'Informação pronta para apoiar boas decisões.' },
];
