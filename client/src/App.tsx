import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AppProvider } from "./contexts/AppContext";
import { useServiceWorker } from "./hooks/useServiceWorker";
import ActivationFlow from "./pages/ActivationFlow";
import MainDashboard from "./pages/MainDashboard";
import Home from "./pages/Home";
import LanguageSwitcher from "./components/LanguageSwitcher";


function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/activation" component={ActivationFlow} />
      <Route path="/dashboard" component={MainDashboard} />
      <Route path="/404" component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  useServiceWorker();

  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
        // switchable
      >
        <AppProvider>
          <TooltipProvider>
            <div className="relative min-h-screen flex flex-col">
              <div className="absolute top-4 right-4 z-10">
                <LanguageSwitcher />
              </div>
              <Toaster />
              <Router />
            </div>
          </TooltipProvider>
        </AppProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
