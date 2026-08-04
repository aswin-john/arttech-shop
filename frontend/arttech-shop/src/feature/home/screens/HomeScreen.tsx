import type { ReactNode } from 'react';
import { HeroCarousel } from '../../../components/HeroCarousel/HeroCarousel';
import { ValuePropositions } from '../../../components/ValuePropositions/ValuePropositions';
import { StoryCarousel } from '../../../components/StoryCarousel';
import { PerspectiveCarousel } from '../../../components/PerspectiveCarousel';
import { TestimonialCarousel } from '../../../components/TestimonialCarousel';
import { StandardTestimonialCarousel } from '../../../components/StandardTestimonialCarousel';
import { Review3DCarousel } from '../../../components/Review3DCarousel';
import { AddPayment } from '../../payment';

/**
 * Home screen — the main landing page.
 * Commented-out carousel/proposition components are ready
 * to be re-enabled when their features are complete.
 */
export function HomeScreen(): ReactNode {
  return (
    <section>
      <HeroCarousel />
      <ValuePropositions />
      <StoryCarousel />
      <PerspectiveCarousel />
      <TestimonialCarousel />
      <StandardTestimonialCarousel />
      <Review3DCarousel />
      <AddPayment/>
    </section>
  );
}
