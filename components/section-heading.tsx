export function SectionHeading({
  eyebrow,
  title,
  children
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="section-title">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="text-3xl font-black tracking-tight text-navy-950 md:text-4xl">{title}</h2>
      {children ? <div className="mt-4 text-base leading-7 text-slate-600">{children}</div> : null}
    </div>
  );
}
