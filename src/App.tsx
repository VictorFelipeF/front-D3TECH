import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { PageLayout } from "./components/layout/PageLayout";
import { PageLoader } from "./components/shared/PageLoader";
import { AdminLayout } from "@/pages/auth/components/AdminLayout";
import { ProtectedRoute } from "@/pages/auth/components/ProtectedRoute";
import { ScrollToTop } from "@/components/shared/ScrollToTop";

// Lazy loading the pages
const AboutPage = lazy(() => import("./pages/about/AboutPage"));
const HomePage = lazy(() => import("./pages/home/HomePage"));
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
const AdminServicesPage = lazy(() => import("@/pages/services/AdminServicesPage"));
const AdminPartnersPage = lazy(() => import("@/pages/partners/AdminPartnersPage"));
const AdminIndicadoresPage = lazy(() => import("@/pages/indicadores/AdminIndicadoresPage"));


function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route element={<PageLayout />}>
              <Route path="/" element={<HomePage />} />
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
            <Route path="/login" element={<Navigate to="/admin" replace />} />

              <Route element={<ProtectedRoute />}>
                <Route element={<AdminLayout />}>
                  <Route path="/admin/home" element={<AdminHomePage />} />
                  <Route path="/admin/blog" element={<AdminBlogPage />} />
                  <Route path="/admin/cases" element={<AdminCasesPage />} />
                  <Route path="/admin/contacts" element={<AdminContactsPage />} />
                  <Route path="/admin/services" element={<AdminServicesPage />} />
                  <Route path="/admin/partners" element={<AdminPartnersPage />} />
                  <Route path="/admin/indicadores" element={<AdminIndicadoresPage />} />
                </Route>
              </Route>
            </Routes>
          </Suspense>
    </BrowserRouter>
  );
}

export default App;
