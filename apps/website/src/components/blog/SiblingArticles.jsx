import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/image";

export default function SiblingArticles({ articles }) {
  const list = Array.isArray(articles) ? articles : [];

  const normalized = list
    .map((a) => ({
      _id: a?._id,
      title: a?.title,
      slug: a?.slug,
      excerpt: a?.excerpt,
      coverImage: a?.coverImage,
    }))
    .filter((a) => typeof a.slug === "string" && a.slug && typeof a.title === "string" && a.title);

  if (normalized.length === 0) return null;

  const toShow = normalized.slice(0, 4);

  return (
    <section className="mt-12">
      <div className="flex items-end justify-between gap-4 mb-6">
        <h3 className="font-serif text-2xl font-black tracking-tight text-foreground">
          More in this cluster
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {toShow.map((a) => {
          const imgUrl = a.coverImage ? urlFor(a.coverImage).width(800).height(520).url() : null;
          return (
            <article
              key={a._id || a.slug}
              className="group rounded-[2rem] border border-border/50 bg-slate-50 dark:bg-white/[0.02] overflow-hidden hover:shadow-md transition-shadow"
            >
              <Link href={`/blog/${a.slug}`} className="block">
                {imgUrl ? (
                  <div className="relative w-full aspect-[16/10] bg-black/5 dark:bg-white/[0.04]">
                    <Image
                      src={imgUrl}
                      alt={a.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  </div>
                ) : null}

                <div className="p-5 md:p-6">
                  <h4 className="text-lg font-bold leading-snug text-foreground group-hover:text-primary transition-colors">
                    {a.title}
                  </h4>
                  {a.excerpt ? (
                    <p className="mt-2 text-muted-foreground line-clamp-3">
                      {a.excerpt}
                    </p>
                  ) : null}
                  <div className="mt-4 text-sm font-semibold text-primary/80 group-hover:text-primary transition-colors">
                    Read article →
                  </div>
                </div>
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}

