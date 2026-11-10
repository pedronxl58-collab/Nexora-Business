import { ArrowDownRight, ArrowRight, CircleHelp, LockKeyhole, ShieldCheck } from 'lucide-react';
import { Link } from 'wouter';
import { Brand } from '@/components/brand';

export default function LoginPage() {
  return (
    <main className="login-page grain">
      <div className="login-topbar">
        <Link href="/" className="brand-link" aria-label="Voltar à página inicial" data-testid="link-login-brand"><Brand inverse /></Link>
        <Link href="/" className="back-link" data-testid="link-back-home"><ArrowDownRight size={15} /> Página inicial</Link>
      </div>
      <div className="login-layout">
        <section className="login-story">
          <div className="eyebrow">NEXORA / BUSINESS</div>
          <h1>Uma nova forma<br />de olhar para<br /><em>o todo.</em></h1>
          <div className="login-story-rule" />
          <p>Um espaço de trabalho pensado para conectar a tecnologia à realidade de cada negócio.</p>
          <span className="login-coord">NX—PLATFORM / ACCESS</span>
        </section>
        <section className="login-card" aria-labelledby="login-title">
          <div className="login-card-mark"><LockKeyhole size={19} /></div>
          <div className="eyebrow">ÁREA DA PLATAFORMA</div>
          <h2 id="login-title">Acesso NEXORA</h2>
          <p className="login-card-subtitle">A experiência de acesso estará disponível quando a autenticação for conectada.</p>
          <div className="auth-notice" role="status" data-testid="status-auth-unavailable">
            <span className="notice-icon"><CircleHelp size={17} /></span>
            <span><strong>Autenticação ainda não conectada</strong><br />Não insira credenciais. O acesso não está habilitado nesta versão.</span>
          </div>
          <form className="login-form" aria-label="Campos de acesso indisponíveis">
            <label htmlFor="email">E-mail corporativo</label>
            <input id="email" type="email" autoComplete="off" placeholder="Acesso indisponível" disabled aria-describedby="auth-disabled-note" data-testid="input-email" />
            <label htmlFor="password">Senha</label>
            <input id="password" type="password" autoComplete="off" placeholder="Acesso indisponível" disabled aria-describedby="auth-disabled-note" data-testid="input-password" />
            <button type="button" className="button-disabled" disabled aria-disabled="true" data-testid="button-login-disabled">Autenticação indisponível <ArrowRight size={16} /></button>
            <p id="auth-disabled-note" className="form-hint">Os campos estão desativados. Nenhuma credencial será recebida ou validada.</p>
          </form>
          <div className="login-card-footer"><ShieldCheck size={15} /> Acesso seguro, quando habilitado</div>
        </section>
      </div>
      <div className="login-footer"><span>Technology &amp; Business Solutions</span><span className="mono">NEXORA / ACESSO</span></div>
    </main>
  );
}
