import { useState, type FormEvent } from 'react'
import { Eye, EyeOff, LockKeyhole, LogIn, User } from 'lucide-react'
import { Logo } from '../branding/Logo'

interface LoginPageProps {
  onLogin: () => void
  onLoadingChange: (isLoading: boolean) => void
}

interface LoginErrors {
  username?: string
  password?: string
  form?: string
}

const DEMO_USERNAME = 'admin'
const DEMO_PASSWORD = 'password123'

export function LoginPage({ onLogin, onLoadingChange }: LoginPageProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<LoginErrors>({})

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors: LoginErrors = {}
    const normalizedUsername = username.trim().toLowerCase()

    if (!normalizedUsername) {
      nextErrors.username = 'Username is required.'
    }

    if (!password) {
      nextErrors.password = 'Password is required.'
    } else if (password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters.'
    }

    if (Object.keys(nextErrors).length === 0) {
      if (
        normalizedUsername !== DEMO_USERNAME ||
        password !== DEMO_PASSWORD
      ) {
        nextErrors.form = 'Username or password is incorrect.'
      } else {
        setErrors({})
        onLoadingChange(true)
        window.setTimeout(() => {
          onLogin()
          onLoadingChange(false)
        }, 700)
        return
      }
    }

    setErrors(nextErrors)
  }

  return (
    <main className="ai-login-bg relative grid min-h-screen place-items-center overflow-hidden px-4 py-10">
      <div className="ai-login-grid absolute inset-0" aria-hidden="true" />
      <div className="ai-login-orb ai-login-orb-one" aria-hidden="true" />
      <div className="ai-login-orb ai-login-orb-two" aria-hidden="true" />
      <div className="ai-login-ring absolute left-[12%] top-[18%] size-48 rounded-full border border-blue-300/30" aria-hidden="true" />
      <div className="ai-login-ring absolute bottom-[12%] right-[10%] size-64 rounded-full border border-cyan-300/25 [animation-delay:-3s]" aria-hidden="true" />
      <div className="absolute left-[18%] top-[34%] hidden size-2 rounded-full bg-cyan-400 shadow-[0_0_18px_5px_rgba(34,211,238,0.35)] lg:block" aria-hidden="true" />
      <div className="absolute bottom-[24%] right-[22%] hidden size-2 rounded-full bg-blue-400 shadow-[0_0_18px_5px_rgba(96,165,250,0.35)] lg:block" aria-hidden="true" />

      <div className="relative z-10 w-full max-w-sm">
        <section className="rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-[0_24px_70px_-28px_rgba(30,64,175,0.28)] backdrop-blur-xl sm:p-8">
          <div className="mb-7 flex justify-center">
            <Logo />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight text-slate-950">
              Welcome back
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Sign in to continue to your dashboard.
            </p>
          </div>

          <form
            className="mt-7 space-y-4"
            onSubmit={handleSubmit}
            autoComplete="off"
            noValidate
          >
            <div>
              <label
                htmlFor="username"
                className="mb-1.5 block text-xs font-semibold text-slate-700"
              >
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="username"
                  name="login-username"
                  type="text"
                  autoComplete="off"
                  value={username}
                  onChange={(event) => {
                    setUsername(event.target.value)
                    if (errors.username || errors.form) {
                      setErrors((current) => ({
                        ...current,
                        username: undefined,
                        form: undefined,
                      }))
                    }
                  }}
                  aria-invalid={Boolean(errors.username)}
                  aria-describedby={
                    errors.username ? 'username-error' : undefined
                  }
                  className={`h-11 w-full rounded-xl border bg-slate-50 pl-10 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-4 ${
                    errors.username
                      ? 'border-rose-300 focus:border-rose-400 focus:ring-rose-50'
                      : 'border-slate-200 focus:border-blue-300 focus:ring-blue-50'
                  }`}
                  placeholder="Enter your username"
                />
              </div>
              {errors.username && (
                <p id="username-error" className="mt-1.5 text-xs text-rose-600">
                  {errors.username}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-xs font-semibold text-slate-700"
              >
                Password
              </label>
              <div className="relative">
                <LockKeyhole className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="password"
                  name="login-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="off"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value)
                    if (errors.password || errors.form) {
                      setErrors((current) => ({
                        ...current,
                        password: undefined,
                        form: undefined,
                      }))
                    }
                  }}
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={
                    errors.password ? 'password-error' : undefined
                  }
                  className={`h-11 w-full rounded-xl border bg-slate-50 pl-10 pr-10 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-4 ${
                    errors.password
                      ? 'border-rose-300 focus:border-rose-400 focus:ring-rose-50'
                      : 'border-slate-200 focus:border-blue-300 focus:ring-blue-50'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p id="password-error" className="mt-1.5 text-xs text-rose-600">
                  {errors.password}
                </p>
              )}
            </div>

            {errors.form && (
              <p
                role="alert"
                className="rounded-lg bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700"
              >
                {errors.form}
              </p>
            )}

            <button
              type="submit"
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:from-blue-700 hover:to-cyan-600 focus:outline-none focus:ring-4 focus:ring-blue-100"
            >
              <LogIn className="size-4" />
              Sign in
            </button>
          </form>

          <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-blue-800">
                  Demo account
                </p>
                <p className="mt-1 text-xs text-blue-700">
                  Username: {DEMO_USERNAME}
                </p>
                <p className="mt-0.5 text-xs text-blue-700">
                  Password: {DEMO_PASSWORD}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setUsername(DEMO_USERNAME)
                  setPassword(DEMO_PASSWORD)
                  setErrors({})
                }}
                className="shrink-0 rounded-lg border border-blue-200 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-blue-700 transition hover:border-blue-300 hover:bg-blue-100"
              >
                Fill demo
              </button>
            </div>
          </div>
        </section>
        <p className="mt-5 text-center text-[11px] font-medium text-slate-500">
          Secure AI-powered workspace
        </p>
      </div>
    </main>
  )
}
