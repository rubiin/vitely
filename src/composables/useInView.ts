import type { ComponentPublicInstance } from 'vue';

export interface UseInViewOptions extends IntersectionObserverInit {
  once?: boolean;
}

export function useInView(options: UseInViewOptions = {}) {
  const { once = true, threshold = 0.2, ...rest } = options;

  const el = ref<HTMLElement | null>(null);
  const inView = ref(false);
  let observer: IntersectionObserver | undefined;

  const setEl = (node: Element | ComponentPublicInstance | null) => {
    const target = node instanceof HTMLElement ? node : null;
    el.value = target;
    observer?.disconnect();
    observer = undefined;

    if (!target) {
      inView.value = false;
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      inView.value = true;
      return;
    }

    observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            inView.value = true;
            if (once) observer?.disconnect();
          } else if (!once) {
            inView.value = false;
          }
        });
      },
      { threshold, ...rest },
    );

    observer.observe(target);
  };

  return { el, inView, setEl };
}
