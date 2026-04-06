import React from "react";
import { X, RefreshCw, Wand2 } from "lucide-react";
import { Bookmark, Category } from "@/src/types";

interface SaveModalProps {
  t: any;
  editingItem: Bookmark | null;
  setIsModalOpen: (isOpen: boolean) => void;
  handleSave: (e: React.FormEvent) => void;
  analyzeLink: () => void;
  aiMetaLoading: boolean;
  categoriesList: Category[];
  formRef: React.RefObject<HTMLFormElement>;
}

export const SaveModal: React.FC<SaveModalProps> = ({
  t,
  editingItem,
  setIsModalOpen,
  handleSave,
  analyzeLink,
  aiMetaLoading,
  categoriesList,
  formRef,
}) => {
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 dark:bg-black/80 backdrop-blur-sm"
        onClick={() => setIsModalOpen(false)}
      ></div>
      <div className="bg-white dark:bg-[#0a0a0a] w-full max-w-[420px] rounded-xl p-8 relative z-10 border border-black/10 dark:border-white/[0.08] shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-sm font-medium text-black dark:text-white">
            {editingItem ? t.editLink : t.addLink}
          </h2>
          <button
            onClick={() => setIsModalOpen(false)}
            className="text-neutral-500 hover:text-black dark:hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>
        <form
          ref={formRef}
          onSubmit={handleSave}
          className="flex flex-col gap-5"
        >
          <div className="relative">
            <label className="text-[10px] uppercase tracking-widest text-neutral-500 dark:text-zinc-500 font-bold mb-1.5 block">
              {t.url}
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                name="url"
                defaultValue={editingItem?.url || ""}
                placeholder="https://..."
                required
                className="flex-1 bg-neutral-50 dark:bg-[#050505] border border-black/10 dark:border-white/[0.08] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black/30 transition-colors"
              />
              <button
                type="button"
                onClick={analyzeLink}
                disabled={aiMetaLoading}
                className="p-2 rounded-lg bg-purple-500/10 text-purple-500 border border-purple-500/20 hover:bg-purple-500/20 transition-all flex items-center justify-center min-w-[40px]"
                title={t.aiGen}
              >
                {aiMetaLoading ? (
                  <RefreshCw size={16} className="animate-spin" />
                ) : (
                  <Wand2 size={16} />
                )}
              </button>
            </div>
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest text-neutral-500 dark:text-zinc-500 font-bold mb-1.5 block">
              {t.title}
            </label>
            <input
              type="text"
              name="title"
              defaultValue={editingItem?.title || ""}
              required
              maxLength={11}
              className="w-full bg-neutral-50 dark:bg-[#050505] border border-black/10 dark:border-white/[0.08] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black/30 dark:focus:border-zinc-500 transition-colors"
            />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest text-neutral-500 dark:text-zinc-500 font-bold mb-1.5 block">
              {t.category}
            </label>
            <select
              name="category"
              defaultValue={editingItem?.category || "work"}
              className="w-full bg-neutral-50 dark:bg-[#050505] border border-black/10 dark:border-white/[0.08] text-black dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black/30 appearance-none outline-none"
            >
              {categoriesList
                .filter((c) => c.name !== "all")
                .map((c) => (
                  <option key={c.id} value={c.name}>
                    {t[c.name] || c.name}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest text-neutral-500 dark:text-zinc-500 font-bold mb-1.5 block">
              {t.description}
            </label>
            <textarea
              name="description"
              defaultValue={editingItem?.description || ""}
              rows={2}
              className="w-full bg-neutral-50 dark:bg-[#050505] border border-black/10 dark:border-white/[0.08] text-black dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black/30 dark:focus:border-zinc-500 transition-colors resize-none"
            ></textarea>
          </div>
          <div className="flex gap-3 mt-4">
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-lg bg-black text-white dark:bg-white dark:text-black text-sm font-bold shadow-xl hover:opacity-90 transition-all"
            >
              {t.save}
            </button>
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="flex-1 py-2.5 rounded-lg border border-black/10 text-sm font-medium hover:bg-neutral-100 dark:hover:bg-white/[0.05] transition-all"
            >
              {t.cancel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
