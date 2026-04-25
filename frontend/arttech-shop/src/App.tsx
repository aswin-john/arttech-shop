import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Header/Header';
import { HeroCarousel } from './components/HeroCarousel/HeroCarousel';

/**
 * Root application component.
 * Wraps all content in ThemeProvider and composes the main layout:
 * transparent header overlaid on a full-screen hero carousel.
 */
function App() {
  return (
    <ThemeProvider>
      <Header />
      <main>
        <HeroCarousel />
      </main>
    </ThemeProvider>
  );
}

export default App;
