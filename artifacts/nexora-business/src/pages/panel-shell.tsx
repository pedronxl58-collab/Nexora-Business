import { useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  ChevronDown,
  Command,
  Compass,
  Headphones,
  LockKeyhole,
  Menu,
  ShieldCheck,
  X,
} from 'lucide-react';
import { Link } from 'wouter';
import { Brand } from '@/components/brand';
import { decidePrivateAreaAccess, type PrivateArea } from '@/auth/access-policy';
import { useVerifiedPrincipal } from '@/auth/session-context';
import { modules } from '@/data/modules';

export function PanelShell({ kind }: { kind: 'admin' | 'empresa' }) {
  const [activeModule, setActiveModule] = useState('Visão geral');
  const [menuOpen, setMenuOpen] = useState(false);
  const isAdmin = kind === 'admin';
  const panelTitle = isAdmin ? 'Nexora Admin' : 'Área da empresa';
  const navItems = [
    { title: 'Visão geral', icon: Compass },
    ...modules.map(({ title, icon }) => ({ title, icon })),
  ];
  const selected = modules.find((module) => module.title === activeModule);

  return (
    <main className="panel-layout">
      <button className={`mobile-menu-scrim${menuOpen ? ' is-visible' : ''}`} onClick={() => setMenuOpen(false)} aria-label="Fechar menu" data-testid="button-close-menu-overlay" />
      <aside className={`panel-sidebar${menuOpen ? ' sidebar-open' : ''}`} aria-label="Menu do painel">
        <div className="sidebar-brand-row">
          <Link href="/" className="brand-link" aria-label="NEXORA, página inicial" data-testid="link-panel-brand"><Brand inverse /></Link>
          <button className="sidebar-close" onClick={() => setMenuOpen(false)} aria-label="Fechar menu" data-testid="button-close-menu"><X size={19} /></button>
        </div>
        <div className="workspace-switcher">
          <span className="workspace-glyph">{isAdmin ? <Command size={16} /> : <BriefcaseBusiness size={16} />}</span>
          <span><strong>{panelTitle}</strong><small>{isAdmin ? 'ADMINISTRAÇÃO' : 'ESPAÇO DE TRABALHO'}</small></span>
          <ChevronDown size={14} className="switcher-chevron" />
        </div>
        <div className="sidebar-section-label">ESPAÇO DE TRABALHO</div>
        <nav className="panel-nav" aria-label="Módulos da plataforma">
          {navItems.map(({ title, icon: Icon }) => (
            <button
              key={title}
              className={`panel-nav-item${activeModule === title ? ' active' : ''}`}
              onClick={() => { setActiveModule(title); setMenuOpen(false); }}
              aria-current={activeModule === title ? 'page' : undefined}
              data-testid={`button-panel-${title.toLowerCase().replaceAll(' ', '-')}`}
            >
              <Icon size={17} strokeWidth={1.7} /><span>{title}</span>
              {title !== 'Visão geral' && <span className="nav-soon-dot" aria-label="Em estruturação" />}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="sidebar-help"><span className="help-icon"><Headphones size={16} /></span><span><strong>Precisa de ajuda?</strong><small>Central de suporte</small></span><ArrowUpRight size={14} /></div>
          <div className="sidebar-user">
            <div className="user-initials" aria-hidden="true">NX</div>
            <div><strong>NEXORA</strong><small>Área de acesso</small></div>
            <button className="user-menu-button" aria-label="Opções de acesso indisponíveis" disabled data-testid="button-user-options"><ChevronDown size={15} /></button>
          </div>
        </div>
      </aside>

      <section className="panel-main">
        <header className="panel-topbar">
          <button className="mobile-menu-button" onClick={() => setMenuOpen(true)} aria-label="Abrir menu" aria-expanded={menuOpen} data-testid="button-open-menu"><Menu size={20} /></button>
          <div className="breadcrumbs"><span>{panelTitle}</span><span className="breadcrumb-slash">/</span><strong>{activeModule}</strong></div>
          <Link href="/" className="panel-home-link" data-testid="link-panel-home">Página pública <ArrowUpRight size={14} /></Link>
        </header>
        <div className="panel-content">
          <div className="panel-page-heading">
            <div>
              <div className="eyebrow panel-eyebrow">{isAdmin ? 'NEXORA / ADMINISTRAÇÃO' : 'NEXORA / EMPRESA'}</div>
              <h1>{selected ? selected.title : isAdmin ? 'Nexora Admin' : 'Bem-vindo à NEXORA'}</h1>
              <p>{selected ? selected.detail : isAdmin ? 'Estrutura de administração da plataforma NEXORA.' : 'Uma base de trabalho preparada para acompanhar sua organização.'}</p>
            </div>
            <span className="panel-state"><span /> EM ESTRUTURAÇÃO</span>
          </div>
          <div className="panel-welcome-card">
            <div className="panel-card-decoration" aria-hidden="true"><div /><div /><div /></div>
            <div className="panel-card-content">
              <span className="panel-card-icon">{selected ? <selected.icon size={20} /> : isAdmin ? <Command size={20} /> : <BriefcaseBusiness size={20} />}</span>
              <div className="eyebrow">ESPAÇO PREPARADO</div>
              <h2>{selected ? `${selected.title}, em breve.` : 'A estrutura está pronta para evoluir.'}</h2>
              <p>{selected
                ? 'Este módulo está previsto na estrutura da plataforma. Conteúdo e funcionalidades serão disponibilizados quando estiverem prontos.'
                : 'Esta área define a base visual e de navegação do painel. Os recursos serão apresentados aqui conforme forem desenvolvidos.'}</p>
              <div className="panel-card-rule"><span /> SEM DADOS OPERACIONAIS NESTA VERSÃO</div>
            </div>
          </div>
          <div className="panel-info-row">
            <div className="panel-info-icon"><ShieldCheck size={18} /></div>
            <div><strong>Uma experiência transparente</strong><p>Não há informações, usuários ou transações carregadas neste painel.</p></div>
            <span className="mono">NX / 0{navItems.findIndex((item) => item.title === activeModule) + 1}</span>
          </div>
          <div className="panel-module-overview">
            <div className="overview-heading"><div><div className="eyebrow panel-eyebrow">MAPA DA PLATAFORMA</div><h2>Frentes previstas</h2></div><span>07 MÓDULOS</span></div>
            <div className="overview-list">
              {modules.map(({ title, icon: Icon }) => (
                <button className={`overview-row${activeModule === title ? ' overview-row-active' : ''}`} key={title} onClick={() => setActiveModule(title)} data-testid={`button-overview-${title.toLowerCase()}`}>
                  <span className="overview-icon"><Icon size={16} /></span>
                  <span className="overview-title">{title}</span>
                  <span className="overview-status"><span /> Em estruturação</span>
                  <ArrowRight size={15} className="overview-arrow" />
                </button>
              ))}
            </div>
          </div>
          <footer className="panel-footer"><Brand /><span>Technology &amp; Business Solutions</span><span className="mono">NEXORA / WORKSPACE</span></footer>
        </div>
      </section>
    </main>
  );
}

export function PrivateAreaGate({ area, kind }: { area: PrivateArea; kind: 'admin' | 'empresa' }) {
  const principal = useVerifiedPrincipal();
  const decision = decidePrivateAreaAccess(principal, area);

  if (decision === 'allow') return <PanelShell kind={kind} />;

  const requiresSignIn = decision === 'sign-in-required';
  return (
    <main className="login-page grain">
      <div className="login-topbar">
        <Link href="/" className="brand-link" aria-label="Voltar à página inicial" data-testid="link-protected-brand"><Brand inverse /></Link>
      </div>
      <div className="login-layout">
        <section className="login-story">
          <div className="eyebrow">NEXORA / ACESSO PRIVADO</div>
          <h1>Um espaço<br />para cada<br /><em>negócio.</em></h1>
          <div className="login-story-rule" />
          <p>As áreas internas só ficam disponíveis após a validação de uma sessão e das permissões da conta.</p>
          <span className="login-coord">NX—ACCESS / VERIFIED SESSION REQUIRED</span>
        </section>
        <section className="login-card" aria-labelledby="private-access-title">
          <div className="login-card-mark"><LockKeyhole size={19} /></div>
          <div className="eyebrow">{kind === 'admin' ? 'NEXORA / ADMINISTRAÇÃO' : 'NEXORA / EMPRESA'}</div>
          <h2 id="private-access-title">{requiresSignIn ? 'Acesso restrito' : 'Permissão necessária'}</h2>
          <p className="login-card-subtitle">
            {requiresSignIn
              ? 'Esta área exige uma sessão autenticada. Nenhuma sessão está ativa neste ambiente.'
              : area === 'nexora-admin'
                ? 'Esta identidade não tem autorização para acessar a administração global da NEXORA.'
                : 'Esta identidade não tem uma associação autorizada a uma empresa.'}
          </p>
          <div className="auth-notice" role="status" data-testid="status-private-access">
            <span className="notice-icon"><ShieldCheck size={17} /></span>
            <span>
              <strong>{requiresSignIn ? 'Autenticação não habilitada' : 'Acesso bloqueado'}</strong>
              <br />
              {requiresSignIn
                ? 'O painel permanece fechado até a conexão de um provedor de autenticação seguro.'
                : 'Contas de empresas não recebem permissões administrativas da plataforma.'}
            </span>
          </div>
          <Link href="/login" className="button-primary" data-testid="link-private-login">
            Ir para acesso <ArrowRight size={16} />
          </Link>
        </section>
      </div>
      <div className="login-footer"><span>Technology &amp; Business Solutions</span><span className="mono">NEXORA / ACESSO PRIVADO</span></div>
    </main>
  );
}
