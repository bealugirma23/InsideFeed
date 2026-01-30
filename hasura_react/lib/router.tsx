import { createRouter, createRootRoute, createRoute, Router, Link, Outlet } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

// Lazy load feature pages to improve initial bundle size
const LoginPage = lazy(() => import("../src/routes/auth/pages/login"));
const SignupPage = lazy(() => import("../src/routes/auth/pages/signup"));
const SetInterestsPage = lazy(() => import("../src/routes/onboarding/pages/set-interests"));
const FeedPage = lazy(() => import("../src/routes/feed/pages/index"));
const DiscoverPage = lazy(() => import("../features/discover/pages/discover"));
const SavedPage = lazy(() => import("../features/saved/pages/saved"));
const ArticleDetailPage = lazy(() => import("../features/article/pages/article-detail"));

// Protected route wrrouteser
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // Import auth hook here to avoid circular dependencies
  const { useAuth } = require("../features/auth/hooks/use-auth");
  const { isAuthenticated, isOnboarded } = useAuth();

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  if (!isOnboarded) {
    // Redirect to onboarding if not completed
    return <Navigate to="/onboarding/interests" replace />;
  }

  return <>{children}</>;
};

// Onboarding route wrrouteser
const OnboardingRoute = ({ children }: { children: React.ReactNode }) => {
  const { useAuth } = require("../features/auth/hooks/use-auth");
  const { isAuthenticated, isOnboarded } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (isOnboarded) {
    // Redirect to feed if already onboarded
    return <Navigate to="/feed" replace />;
  }

  return <>{children}</>;
};

// Define root route
const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

// Define routes by feature
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <Navigate to="/feed" replace />,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: () => (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPage />
    </Suspense>
  ),
});

const signupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/signup",
  component: () => (
    <Suspense fallback={<div>Loading...</div>}>
      <SignupPage />
    </Suspense>
  ),
});

const onboardingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/onboarding",
  component: () => (
    <OnboardingRoute>
      <Outlet />
    </OnboardingRoute>
  ),
});

const setInterestsRoute = createRoute({
  getParentRoute: () => onboardingRoute,
  path: "/interests",
  component: () => (
    <Suspense fallback={<div>Loading...</div>}>
      <SetInterestsPage />
    </Suspense>
  ),
});

const feedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/feed",
  component: () => (
    <ProtectedRoute>
      <Suspense fallback={<div>Loading...</div>}>
        <FeedPage />
      </Suspense>
    </ProtectedRoute>
  ),
});

const discoverRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/discover",
  component: () => (
    <ProtectedRoute>
      <Suspense fallback={<div>Loading...</div>}>
        <DiscoverPage />
      </Suspense>
    </ProtectedRoute>
  ),
});

const savedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/saved",
  component: () => (
    <ProtectedRoute>
      <Suspense fallback={<div>Loading...</div>}>
        <SavedPage />
      </Suspense>
    </ProtectedRoute>
  ),
});

const articleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/article/$id",
  component: ({ params }: { params: { id: string } }) => (
    <ProtectedRoute>
      <Suspense fallback={<div>Loading...</div>}>
        <ArticleDetailPage articleId={params.id} />
      </Suspense>
    </ProtectedRoute>
  ),
});

// Create route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  signupRoute,
  onboardingRoute.addChildren([setInterestsRoute]),
  feedRoute,
  discoverRoute,
  savedRoute,
  articleRoute,
]);

// Create the router instance
export const router = createRouter({
  routeTree,
});

// Export types for use in the routeslication
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

// Helper component for navigation
const Navigate = ({ to, replace }: { to: string; replace?: boolean }) => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate({ to, replace });
  }, [to, replace, navigate]);
  return null;
};
