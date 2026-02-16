import React from "react"
import { FaRegBookmark } from "react-icons/fa6"
import { FiSettings } from "react-icons/fi"
import { HiOutlineHome } from "react-icons/hi2"
import { LuCompass } from "react-icons/lu"
import { Link, useLocation } from "@tanstack/react-router"
import { IconBaseProps } from "react-icons"
import { LucideTrendingUp } from "lucide-react"
import { useTranslation } from "react-i18next"

interface TrendingTopic {
  tag: string
  count: string
}

interface SidebarProps {
  topics: TrendingTopic[]
}


interface sideBarLinksProps {
  slug: string,
  icon: IconBaseProps,
  route: string,
}

export const Sidebar: React.FC<SidebarProps> = ({ topics }) => {
  const location = useLocation();

  const { t } = useTranslation();

  const mainRoutes = [
    { slug: t("sidebar.home", "Home"), icon: <HiOutlineHome />, route: "/" },
    {
      slug: t("sidebar.discover", "Discover"), icon: <LuCompass />
      , route: "/discover"
    },
    {
      slug: t("sidebar.saved", "Saved"), icon: <FaRegBookmark />
      , route: "/saved"
    },
    {
      slug: t("sidebar.profile", "Profile"), icon: <FiSettings />
      , route: "/profile"
    },
  ]

  return (
    <aside className="sticky top-24 hidden h-fit w-64 shrink-0 flex-col gap-8 transition-all duration-300 xl:flex">
      <section>
        <h3 className="mb-4 px-3 text-[11px] font-bold uppercase tracking-widest text-gray-500">
          {t("sidebar.personalizedFeed")}
        </h3>
        <nav className="flex flex-col gap-1">
          {mainRoutes.map((item, index) => {
            const selectedButton = location.pathname.startsWith(item.route);
            return <Link
              key={item.route}
              to={item.route}
              className={`${selectedButton  ? "bg-primary/80" : ""} flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 font-medium text-gray-600 transition-colors hover:bg-gray-100`}           >
              {item.icon}
              {item.slug}
            </Link>
          })}
        </nav>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between px-3">
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-gray-500">
            {t("sidebar.trendingTopics")}
          </h3>
          <LucideTrendingUp size={20} color="gray" />
        </div>
        <div className="flex flex-col gap-4 px-3">
          {topics.map((topic) => (
            <Link
              key={topic.tag}
              to="/search"
              search={{ q: topic.tag }}
              className="group flex cursor-pointer flex-col"
            >
              <span className="text-sm font-semibold transition-colors group-hover:text-primary">
                {topic.tag}
              </span>
              <span className="text-[11px] text-gray-500">{topic.count}</span>
            </Link>
          ))}
        </div>
      </section>
    </aside>
  )
}
