import { Link } from "react-router-dom";

export function AdminPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0A1628] px-6 text-center text-white">
      <p className="text-xs uppercase tracking-[0.18em] text-[#C5963A]">Private</p>
      <h1 className="mt-3 font-serif text-4xl font-bold">Admin</h1>
      <p className="mt-3 max-w-md text-sm text-white/60">
        This area is not public. Sign in with an authorized account to continue.
      </p>
      <Link to="/login" className="mt-6 text-sm text-[#C5963A] underline">
        Go to sign in
      </Link>
    </div>
  );
}
