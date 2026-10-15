export function SectionHeading({
  eyebrow,
  title,
  children,
  as: Heading = "h2"
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
  as?: "h1" | "h2";
}) {
  return (
    <div className="section-title">
      <p className="eyebrow">{eyebrow}</p>
      <Heading className="text-3xl font-black tracking-tight text-navy-950 md:text-4xl">{title}</Heading>
      {children ? <div className="mt-4 text-base leading-7 text-slate-600">{children}</div> : null}
    </div>
  );
}
