import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Header/Header';
import { AddPayment } from './feature/payment';
// import { HeroCarousel } from './components/HeroCarousel/HeroCarousel';
// import { ValuePropositions } from './components/ValuePropositions/ValuePropositions';
// import { StoryCarousel } from './components/StoryCarousel';
// import { PerspectiveCarousel } from './components/PerspectiveCarousel';
// import { TestimonialCarousel } from './components/TestimonialCarousel';
// import { StandardTestimonialCarousel } from './components/StandardTestimonialCarousel';
// import { Review3DCarousel } from './components/Review3DCarousel';

const HomeScreen = lazy(() =>
  import('./feature/home').then((m) => ({ default: m.HomeScreen })),
);
const ShopsScreen = lazy(() =>
  import('./feature/shops').then((m) => ({ default: m.ShopsScreen })),
);
const ContactScreen = lazy(() =>
  import('./feature/contact').then((m) => ({ default: m.ContactScreen })),
);

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
        {/* <HeroCarousel />
        <ValuePropositions />
        <StoryCarousel />
        <PerspectiveCarousel /> */}
        {/* <TestimonialCarousel /> */}
        {/* <StandardTestimonialCarousel />
        <Review3DCarousel /> */}
        <Suspense>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/shops" element={<ShopsScreen />} />
            <Route path="/contact" element={<ContactScreen />} />
            <Route path="/payment" element={<AddPayment />} />
          </Routes>
        </Suspense>
      </main>
    </ThemeProvider>
  );
}

export default App;

