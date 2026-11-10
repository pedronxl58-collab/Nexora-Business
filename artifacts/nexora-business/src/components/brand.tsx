type BrandProps = {
  inverse?: boolean;
};

export function Brand({ inverse = false }: BrandProps) {
  return (
    <span className={`brand-mark${inverse ? ' brand-mark-inverse' : ''}`}>
      <span className="brand-symbol" aria-hidden="true"><span /><span /><span /></span>
      <span className="brand-word">NEXORA</span>
    </span>
  );
}
