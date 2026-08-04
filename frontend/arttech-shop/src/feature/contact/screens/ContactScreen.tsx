import type { ReactNode } from 'react';

/**
 * Contact screen — placeholder for the contact page.
 * Will be expanded with a contact form, map, and business info.
 */
export function ContactScreen(): ReactNode {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <h1 className="text-3xl font-display font-bold text-[var(--color-text-primary)] dark:text-[var(--color-dark-text-primary)] mb-4">
        Contact Us
      </h1>
      <p className="text-lg text-[var(--color-text-secondary)] dark:text-[var(--color-dark-text-secondary)] max-w-md">
        Have a question or want to work with us? Reach out — we&apos;d love to hear from you.
      </p>
    </section>
  );
}
