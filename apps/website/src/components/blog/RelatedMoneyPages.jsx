import Link from "next/link";

export default function RelatedMoneyPages({ pages }) {
  const list = Array.isArray(pages) ? pages : [];
  const related = list.filter(
    (p) =>
      p &&
      p.linkContext === "related-block" &&
      typeof p.title === "string" &&
      p.title.trim() &&
      typeof p.path === "string" &&
      p.path.trim()
  );

  if (related.length === 0) return null;

  return (
    <section className="mt-12 rounded-[2.5rem] border border-border/50 bg-white dark:bg-black/20 p-6 md:p-8">
      <h3 className="font-serif text-2xl font-black tracking-tight text-foreground">
        Related Programs
      </h3>
      <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {related.map((p) => (
          <li key={`${p.path}-${p.title}`}>
            <Link
              href={p.path}
              className="group flex items-center gap-4 rounded-2xl border border-border/50 bg-slate-50 dark:bg-white/[0.02] px-4 py-3 hover:shadow-sm transition-shadow"
            >
              <span className="font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                <span>{p.title} </span>
                <span
                  aria-hidden="true"
                  className="text-primary/70 group-hover:text-primary transition-colors"
                >
                  →
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
