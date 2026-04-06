import React from "react";
import { X } from "lucide-react";

interface AuthModalProps {
  t: any;
  authMode: string;
  setAuthMode: (mode: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  authError: string;
  handleAuth: (e: React.FormEvent) => void;
  setIsAuthModalOpen: (isOpen: boolean) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  t,
  authMode,
  setAuthMode,
  email,
  setEmail,
  password,
  setPassword,
  authError,
  handleAuth,
  setIsAuthModalOpen,
}) => {
  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setIsAuthModalOpen(false)}
      ></div>
      <div className="bg-white dark:bg-[#0a0a0a] w-full max-w-[400px] rounded-2xl p-8 relative z-10 border border-black/10 dark:border-white/[0.08] shadow-2xl animate-in zoom-in-95 duration-200">
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
        <h2 className="text-2xl font-bold mb-8 text-center text-black dark:text-white tracking-tight">
          {authMode === "login"
            ? t.login
            : authMode === "register"
              ? t.register
              : t.resetPassword}
        </h2>
        <form onSubmit={handleAuth} className="flex flex-col gap-5">
          {authError && (
            <div className="text-red-500 text-xs text-center p-3 bg-red-500/10 rounded-xl">
              {authError}
            </div>
          )}
          {authMode !== "reset-password" && (
            <div>
              <label className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold mb-1.5 block">
                {t.email}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-neutral-50 dark:bg-[#050505] border border-black/10 dark:border-white/[0.08] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black/30 dark:focus:border-white/30 transition-colors"
                required
              />
            </div>
          )}
          {authMode !== "forgot-password" && (
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold block">
                  {t.password}
                </label>
                {authMode === "login" && (
                  <button
                    type="button"
                    onClick={() => setAuthMode("forgot-password")}
                    className="text-[10px] text-blue-500 hover:underline"
                  >
                    {t.forgotPassword}
                  </button>
                )}
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-neutral-50 dark:bg-[#050505] border border-black/10 dark:border-white/[0.08] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black/30 dark:focus:border-white/30 transition-colors"
                required
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full py-3.5 mt-4 rounded-xl bg-black text-white dark:bg-white dark:text-black font-bold shadow-xl hover:opacity-90 active:scale-95 transition-all"
          >
            {authMode === "login"
              ? t.login
              : authMode === "register"
                ? t.register
                : authMode === "reset-password"
                  ? t.resetPassword
                  : t.sendResetLink}
          </button>

          {authMode === "forgot-password" || authMode === "reset-password" ? (
            <button
              type="button"
              onClick={() => {
                setAuthMode("login");
                if (authMode === "reset-password") {
                  window.history.replaceState({}, "", "/");
                }
              }}
              className="text-xs text-neutral-500 mt-2 transition-colors text-center w-full hover:underline"
            >
              {t.backToLogin}
            </button>
          ) : (
            <button
              type="button"
              onClick={() =>
                setAuthMode(authMode === "login" ? "register" : "login")
              }
              className="text-xs text-neutral-500 mt-2 transition-colors text-center w-full hover:underline"
            >
              {authMode === "login"
                ? t.createAccountInstead
                : t.alreadyHaveAccount}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};
