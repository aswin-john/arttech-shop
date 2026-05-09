import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Header/Header';
import { HeroCarousel } from './components/HeroCarousel/HeroCarousel';
import { ValuePropositions } from './components/ValuePropositions/ValuePropositions';
import { StoryCarousel } from './components/StoryCarousel';
import { PerspectiveCarousel } from './components/PerspectiveCarousel';
import { TestimonialCarousel } from './components/TestimonialCarousel';
import { StandardTestimonialCarousel } from './components/StandardTestimonialCarousel';

/**
 * Root application component.
 * Wraps all content in ThemeProvider and composes the main layout:
 * fixed header followed by the hero carousel and feature highlights.
 */
function App() {
  return (
    <ThemeProvider>
      <Header />
      <main className="pt-16 lg:pt-[4.5rem]">
        <HeroCarousel />
        <ValuePropositions />
        <StoryCarousel />
        <PerspectiveCarousel />
        {/* <TestimonialCarousel /> */}
        <StandardTestimonialCarousel />
      </main>
    </ThemeProvider>
  );
}

export default App;
