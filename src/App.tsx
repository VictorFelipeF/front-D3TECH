import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { PageLayout } from "./components/layout/PageLayout";
import { PageLoader } from "./components/shared/PageLoader";
import { AdminLayout } from "@/pages/auth/components/AdminLayout";
import { ProtectedRoute } from "@/pages/auth/components/ProtectedRoute";

// Lazy loading the pages
const AboutPage = lazy(() => import("./pages/about/AboutPage"));
const ServicesPage = lazy(() => import("./pages/services/ServicesPage"));
const ContactPage = lazy(() => import("./pages/contact/ContactPage"));
const PrivacyPolicyPage = lazy(() => import("./pages/legal/PrivacyPolicyPage"));
const BlogPage = lazy(() => import("./pages/blog/BlogPage"));
const BlogPostPage = lazy(() => import("./pages/blog/BlogPostPage"));
const CasesPage = lazy(() => import("@/pages/cases/CasesPage"));
const LoginPage = lazy(() => import("@/pages/auth/LoginPage"));
const AdminHomePage = lazy(() => import("@/pages/auth/AdminHomePage"));
const AdminBlogPage = lazy(() => import("@/pages/blog/AdminBlogPage"));
const AdminCasesPage = lazy(() => import("@/pages/cases/AdminCasesPage"));
const AdminContactsPage = lazy(() => import("@/pages/contact/AdminContactsPage"));

// Dummy component for home page for now, as it's not in Phase 1/2 scope
const HomePlaceholder = () => (
  <div className="flex min-h-[50vh] items-center justify-center">
    <h1 className="text-2xl font-bold">Home Page (Phase 3)</h1>
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
            <Route path="/cases" element={<CasesPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/politica-de-privacidade" element={<PrivacyPolicyPage />} />
          </Route>

          <Route path="/admin" element={<LoginPage />} />
          <Route path="/admin/login" element={<Navigate to="/admin" replace />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin/home" element={<AdminHomePage />} />
              <Route path="/admin/blog" element={<AdminBlogPage />} />
              <Route path="/admin/cases" element={<AdminCasesPage />} />
              <Route path="/admin/contacts" element={<AdminContactsPage />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
