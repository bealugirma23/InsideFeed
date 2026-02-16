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
import { graphqlRequest } from "@/lib/graphql-client"

export const Route = createFileRoute("/_base")({
  beforeLoad: async ({ location }) => {
    try {
      const session = await authClient.getSession()
      if (!session.data) {
        throw redirect({
          to: "/auth/login",
          search: {
            redirect: location.href,
          },
        })
      }

      const userId = session.data.user.id;
      const { GET_USER_INTERESTS } = await import('@/graphql/userInterests');
      const data = await graphqlRequest<{ user_interests: any[] }>(
        GET_USER_INTERESTS, 
        { userId }
      );
      console.log("user interest",data)
      if (!data?.user_interests || data.user_interests.length === 0) {
        throw redirect({
          to: "/onboarding/interests",
        })
      }
    } catch (e: any) {
        if (e.isRedirect || e?.to) {
            throw e
        }
        console.error("Interest check failed:", e);
    }
  },
  component: BaseLayout,
})

function BaseLayout() {
  const location = useLocation()
  const isSearchPage = location.pathname.startsWith("/search") || location.pathname.startsWith("/article")

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
