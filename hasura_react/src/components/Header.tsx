import React, { useState } from "react"
import { IoSearchOutline } from "react-icons/io5"
import { MdOutlineLanguage, MdOutlineNotificationsNone } from "react-icons/md"
import { Link, useNavigate } from "@tanstack/react-router"
import { useTranslation } from "react-i18next"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { authClient } from "@/lib/auth-client"

export const Header: React.FC = () => {
  const navigate = useNavigate()
  const { data: session } = authClient.useSession()
  const [search, setSearch] = useState("")
  const { t, i18n } = useTranslation()

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          navigate({ to: "/auth/login" })
        },
      },
    })
  }

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (search.trim()) {
      navigate({ to: "/search", search: { q: search } })
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6">
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center justify-center gap-2 text-primary"
          >
            <div className="flex w-40 items-center justify-center">
              <img src="/logo-hor.svg" alt="NewsPulse" />
            </div>
          </Link>

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="hidden w-80 items-center rounded-lg bg-gray-100 px-3 py-1.5 lg:flex"
          >
            <IoSearchOutline />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="ml-2 w-full border-none bg-transparent text-sm outline-none placeholder:text-gray-500 focus:ring-0"
              placeholder="Search topics, sources..."
              type="text"
            />
          </form>
        </div>

        {/* Navigation Links */}
        <nav className="hidden items-center gap-6 md:flex">
          {["Tech", "Finance", "Health", "Politics", "Science"].map(
            (category) => (
              <Link
                to="/category"
                search={{ type: category.toLowerCase() }}
                key={category}
                className="cursor-pointer text-sm font-medium transition-colors hover:text-primary"
              >
                {t(`nav.${category.toLowerCase()}`, category)}
              </Link>
            ),
          )}
        </nav>

        {/* User Profile / Notifications */}
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className=" flex gap-2 relative rounded-full p-2 transition-colors hover:bg-gray-100">
                <MdOutlineLanguage size={25} /> {i18n.language}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => changeLanguage('en')}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeLanguage('am')}>
                Amharic
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <button className="relative rounded-full p-2 transition-colors hover:bg-gray-100">
            <MdOutlineNotificationsNone size={25} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-red-500"></span>
          </button>

          <div className="mx-1 h-8 w-[1px] bg-gray-200"></div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex cursor-pointer items-center gap-2 rounded-full p-1 pr-3 outline-none transition-colors hover:bg-gray-100">
                <div className="h-8 w-8 overflow-hidden rounded-full border border-gray-100 bg-primary/10">
                  <img
                    className="h-full w-full object-cover"
                    src={
                      session?.user?.image ||
                      "https://lh3.googleusercontent.com/aida-public/AB6AXuB48De54WM1iiDfajeEL5bUtOPQUeb9oDnkSapuiniqlO_XEjn_nwUDZ8ofDNdZhLgfnxe1WFu4ttmB7sD1sJ_ZzqF_8M4wUNp9rPRdVeSLTj-0Sk-iLCtjugYMsC8L5K0CEW3Ol828VUtr9x9cSd9uYkU9CRWzAf3pwO0tbfaEjbavZoAJn8UStpbTdM0LmfthTHuG7UfQHBk3mTr7ewGHKP1RJ8XnquEMwqc3dLeuyQI5Byu5zH8fUz7W_J6LMs-o65sl3FMoECR6"
                    }
                    alt="User Profile"
                  />
                </div>
                <span className="hidden text-sm font-semibold sm:inline">
                  {session?.user?.name || "User"}
                </span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>{t("user.account")}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => navigate({ to: "/profile" })}
                className="cursor-pointer"
              >
                {t("user.profile")}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigate({ to: "/saved" })}
                className="cursor-pointer"
              >
                {t("user.saved")}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer text-red-600"
              >
                {t("user.logout")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
