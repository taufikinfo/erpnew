
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useContext, useEffect, Suspense, lazy } from "react";
import { ThemeContext } from "@/contexts/ThemeContext";

// Lazy load components for better code splitting
const Login = lazy(() => import("@/pages/auth/Login"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Finance = lazy(() => import("@/pages/Finance"));
const HumanResources = lazy(() => import("@/pages/HumanResources"));
const Inventory = lazy(() => import("@/pages/Inventory"));
const Sales = lazy(() => import("@/pages/Sales"));
const Procurement = lazy(() => import("@/pages/Procurement"));
const Manufacturing = lazy(() => import("@/pages/Manufacturing"));
const Projects = lazy(() => import("@/pages/Projects"));
const Reports = lazy(() => import("@/pages/Reports"));
const UserManagement = lazy(() => import("@/pages/UserManagement"));
const ProfileManagement = lazy(() => import("@/pages/ProfileManagement"));
const Settings = lazy(() => import("@/pages/Settings"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Signup = lazy(() => import("./pages/auth/Signup"));
const LandingPage = lazy(() => import("./pages/LandingPage"));
const DocsManagement = lazy(() => import("@/pages/DocsManagement"));
const FaqManagement = lazy(() => import("@/pages/FaqManagement"));
const BlogManagement = lazy(() => import("@/pages/BlogManagement"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Blog = lazy(() => import("./pages/Blog"));
const Docs = lazy(() => import("./pages/Docs"));
const Chat = lazy(() => import("./pages/Chat"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: 1,
    },
  },
});

// Loading component for Suspense
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
  </div>
);

const App = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("ThemeContext must be used within a ThemeProvider");
  }

  const { darkMode, compactView } = themeContext;

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    if (compactView) {
      root.classList.add("compact");
    } else {
      root.classList.remove("compact");
    }
  }, [darkMode, compactView]);

  // Handle pre-rendered routes
  useEffect(() => {
    if (window.__PRERENDERED__) {
      console.log('App initialized with pre-rendered content');
      // Mark hydration as complete
      setTimeout(() => {
        document.body.classList.add('hydrated');
      }, 0);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster /> 
        <AuthProvider>
          <BrowserRouter>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<Blog />} />
                <Route path="/docs" element={<Docs />} />
                <Route path="/docs/:slug" element={<Docs />} />
                <Route path="/blog-management" element={<BlogManagement />} />  
                <Route path="/faq-management" element={<FaqManagement />} />
                <Route path="/docs-management" element={<DocsManagement />} />            
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/finance" element={<ProtectedRoute><Finance /></ProtectedRoute>} />
                <Route path="/hr" element={<ProtectedRoute><HumanResources /></ProtectedRoute>} />
                <Route path="/inventory" element={<ProtectedRoute><Inventory /></ProtectedRoute>} />
                <Route path="/sales" element={<ProtectedRoute><Sales /></ProtectedRoute>} />
                <Route path="/procurement" element={<ProtectedRoute><Procurement /></ProtectedRoute>} />
                <Route path="/manufacturing" element={<ProtectedRoute><Manufacturing /></ProtectedRoute>} />
                <Route path="/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
                <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
                <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
                <Route path="/user-management" element={<ProtectedRoute><UserManagement /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><ProfileManagement /></ProtectedRoute>} />
                <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                <Route path="/docs-management" element={<ProtectedRoute><DocsManagement /></ProtectedRoute>} />
                <Route path="/faq-management" element={<ProtectedRoute><FaqManagement /></ProtectedRoute>} />
                <Route path="/blog-management" element={<ProtectedRoute><BlogManagement /></ProtectedRoute>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
