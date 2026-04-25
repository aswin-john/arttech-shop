import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Header/Header';
import { HeroCarousel } from './components/HeroCarousel/HeroCarousel';

/**
 * Root application component.
 * Wraps all content in ThemeProvider and composes the main layout:
 * fixed header followed by the hero carousel below it.
 */
function App() {
  return (
    <ThemeProvider>
      <Header />
      <main className="pt-16 lg:pt-[4.5rem]">
        <HeroCarousel />
      </main>
    </ThemeProvider>
  );
}

export default App;
