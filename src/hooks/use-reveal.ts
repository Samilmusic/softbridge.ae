import { useEffect } from "react";

/**
 * Reveal-on-scroll. Observes every `.reveal` element and toggles `.in`
 * once it enters the viewport.
 *
 * IMPORTANT: the homepage lazy-loads most sections via React.lazy/Suspense,
 * so `.reveal` elements appear in the DOM AFTER this hook first runs.
 * We use a MutationObserver to pick up nodes added later, otherwise those
 * sections stay stuck at opacity:0 and look blank to the user.
 */
export function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    const observed = new WeakSet<Element>();
    const observe = (el: Element) => {
      if (observed.has(el)) return;
      observed.add(el);
      io.observe(el);
    };

    // Initial pass
    document.querySelectorAll<HTMLElement>(".reveal").forEach(observe);

    // Watch for nodes added later (lazy/Suspense sections, dialogs, etc.)
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.classList?.contains("reveal")) observe(node);
          node.querySelectorAll?.<HTMLElement>(".reveal").forEach(observe);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    // Safety net: if anything is still hidden after 1.5s (e.g. observer
    // missed it due to an unusual scroll position), reveal it.
    const safety = window.setTimeout(() => {
      document
        .querySelectorAll<HTMLElement>(".reveal:not(.in)")
        .forEach((el) => el.classList.add("in"));
    }, 1500);

    return () => {
      io.disconnect();
      mo.disconnect();
      clearTimeout(safety);
    };
  }, []);
}
