import { useState } from "react"
import { Link, useNavigate } from "@tanstack/react-router"

import { authClient } from "@/lib/auth-client"
import { negative } from "zod"

enum pageOption {
  LOGIN,
  SIGNUP,
  FORGOTPASSWORD
}
export const LoginPage = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)






  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { data, error } = await authClient.signIn.email(
        {
          email,
          password,
        },
        {
          onSuccess: () => {
            navigate({ to: "/" })
          },
          onError: (ctx: any) => {
            setError(ctx.error.message)
          },
        },
      )
    } catch (err: any) {
      setError(err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row">
      {/* Left Side: Visual Anchor */}
      <div className="relative hidden items-center justify-center overflow-hidden bg-primary lg:flex lg:w-1/2">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center opacity-80 bg-orange-600"
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-tr from-primary/90 to-primary/40"></div>
        <div className="relative z-20 px-12 text-white">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-white text-primary">
              <img src="/logo-hori.png" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">InsideFeed</h1>
          </div>
          <h2 className="mb-6 text-5xl font-black leading-tight">
            Your world,
            <br />
            personalized.
          </h2>
          <p className="max-w-md text-xl font-medium leading-relaxed text-white/80">
            Join us as you discover stories that matter.
            Real-time insights from across the globe, tailored to your
            interests.
          </p>
          <div className="mt-12 flex gap-12">
            <div className="flex flex-col">
              <span className="text-3xl font-black">20+</span>
              <span className="text-sm font-medium text-white/60">
                Trusted Sources
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-black">24/7</span>
              <span className="text-sm font-medium text-white/60">
                Live Updates
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Auth Form */}
      <div className="flex w-full flex-col items-center justify-center bg-white p-8 lg:w-1/2 lg:p-20">
        <div className="flex w-full max-w-[440px] flex-col">
          {/* Mobile Logo */}
          <div className="mb-10 flex items-center gap-2 text-primary lg:hidden">
            <span className="material-symbols-outlined text-3xl font-bold">
              hub
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              NewsPulse
            </h1>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-black leading-tight tracking-tight text-slate-950">
               "Welcome back"
            </h2>
            <p className="mt-2 text-base font-medium text-slate-500">
              Access your tailored news feed and join the conversation.
            </p>
          </div>

          {/* Toggle */}
          <div className="mb-6 flex rounded-xl bg-slate-100 p-1">
            <button
             onClick={()=>{ navigate({to: "/auth/login"}) }} 
            className={`flex-1 rounded-lg py-2 text-sm font-bold text-slate-900 shadow-sm transition-all`}
            >
              Login
            </button>
            <button
             onClick={()=>{ navigate({to: "/auth/signup"}) }} 
             className={`flex flex-1 items-center justify-center rounded-lg py-2 text-sm font-bold text-slate-500 transition-all hover:text-slate-700`}
            >
              Sign Up
            </button>
          </div>

          {/* Social Logins */}
          <div className="mb-8 flex flex-col gap-3">
            <button className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-slate-200 transition-colors hover:bg-slate-50">
              <img
                alt="Google"
                className="size-5"
                src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png"
              />
              <span className="text-sm font-bold text-slate-700">
                Continue with Google
              </span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-8 flex items-center">
            <div className="flex-grow border-t border-slate-100"></div>
            <span className="mx-4 flex-shrink text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Or with email
            </span>
            <div className="flex-grow border-t border-slate-100"></div>
          </div>



          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="ml-1 text-sm font-bold text-slate-700">
                Email address
              </label>
              <input
                required
                className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary"
                placeholder="name@example.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="ml-1 flex items-center justify-between">
                <label className="text-sm font-bold text-slate-700">
                  Password
                </label>
                <button
                  className="text-xs font-bold text-primary hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <input
                required
                className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary"
                placeholder="••••••••"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mt-1 flex items-center gap-2 px-1">
              <input
                className="size-4 rounded border-slate-300 text-primary focus:ring-primary"
                id="remember"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label
                className="text-sm font-medium text-slate-500"
                htmlFor="remember"
              >
                Remember me for 30 days
              </label>
            </div>
            {error && (
              <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm font-medium text-red-600">
                {error}
              </div>
            )}
            <button
              className="mt-4 flex h-14 w-full items-center justify-center rounded-xl bg-primary font-black tracking-wide text-white shadow-xl shadow-primary/20 transition-all hover:bg-primary/90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
              type="submit"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Continue"}
            </button>
          </form>

          <p className="mt-10 text-center text-[13px] font-medium leading-relaxed text-slate-500">
            By continuing, you agree to InsideFeed's
            <a
              className="mx-1 font-bold text-slate-900 hover:underline"
              href="#"
            >
              Terms of Service
            </a>{" "}
            and
            <a className="font-bold text-slate-900 hover:underline" href="#">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
