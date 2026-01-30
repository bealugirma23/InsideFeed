import { useState } from 'react';
import { LoginForm } from '../components/login-form';
import { SignupForm } from '../components/signup-form';

export const LoginPage = () => {
  const [mode, setMode] = useState<'Login' | 'Sign Up'>('Login');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
     <div className="flex min-h-screen w-full flex-col lg:flex-row">
      {/* Left Side: Visual Anchor */}
      <div className="relative hidden lg:flex lg:w-1/2 bg-primary overflow-hidden items-center justify-center">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-80" 
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBA0tlxFwJJpDNZPXemz1sUNyaNrsSWc5jZXzxu7hoCMnNm4ElVoEaMq07l_ARraYZNvpCnymeIMXcNby5qr3mWvIRzDVpLwew8UPgheRyEzvcgF-WjzPjGDjkfWNulsI2o9O5QHJ-KA5JeDv1OdSwZ-ut0X6jNpytUdow2VbpPatW_mwyBiAAJ1AKUw3T7OJdc6C-Xmu-hf7s2PE9k7jREcY_1nZAtB_VmTTJQTv0sdbiSEbaLLo9eJp-EHnsFraMmij2iYyqHvoRR')" }}
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-tr from-primary/90 to-primary/40"></div>
        <div className="relative z-20 px-12 text-white">
          <div className="flex items-center gap-3 mb-8">
            <div className="size-10 bg-white rounded-lg flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-3xl font-bold">hub</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">NewsPulse</h1>
          </div>
          <h2 className="text-5xl font-black leading-tight mb-6">Your world,<br />personalized.</h2>
          <p className="text-xl text-white/80 max-w-md leading-relaxed font-medium">
            Join over 2 million readers discovering stories that matter. Real-time insights from across the globe, tailored to your interests.
          </p>
          <div className="mt-12 flex gap-12">
            <div className="flex flex-col">
              <span className="text-3xl font-black">500+</span>
              <span className="text-sm text-white/60 font-medium">Trusted Sources</span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-black">24/7</span>
              <span className="text-sm text-white/60 font-medium">Live Updates</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Auth Form */}
      <div className="flex w-full flex-col lg:w-1/2 bg-white items-center justify-center p-8 lg:p-20">
        <div className="w-full max-w-[440px] flex flex-col">
          {/* Mobile Logo */}
          <div className="flex lg:hidden items-center gap-2 mb-10 text-primary">
            <span className="material-symbols-outlined text-3xl font-bold">hub</span>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">NewsPulse</h1>
          </div>

          <div className="mb-8">
            <h2 className="text-slate-950 text-3xl font-black tracking-tight leading-tight">Welcome back</h2>
            <p className="text-slate-500 text-base mt-2 font-medium">Access your tailored news feed and join the conversation.</p>
          </div>

          {/* Toggle */}
          <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
            <button 
              onClick={() => setMode('Login')}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${mode === 'Login' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Login
            </button>
            <button 
              onClick={() => setMode('Sign Up')}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${mode === 'Sign Up' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Sign Up
            </button>
          </div>

          {/* Social Logins */}
          <div className="flex flex-col gap-3 mb-8">
            <button className="flex w-full items-center justify-center gap-3 h-12 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors">
              <img alt="Google" className="size-5" src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" />
              <span className="text-slate-700 font-bold text-sm">Continue with Google</span>
            </button>
            <button className="flex w-full items-center justify-center gap-3 h-12 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors">
              <span className="material-symbols-outlined text-slate-900">routesle</span>
              <span className="text-slate-700 font-bold text-sm">Continue with Apple</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center mb-8">
            <div className="flex-grow border-t border-slate-100"></div>
            <span className="flex-shrink mx-4 text-slate-400 text-[10px] font-bold uppercase tracking-widest">Or with email</span>
            <div className="flex-grow border-t border-slate-100"></div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Email address</label>
              <input 
                required
                className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-slate-900 placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" 
                placeholder="name@example.com" 
                type="email" 
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-bold text-slate-700">Password</label>
                <a className="text-xs font-bold text-primary hover:underline" href="#">Forgot password?</a>
              </div>
              <input 
                required
                className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-slate-900 placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" 
                placeholder="••••••••" 
                type="password" 
              />
            </div>
            <div className="flex items-center gap-2 px-1 mt-1">
              <input className="size-4 rounded border-slate-300 text-primary focus:ring-primary" id="remember" type="checkbox" />
              <label className="text-sm text-slate-500 font-medium" htmlFor="remember">Remember me for 30 days</label>
            </div>
            <button 
              className="mt-4 flex h-14 w-full items-center justify-center rounded-xl bg-primary text-white font-black tracking-wide hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 active:scale-[0.98]" 
              type="submit"
            >
              Continue
            </button>
          </form>

          <p className="mt-10 text-center text-[13px] text-slate-500 leading-relaxed font-medium">
            By continuing, you agree to NewsPulse's 
            <a className="text-slate-900 font-bold hover:underline mx-1" href="#">Terms of Service</a> and 
            <a className="text-slate-900 font-bold hover:underline" href="#">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
