import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { PageLayout } from "./components/layout/PageLayout";
import { PageLoader } from "./shared/components/PageLoader";

// Lazy loading the pages
const AboutPage = lazy(() => import("./features/about/pages/AboutPage"));
const ServicesPage = lazy(() => import("./features/services/pages/ServicesPage"));
const ContactPage = lazy(() => import("./features/contact/pages/ContactPage"));
const PrivacyPolicyPage = lazy(() => import("./features/legal/pages/PrivacyPolicyPage"));

// Dummy component for home page for now, as it's not in Phase 1/2 scope
const HomePlaceholder = () => (
  <div className="flex min-h-[50vh] items-center justify-center">
    <h1 className="text-2xl font-bold">Home Page (Phase 3)</h1>
  </div>
);

// Dummy components for Cases/Blog
const CasesPlaceholder = () => (
  <div className="flex min-h-[50vh] items-center justify-center">
    <h1 className="text-2xl font-bold">Cases Page (Phase 3)</h1>
  </div>
);

const BlogPlaceholder = () => (
  <div className="flex min-h-[50vh] items-center justify-center">
    <h1 className="text-2xl font-bold">Blog Page (Phase 3)</h1>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<PageLayout />}>
            <Route path="/" element={<HomePlaceholder />} />
            <Route path="/sobre-nos" element={<AboutPage />} />
            <Route path="/servicos" element={<ServicesPage />} />
            <Route path="/contato" element={<ContactPage />} />
            <Route path="/cases" element={<CasesPlaceholder />} />
            <Route path="/blog" element={<BlogPlaceholder />} />
            <Route path="/politica-de-privacidade" element={<PrivacyPolicyPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
