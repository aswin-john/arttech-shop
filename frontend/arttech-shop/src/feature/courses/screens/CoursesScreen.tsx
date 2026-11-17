import type { ReactNode } from 'react';

/** Courses landing page. The content can be expanded as courses are added. */
export function CoursesScreen(): ReactNode {
  return (
    <section
      className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-16 text-center
                 bg-[var(--color-surface)] dark:bg-[var(--color-dark-surface)]"
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-brand-600)] dark:text-[var(--color-brand-400)]">
        Learn with Berlion
      </p>
      <h1 className="font-display text-4xl font-bold text-[var(--color-text-primary)] dark:text-[var(--color-dark-text-primary)] sm:text-5xl">
        Courses
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-[var(--color-text-secondary)] dark:text-[var(--color-dark-text-secondary)]">
        Practical lessons and guided workshops for artists at every stage.
        Courses are coming soon.
      </p>
    </section>
  );
}
