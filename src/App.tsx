import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { PageLayout } from "./components/layout/PageLayout";
import { PageLoader } from "./shared/components/PageLoader";
import { AdminLayout } from "@/features/auth/components/AdminLayout";
import { ProtectedRoute } from "@/features/auth/ProtectedRoute";

// Lazy loading the pages
const AboutPage = lazy(() => import("./features/about/pages/AboutPage"));
const ServicesPage = lazy(() => import("./features/services/pages/ServicesPage"));
const ContactPage = lazy(() => import("./features/contact/pages/ContactPage"));
const PrivacyPolicyPage = lazy(() => import("./features/legal/pages/PrivacyPolicyPage"));
const BlogPage = lazy(() => import("./features/blog/pages/BlogPage"));
const BlogPostPage = lazy(() => import("./features/blog/pages/BlogPostPage"));
const LoginPage = lazy(() => import("@/features/auth/pages/LoginPage"));
const AdminHomePage = lazy(() => import("@/features/auth/pages/AdminHomePage"));
const AdminBlogPage = lazy(() => import("@/features/blog/pages/AdminBlogPage"));
const AdminCasesPage = lazy(() => import("@/features/cases/pages/AdminCasesPage"));

// Dummy component for home page for now, as it's not in Phase 1/2 scope
const HomePlaceholder = () => (
  <div className="flex min-h-[50vh] items-center justify-center">
    <h1 className="text-2xl font-bold">Home Page (Phase 3)</h1>
  </div>
);

// Dummy components for Cases
const CasesPlaceholder = () => (
  <div className="flex min-h-[50vh] items-center justify-center">
    <h1 className="text-2xl font-bold">Cases Page (Phase 3)</h1>
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
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/politica-de-privacidade" element={<PrivacyPolicyPage />} />
          </Route>

          //Login do admin
          <Route path="/admin" element={<LoginPage />} />

          // Rotas protegidas do admin
          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin/home" element={<AdminHomePage />} />
              <Route path="/admin/blog" element={<AdminBlogPage />} />
              <Route path="/admin/cases" element={<AdminCasesPage />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;