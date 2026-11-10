import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Command,
  Compass,
  FileChartColumnIncreasing,
  Landmark,
  Package,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { Link } from 'wouter';
import { Brand } from '@/components/brand';
import { modules } from '@/data/modules';

function PublicHeader() {
  return (
    <header className="public-header">
      <Link href="/" className="brand-link" aria-label="NEXORA, página inicial" data-testid="link-home-brand">
        <Brand inverse />
      </Link>
      <nav className="public-nav" aria-label="Navegação principal">
        <a href="#solucoes" data-testid="link-solutions">Soluções</a>
        <a href="#visao" data-testid="link-vision">Nossa visão</a>
        <Link href="/login" className="nav-login" data-testid="link-login-header">Acessar plataforma <ArrowUpRight size={15} /></Link>
      </nav>
    </header>
  );
}

function HeroArtwork() {
  return (
    <div className="hero-art" aria-label="Ilustração abstrata de sistemas empresariais conectados" role="img">
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <div className="orbit orbit-three" />
      <div className="art-axis axis-x" />
      <div className="art-axis axis-y" />
      <div className="art-node node-main"><Command size={27} strokeWidth={1.5} /></div>
      <div className="art-node node-a"><Landmark size={19} strokeWidth={1.5} /></div>
      <div className="art-node node-b"><Package size={19} strokeWidth={1.5} /></div>
      <div className="art-node node-c"><FileChartColumnIncreasing size={19} strokeWidth={1.5} /></div>
      <span className="art-label label-one">SYSTEMS / CONNECTED</span>
      <span className="art-label label-two">BUSINESS LOGIC 01—07</span>
      <div className="art-corner corner-top">NX—01</div>
      <div className="art-corner corner-bottom">DESIGNED TO ADAPT</div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <main className="landing grain">
      <section className="hero-section">
        <PublicHeader />
        <div className="hero-content">
          <div className="hero-copy fade-up">
            <div className="eyebrow"><span className="status-dot" /> TECHNOLOGY &amp; BUSINESS SOLUTIONS</div>
            <h1>Clareza para<br />negócios em <em>movimento.</em></h1>
            <p className="hero-description">
              Uma plataforma empresarial construída para aproximar tecnologia,
              operação e decisão — no ritmo único da sua empresa.
            </p>
            <div className="hero-actions">
              <Link href="/login" className="button-primary" data-testid="link-access-platform">
                Conheça a plataforma <ArrowRight size={17} />
              </Link>
              <a href="#solucoes" className="button-text" data-testid="link-explore-solutions">
                Explore as soluções <ArrowDownRight size={16} />
              </a>
            </div>
            <div className="hero-footnote"><ShieldCheck size={15} /> Pensada para ambientes de negócio diversos</div>
          </div>
          <div className="hero-visual fade-up-delay"><HeroArtwork /></div>
        </div>
        <div className="hero-bottomline">
          <span>TECNOLOGIA COM CONTEXTO</span>
          <span className="bottomline-rule" />
          <span>01 / 03</span>
        </div>
      </section>

      <section className="intro-section" id="visao">
        <div className="intro-index eyebrow">01 — UMA BASE, MUITAS POSSIBILIDADES</div>
        <div className="intro-main">
          <h2>Seu negócio é único.<br /><span>A tecnologia também deveria ser.</span></h2>
          <div className="intro-aside">
            <p>A NEXORA reúne capacidades essenciais em uma experiência clara e adaptável. Menos complexidade entre sistemas. Mais espaço para enxergar o que importa.</p>
            <span className="aside-mark">N / X</span>
          </div>
        </div>
      </section>

      <section className="solutions-section" id="solucoes">
        <div className="section-heading">
          <div>
            <div className="eyebrow">02 — UM ECOSSISTEMA EMPRESARIAL</div>
            <h2>Uma estrutura.<br /><span>Sete frentes de trabalho.</span></h2>
          </div>
          <p>Os módulos NEXORA estão sendo preparados para acompanhar diferentes áreas da empresa, com uma base comum e uma experiência integrada.</p>
        </div>
        <div className="module-grid">
          {modules.map(({ title, icon: Icon, detail }, index) => (
            <article className={`module-card module-card-${index + 1}`} key={title} data-testid={`card-module-${title.toLowerCase()}`}>
              <div className="module-card-top"><span className="module-number">0{index + 1}</span><Icon size={20} strokeWidth={1.7} /></div>
              <h3>{title}</h3>
              <p>{detail}</p>
              <span className="module-status"><span /> Em estruturação</span>
            </article>
          ))}
        </div>
        <div className="module-footnote"><span className="footnote-line" /> Módulos em desenvolvimento. Disponibilidade e funcionalidades serão comunicadas oportunamente.</div>
      </section>

      <section className="principles-section">
        <div className="principles-intro">
          <div className="eyebrow">03 — PRINCÍPIOS DE PRODUTO</div>
          <h2>Feita para<br /><span>trabalhar a seu favor.</span></h2>
          <p>Decisões de produto que tornam a tecnologia mais próxima da realidade empresarial.</p>
        </div>
        <div className="principle-list">
          <article className="principle-item">
            <span className="principle-icon"><Compass size={19} /></span>
            <div><span className="principle-label">01 / CONTEXTO</span><h3>Flexível por natureza</h3><p>Uma base pensada para diferentes setores, sem presumir como cada empresa deve funcionar.</p></div>
            <ArrowUpRight size={16} className="principle-arrow" />
          </article>
          <article className="principle-item">
            <span className="principle-icon"><Sparkles size={19} /></span>
            <div><span className="principle-label">02 / CLAREZA</span><h3>Complexidade, com direção</h3><p>Interfaces organizadas para ajudar pessoas a encontrar o próximo passo com confiança.</p></div>
            <ArrowUpRight size={16} className="principle-arrow" />
          </article>
          <article className="principle-item">
            <span className="principle-icon"><ShieldCheck size={19} /></span>
            <div><span className="principle-label">03 / CONFIANÇA</span><h3>Tecnologia responsável</h3><p>Uma experiência que comunica com transparência o que está pronto e o que ainda está por vir.</p></div>
            <ArrowUpRight size={16} className="principle-arrow" />
          </article>
        </div>
      </section>

      <section className="closing-section">
        <div className="closing-coordinate">NEXORA / BUSINESS PLATFORM<br />LATITUDE: YOUR BUSINESS</div>
        <div className="closing-copy">
          <div className="eyebrow">TECNOLOGIA QUE ACOMPANHA A AMBIÇÃO</div>
          <h2>O próximo passo<br />começa com <em>clareza.</em></h2>
          <Link href="/login" className="button-light" data-testid="link-access-footer">
            Acessar área da plataforma <ArrowRight size={17} />
          </Link>
        </div>
        <div className="closing-orbit" aria-hidden="true"><div /><div /><div /></div>
      </section>

      <footer className="site-footer">
        <Link href="/" className="brand-link" aria-label="NEXORA, página inicial" data-testid="link-footer-brand"><Brand inverse /></Link>
        <span className="footer-claim">Technology &amp; Business Solutions</span>
        <div className="footer-links">
          <Link href="/login" data-testid="link-footer-login">Acesso à plataforma</Link>
          <span>© NEXORA</span>
        </div>
      </footer>
    </main>
  );
}
