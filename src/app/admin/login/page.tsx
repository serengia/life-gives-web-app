import { loginAction } from "@/app/admin/actions";

export default function LoginPage({
  searchParams,
}: {
  searchParams: { next?: string; error?: string };
}) {
  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="font-heading text-2xl font-bold text-white text-center mb-2">
          Admin Login
        </h1>
        <p className="text-gray-400 text-sm text-center mb-8">
          James Serengia Blog
        </p>
        {searchParams.error === "invalid" && (
          <div className="mb-4 rounded bg-red-900/40 border border-red-500/40 px-4 py-3 text-sm text-red-300">
            Invalid password. Try again.
          </div>
        )}
        <form className="space-y-4" action={loginAction}>
          <input
            type="hidden"
            name="next"
            value={searchParams.next ?? "/admin"}
          />
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              autoFocus
              className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
          <button type="submit" className="w-full btn-gold py-2.5 text-sm">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
