import {
  createFileRoute,
  Outlet,
  redirect,
  useLocation,
} from "@tanstack/react-router"

import { Header } from "@/components/Header"
import { Sidebar } from "@/components/SideBar"
import { TRENDING_TOPICS } from "@/constants"
import { authClient } from "@/lib/auth-client"

export const Route = createFileRoute("/_base")({
  beforeLoad: async ({ location }) => {
    // try {
    //   const session = await authClient.getSession()
    //   console.log('Auth check:', session);
    //   if (!session.data) {
    //     throw redirect({
    //       to: "/auth/login",
    //       search: {
    //         redirect: location.href,
    //       },
    //     })
    //   }
    // } catch (e: any) {
    //     // If it's a redirect, rethrow it
    //     if (e.isRedirect || e?.to) {
    //         throw e
    //     }
    //     // Otherwise, assume auth failed and redirect
    //     console.error("Auth check failed:", e);
    //     throw redirect({
    //       to: "/auth/login",
    //       search: {
    //         redirect: location.href,
    //       },
    //     })
    // }
  },
  component: BaseLayout,
})

function BaseLayout() {
  const location = useLocation()
  const isSearchPage = location.pathname.startsWith("/search")

  return (
    <div className="flex min-h-screen flex-col font-sans">
      <Header />

      <div className="mx-auto flex w-full max-w-[1440px] flex-1 gap-8 px-6 py-8">
        {/* Sidebar - hidden on search page */}
        {!isSearchPage && <Sidebar topics={TRENDING_TOPICS} />}

        {/* Main Content */}
        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
