"use client";

import { useEffect, useRef } from "react";
import { MessageSquare } from "lucide-react";

const DISQUS_SHORTNAME = "adhyayanx";

/**
 * Reusable Disqus Discussion component for Next.js App Router.
 *
 * Props:
 *  - slug: unique page identifier (e.g. "my-blog-post")
 *  - title: page title shown in Disqus thread header
 *
 * Follows the exact Disqus universal embed pattern:
 * 1. Sets window.disqus_config BEFORE injecting the script
 * 2. Uses disqus_shortname global variable as required by Disqus
 * 3. On re-renders (client navigation), calls DISQUS.reset()
 */
export default function Discussion({ slug, title }) {
  const initialized = useRef(false);

  useEffect(() => {
    if (!slug) return;

    const pageUrl = `https://www.adhyayanx.in/blog/${slug}`;
    const pageIdentifier = slug;

    // Set the global shortname — Disqus reads this
    window.disqus_shortname = DISQUS_SHORTNAME;

    // If Disqus was already loaded (client-side navigation), reset it
    if (window.DISQUS) {
      window.DISQUS.reset({
        reload: true,
        config: function () {
          this.page.url = pageUrl;
          this.page.identifier = pageIdentifier;
          this.page.title = title || "";
        },
      });
      return;
    }

    // First load: set disqus_config BEFORE injecting the script
    window.disqus_config = function () {
      this.page.url = pageUrl;
      this.page.identifier = pageIdentifier;
      this.page.title = title || "";
    };

    // Only inject the script once
    if (!initialized.current) {
      initialized.current = true;
      const d = document;
      const s = d.createElement("script");
      s.src = `https://${DISQUS_SHORTNAME}.disqus.com/embed.js`;
      s.setAttribute("data-timestamp", String(+new Date()));
      s.async = true;
      (d.head || d.body).appendChild(s);
    }

    // Cleanup thread content on unmount
    return () => {
      const thread = document.getElementById("disqus_thread");
      if (thread) {
        thread.innerHTML = "";
      }
    };
  }, [slug, title]);

  return (
    <div>
      {/* Section heading */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="p-2 bg-primary/10 rounded-xl text-primary">
            <MessageSquare size={20} />
          </span>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60">
              Community
            </p>
            <h3 className="text-2xl font-serif font-black text-foreground">
              Discussion
            </h3>
          </div>
        </div>
      </div>

      {/* Glassmorphism container for Disqus */}
      <div className="rounded-[2rem] border border-border/50 bg-white dark:bg-[#1a1a1a] p-6 md:p-10 shadow-xl relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute -right-20 -bottom-20 w-60 h-60 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

        {/* Disqus thread mount point — ID must be exactly "disqus_thread" */}
        <div id="disqus_thread" className="relative z-10 min-h-[200px]" />

        {/* Fallback for users with JS disabled */}
        <noscript>
          <div className="text-center py-12 text-muted-foreground">
            <p>
              Please enable JavaScript to view the{" "}
              <a
                href="https://disqus.com/?ref_noscript"
                className="text-primary underline"
              >
                comments powered by Disqus.
              </a>
            </p>
          </div>
        </noscript>
      </div>
    </div>
  );
}
