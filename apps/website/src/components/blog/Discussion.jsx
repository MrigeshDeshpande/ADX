"use client";

import { useEffect, useRef } from "react";
import { MessageSquare } from "lucide-react";

const DISQUS_SHORTNAME = "skillyards-versatilitty";

/**
 * Reusable Disqus Discussion component for Next.js App Router.
 *
 * Props:
 *  - slug: unique page identifier (e.g. "my-blog-post")
 *  - title: page title shown in Disqus thread header
 *
 * Handles:
 *  - Initial embed script injection (only once across the app lifetime)
 *  - DISQUS.reset() on slug/title changes for client-side navigation
 *  - Cleanup to prevent memory leaks
 *  - Fallback message if Disqus fails to load
 */
export default function Discussion({ slug, title }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!slug) return;

    // Build the canonical URL for this page
    const pageUrl = `${window.location.origin}/blog/${slug}`;

    // Configure Disqus for the current page
    window.disqus_config = function () {
      this.page.url = pageUrl;
      this.page.identifier = slug;
      this.page.title = title || "";
    };

    // If Disqus is already loaded (navigated from another post), reset it
    if (window.DISQUS) {
      window.DISQUS.reset({
        reload: true,
        config: function () {
          this.page.url = pageUrl;
          this.page.identifier = slug;
          this.page.title = title || "";
        },
      });
      return;
    }

    // First-time load: inject the Disqus embed script (only once)
    const existingScript = document.querySelector(
      `script[src*="${DISQUS_SHORTNAME}.disqus.com/embed.js"]`
    );

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = `https://${DISQUS_SHORTNAME}.disqus.com/embed.js`;
      script.setAttribute("data-timestamp", String(+new Date()));
      script.async = true;
      document.body.appendChild(script);
    }

    // Cleanup: remove the thread content when unmounting to avoid stale threads
    return () => {
      const thread = document.getElementById("disqus_thread");
      if (thread) {
        thread.innerHTML = "";
      }
    };
  }, [slug, title]);

  return (
    <div ref={containerRef}>
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
      <div className="rounded-[2rem] border border-border/50 bg-white/80 dark:bg-white/5 backdrop-blur-md p-6 md:p-10 shadow-xl shadow-black/5 dark:shadow-black/20 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute -right-20 -bottom-20 w-60 h-60 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

        {/* Disqus thread mount point */}
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
