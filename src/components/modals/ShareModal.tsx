import React from "react";
import { X, Share2, Eye, ShieldCheck, Check, Link } from "lucide-react";
import { ShareConfig } from "@/src/types";

interface ShareModalProps {
  t: any;
  lang: string;
  user: any;
  shareConfig: ShareConfig;
  updatePreference: (updates: Partial<ShareConfig>) => void;
  setIsShareModalOpen: (isOpen: boolean) => void;
  handleCopy: (text: string, id: string, e?: React.MouseEvent) => void;
  copiedId: string | null;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  t,
  lang,
  user,
  shareConfig,
  updatePreference,
  setIsShareModalOpen,
  handleCopy,
  copiedId,
}) => {
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setIsShareModalOpen(false)}
      ></div>
      <div className="bg-white dark:bg-[#0a0a0a] w-full max-w-[420px] rounded-2xl p-8 relative z-10 border border-black/10 dark:border-white/[0.08] shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
        <h2 className="text-xl font-medium mb-8 flex items-center gap-2 text-black dark:text-white">
          <Share2 size={20} className="text-blue-500" /> {t.shareTitle}
        </h2>
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-50 dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-medium text-black dark:text-white">
                {t.shareEnable}
              </span>
              <span className="text-[10px] text-neutral-500">
                {t.publicVisibilityToggle}
              </span>
            </div>
            <button
              onClick={() =>
                updatePreference({ enabled: !shareConfig.enabled })
              }
              className={`w-12 h-6 rounded-full transition-all relative ${shareConfig.enabled ? "bg-blue-500" : "bg-neutral-300 dark:bg-zinc-800"}`}
            >
              <div
                className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${lang === "ar" ? (shareConfig.enabled ? "right-1" : "right-7") : shareConfig.enabled ? "left-7" : "left-1"}`}
              ></div>
            </button>
          </div>
          {shareConfig.enabled && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">
                  {t.permission}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => updatePreference({ permission: "view" })}
                    className={`p-3 rounded-xl border text-xs flex flex-col items-center gap-2 transition-all ${shareConfig.permission === "view" ? "border-blue-500 bg-blue-500/5 text-blue-500" : "border-black/5 dark:border-white/5 text-neutral-500"}`}
                  >
                    <Eye size={16} /> {t.viewOnly}
                  </button>
                  <button
                    onClick={() => updatePreference({ permission: "edit" })}
                    className={`p-3 rounded-xl border text-xs flex flex-col items-center gap-2 transition-all ${shareConfig.permission === "edit" ? "border-red-500 bg-red-500/5 text-red-500" : "border-black/5 dark:border-white/5 text-neutral-500"}`}
                  >
                    <ShieldCheck size={16} /> {t.editAccess}
                  </button>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-neutral-100 dark:bg-white/[0.03] border border-black/5 dark:border-white/5 flex items-center justify-between gap-3">
                <span className="text-[10px] truncate text-neutral-500 flex-1">
                  {window.location.origin}?space={user.uid}
                </span>
                <button
                  onClick={() =>
                    handleCopy(
                      `${window.location.origin}?space=${user.uid}`,
                      "share",
                    )
                  }
                  className="p-2 rounded-lg bg-black dark:bg-white text-white dark:text-black transition-transform active:scale-90 shadow-lg"
                >
                  {copiedId === "share" ? (
                    <Check size={14} />
                  ) : (
                    <Link size={14} />
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
        <button
          onClick={() => setIsShareModalOpen(false)}
          className="w-full mt-8 py-2.5 rounded-xl border border-black/5 dark:border-white/10 text-sm font-medium hover:bg-neutral-50 dark:hover:bg-white/5 transition-all text-neutral-600 dark:text-zinc-400"
        >
          {t.cancel}
        </button>
      </div>
    </div>
  );
};
