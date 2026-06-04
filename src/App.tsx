/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  setDoc,
  writeBatch,
} from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
  applyActionCode,
  confirmPasswordReset,
} from "firebase/auth";
import { db, appId, auth } from "@/src/lib/firebase";
import { callGemini } from "@/src/lib/gemini";
import { dict } from "@/src/locales/dict";
import { quranVerses, hadiths, staticCategories } from "@/src/data/static";
import { Bookmark, Category, ShareConfig } from "@/src/types";
import { formatUrl } from "@/src/lib/utils";
import { Boxes } from "lucide-react";
import { Footer } from "@/src/components/Footer";
import { LandingPage } from "@/src/components/LandingPage";
import { Dashboard } from "@/src/components/Dashboard";
import { AuthModal } from "@/src/components/auth/AuthModal";
import { ShareModal } from "@/src/components/modals/ShareModal";
import { SaveModal } from "@/src/components/modals/SaveModal";

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [customCategories, setCustomCategories] = useState<Category[]>([]);
  const [lang, setLang] = useState("en");
  const t = dict[lang];

  // UI & Interaction States
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Bookmark | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editCatName, setEditCatName] = useState("");

  // Category Adding/Removing
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCatName, setNewCatName] = useState("");
  const [isRemovingCategory, setIsRemovingCategory] = useState(false);
  const [catToDelete, setCatToDelete] = useState("");

  const [toast, setToast] = useState<string | null>(null);
  const [activeWidget, setActiveWidget] = useState("none");
  const [shareConfig, setShareConfig] = useState<ShareConfig>({
    enabled: false,
    permission: "view",
    widget: "none",
  });
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [sharedSpaceId, setSharedSpaceId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("viewMode") || "large";
    }
    return "large";
  });
  const [themeMode, setThemeMode] = useState("light");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Auth
  const [authMode, setAuthMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const [aiMetaLoading, setAiMetaLoading] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiWisdom, setAiWisdom] = useState({
    text: "Structuring your thoughts...",
    info: "Stools AI",
  });
  const [currentTime, setCurrentTime] = useState(new Date());
  const [randomQuran, setRandomQuran] = useState(quranVerses[0]);
  const [randomHadith, setRandomHadith] = useState(hadiths[0]);

  const formRef = useRef<HTMLFormElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const categoriesList = useMemo(() => {
    const statics = staticCategories.map((c) => ({
      id: `static-${c}`,
      name: c,
      isStatic: true,
    }));
    const customs = customCategories.map((c) => ({
      id: c.id,
      name: c.name,
      isStatic: false,
    }));
    return [...statics, ...customs];
  }, [customCategories]);

  const faqs = useMemo(
    () => [
      { q: t.faq1Q, a: t.faq1A },
      { q: t.faq2Q, a: t.faq2A },
      { q: t.faq3Q, a: t.faq3A },
      { q: t.faq4Q, a: t.faq4A },
    ],
    [t],
  );

  const filteredBookmarks = useMemo(() => {
    const q = searchTerm.toLowerCase();
    return bookmarks.filter((b) => {
      if (b.groupId && q === "") return false;
      const titleMatch = b.title?.toLowerCase().includes(q);
      const descMatch = b.description?.toLowerCase().includes(q);
      const categoryMatch =
        selectedCategory === "all" ||
        (selectedCategory === "recent" && b.createdAt && Date.now() - b.createdAt < 7 * 24 * 60 * 60 * 1000) ||
        (selectedCategory === "favorites" && b.isFavorite) ||
        b.category === selectedCategory;
      return (titleMatch || descMatch || q === "") && categoryMatch;
    });
  }, [bookmarks, searchTerm, selectedCategory]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const generateAiWisdom = async () => {
    setIsAiLoading(true);
    const prompt = `Give a one-sentence minimalist productivity tip or organizational insight for someone building a 'tool stock'. Language: ${lang === "ar" ? "Arabic" : "English"}. No emojis.`;
    try {
      const result = await callGemini(prompt);
      if (result)
        setAiWisdom({
          text: result,
          info: lang === "ar" ? "نظام Stools الذكي" : "Stools Intelligence",
        });
    } catch (e) {
      setAiWisdom({
        text:
          lang === "ar"
            ? "التنظيم هو أساس الإنجاز."
            : "Organization is the foundation of achievement.",
        info: "System",
      });
    }
    setIsAiLoading(false);
  };

  const analyzeLink = async () => {
    const urlVal = formRef.current?.elements.namedItem(
      "url",
    ) as HTMLInputElement;
    if (!urlVal || !urlVal.value) return;
    setAiMetaLoading(true);
    const prompt = `URL: ${urlVal.value}. Analyze this link and return a Tool Title (max 3 words) and a short functional description (max 10 words). Language: ${lang === "ar" ? "Arabic" : "English"}. Format as JSON: {"title": "...", "description": "..."}. Raw text only.`;
    try {
      const result = await callGemini(prompt);
      if (result) {
        const cleanJson = result.replace(/```json|```/g, "").trim();
        const parsed = JSON.parse(cleanJson);
        if (formRef.current) {
          (
            formRef.current.elements.namedItem("title") as HTMLInputElement
          ).value = parsed.title;
          (
            formRef.current.elements.namedItem(
              "description",
            ) as HTMLInputElement
          ).value = parsed.description;
        }
      }
    } catch (e) {
      showToast(t.aiError);
    }
    setAiMetaLoading(false);
  };

  const refreshWidgetContent = () => {
    if (activeWidget === "quran" && quranVerses?.length)
      setRandomQuran(
        quranVerses[Math.floor(Math.random() * quranVerses.length)],
      );
    if (activeWidget === "hadith" && hadiths?.length)
      setRandomHadith(hadiths[Math.floor(Math.random() * hadiths.length)]);
    if (activeWidget === "ai") generateAiWisdom();
  };

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    if (activeWidget === "ai") generateAiWisdom();
    return () => clearInterval(timer);
  }, [activeWidget, lang]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const space = params.get("space");
    if (space) setSharedSpaceId(space);

    // Handle Firebase Auth actions (email verification, password reset)
    const mode = params.get("mode");
    const actionCode = params.get("oobCode");

    if (mode === "verifyEmail" && actionCode) {
      applyActionCode(auth, actionCode)
        .then(() => {
          showToast(lang === "ar" ? "تم تأكيد البريد الإلكتروني بنجاح" : "Email verified successfully");
          window.history.replaceState({}, "", "/");
          setAuthMode("login");
          setIsAuthModalOpen(true);
        })
        .catch((error) => {
          console.error("Email verification failed", error);
          showToast(lang === "ar" ? "فشل تأكيد البريد الإلكتروني" : "Email verification failed");
          window.history.replaceState({}, "", "/");
        });
    } else if (mode === "resetPassword" && actionCode) {
      setAuthMode("reset-password");
      setIsAuthModalOpen(true);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    console.log("Theme mode:", themeMode);
    if (
      themeMode === "dark" ||
      (themeMode === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      root.classList.add("dark");
      console.log("Added dark class. ClassList:", root.classList);
    } else {
      root.classList.remove("dark");
      console.log("Removed dark class. ClassList:", root.classList);
    }
  }, [themeMode]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("viewMode", viewMode);
    }
  }, [viewMode]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          isAnonymous: firebaseUser.isAnonymous,
          isActive: true,
        });
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const effectiveUid =
      sharedSpaceId || (user && !user.isAnonymous ? user.uid : null);
    if (!effectiveUid) {
      setBookmarks([]);
      setCustomCategories([]);
      return;
    }

    const configRef = doc(
      db,
      "artifacts",
      appId,
      "public",
      "data",
      "shareConfigs",
      effectiveUid,
    );
    const unsubConfig = onSnapshot(configRef, (snap) => {
      if (snap.exists()) {
        const configData = snap.data() as ShareConfig;
        setShareConfig(configData);
        if (configData.widget) setActiveWidget(configData.widget);
      }
    }, (error) => {
      console.error("Error in configRef onSnapshot:", error);
    });

    const categoriesPath = collection(
      db,
      "artifacts",
      appId,
      "users",
      effectiveUid,
      "categories",
    );
    const unsubCategories = onSnapshot(categoriesPath, (snapshot) => {
      setCustomCategories(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Category),
      );
    }, (error) => {
      console.error("Error in categoriesPath onSnapshot:", error);
    });

    const bookmarksPath = collection(
      db,
      "artifacts",
      appId,
      "users",
      effectiveUid,
      "bookmarks",
    );
    const unsubBookmarks = onSnapshot(bookmarksPath, (snapshot) => {
      const data = snapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() }) as Bookmark,
      );
      data.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      setBookmarks(data);
    }, (error) => {
      console.error("Error in bookmarksPath onSnapshot:", error);
    });

    return () => {
      unsubConfig();
      unsubCategories();
      unsubBookmarks();
    };
  }, [user, sharedSpaceId]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setBookmarks([]);
      setCustomCategories([]);
      showToast(
        lang === "ar" ? "تم تسجيل الخروج بنجاح" : "Logged out successfully",
      );
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    try {
      if (authMode === "register") {
        await createUserWithEmailAndPassword(auth, email, password);
        showToast(lang === "ar" ? "تم التسجيل بنجاح!" : "Registered successfully!");
        setAuthMode("login");
      } else if (authMode === "forgot-password") {
        await sendPasswordResetEmail(auth, email);
        showToast(lang === "ar" ? "تم إرسال رابط إعادة التعيين" : "Password reset link sent");
        setAuthMode("login");
      } else if (authMode === "reset-password") {
        const params = new URLSearchParams(window.location.search);
        const actionCode = params.get("oobCode");
        if (!actionCode) throw new Error("Invalid or missing action code");
        await confirmPasswordReset(auth, actionCode, password);
        showToast(lang === "ar" ? "تم إعادة تعيين كلمة المرور بنجاح" : "Password reset successfully");
        window.history.replaceState({}, "", "/");
        setAuthMode("login");
      } else if (authMode === "login") {
        await signInWithEmailAndPassword(auth, email, password);
        showToast(lang === "ar" ? "تم تسجيل الدخول بنجاح!" : "Logged in successfully!");
        window.history.replaceState({}, "", window.location.pathname);
        setSharedSpaceId(null);
        setIsAuthModalOpen(false);
      }
    } catch (err: any) {
      console.error("Auth error:", err);
      let errorMessage = lang === "ar" ? "حدث خطأ في المصادقة. يرجى المحاولة مرة أخرى." : "Authentication error. Please try again.";
      
      if (err && typeof err === 'object' && 'code' in err) {
        switch (err.code) {
          case "auth/email-already-in-use":
            errorMessage = lang === "ar" ? "البريد الإلكتروني مستخدم بالفعل" : "Email already in use";
            break;
          case "auth/invalid-credential":
          case "auth/wrong-password":
          case "auth/user-not-found":
            errorMessage = lang === "ar" ? "البريد الإلكتروني أو كلمة المرور غير صحيحة" : "Invalid email or password";
            break;
          case "auth/weak-password":
            errorMessage = lang === "ar" ? "كلمة المرور ضعيفة جداً" : "Password is too weak";
            break;
          case "auth/invalid-email":
            errorMessage = lang === "ar" ? "البريد الإلكتروني غير صالح" : "Invalid email address";
            break;
        }
      }
      setAuthError(errorMessage);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const effectiveUid = sharedSpaceId || user?.uid;
    if (!effectiveUid) return;
    if (
      sharedSpaceId &&
      shareConfig.permission === "view" &&
      user?.uid !== sharedSpaceId
    ) {
      showToast("Read-only access");
      return;
    }
    const fd = new FormData(e.target as HTMLFormElement);
    const data = {
      title: fd.get("title") || "Untitled",
      url: formatUrl(fd.get("url") as string),
      category: fd.get("category") || "other",
      description: fd.get("description") || "",
      isFavorite: fd.get("isFavorite") === "true",
      updatedAt: Date.now(),
    };
    try {
      const colRef = collection(
        db,
        "artifacts",
        appId,
        "users",
        effectiveUid,
        "bookmarks",
      );
      if (editingItem) await updateDoc(doc(colRef, editingItem.id), data);
      else await addDoc(colRef, { ...data, createdAt: Date.now() });
      
      showToast(editingItem ? t.msgUpdated : t.msgAdded);
      setIsModalOpen(false);
      setEditingItem(null);
    } catch (err) {
      showToast("Error saving!");
    }
  };

  const handleDelete = async (id: string) => {
    const effectiveUid = sharedSpaceId || user?.uid;
    if (!effectiveUid) return;
    if (
      sharedSpaceId &&
      shareConfig.permission === "view" &&
      user?.uid !== sharedSpaceId
    )
      return;
    try {
      const itemToDelete = bookmarks.find(b => b.id === id);
      
      if (itemToDelete?.isGroup) {
        // If it's a group, delete the group and all its items
        const batch = writeBatch(db);
        const groupRef = doc(db, "artifacts", appId, "users", effectiveUid, "bookmarks", id);
        batch.delete(groupRef);
        
        const groupItems = itemToDelete.items || [];
        groupItems.forEach(itemId => {
          const itemRef = doc(db, "artifacts", appId, "users", effectiveUid, "bookmarks", itemId);
          batch.delete(itemRef);
        });
        
        await batch.commit();
      } else {
        await deleteDoc(
          doc(db, "artifacts", appId, "users", effectiveUid, "bookmarks", id),
        );
      }
      
      showToast(t.msgDeleted);
      setActiveMenuId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleFavorite = async (id: string, currentFav: boolean) => {
    const effectiveUid = sharedSpaceId || user?.uid;
    if (!effectiveUid) return;
    if (
      sharedSpaceId &&
      shareConfig.permission === "view" &&
      user?.uid !== sharedSpaceId
    )
      return;
    try {
      await updateDoc(
        doc(db, "artifacts", appId, "users", effectiveUid, "bookmarks", id),
        { isFavorite: !currentFav }
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateGroup = async (name: string, itemIds: string[]) => {
    const effectiveUid = sharedSpaceId || user?.uid;
    if (!effectiveUid || !name.trim() || itemIds.length === 0) return;
    if (sharedSpaceId && shareConfig.permission === "view" && user?.uid !== sharedSpaceId) return;

    try {
      const batch = writeBatch(db);
      const newGroupRef = doc(collection(db, "artifacts", appId, "users", effectiveUid, "bookmarks"));
      
      batch.set(newGroupRef, {
        title: name.trim(),
        url: "",
        category: selectedCategory === "all" ? "other" : selectedCategory,
        isGroup: true,
        items: itemIds,
        createdAt: Date.now(),
        updatedAt: Date.now()
      });

      itemIds.forEach(id => {
        const itemRef = doc(db, "artifacts", appId, "users", effectiveUid, "bookmarks", id);
        batch.update(itemRef, { groupId: newGroupRef.id });
      });

      await batch.commit();
      showToast(lang === "ar" ? "تم إنشاء المجموعة" : "Group created");
    } catch (err) {
      console.error(err);
      showToast("Error creating group");
    }
  };

  const handleUngroup = async (groupId: string, itemIds: string[]) => {
    const effectiveUid = sharedSpaceId || user?.uid;
    if (!effectiveUid) return;
    if (sharedSpaceId && shareConfig.permission === "view" && user?.uid !== sharedSpaceId) return;

    try {
      const batch = writeBatch(db);
      const groupRef = doc(db, "artifacts", appId, "users", effectiveUid, "bookmarks", groupId);
      batch.delete(groupRef);

      itemIds.forEach(id => {
        const itemRef = doc(db, "artifacts", appId, "users", effectiveUid, "bookmarks", id);
        batch.update(itemRef, { groupId: null });
      });

      await batch.commit();
      showToast(lang === "ar" ? "تم فك المجموعة" : "Group removed");
    } catch (err) {
      console.error(err);
    }
  };

  const handleRenameGroup = async (groupId: string, newName: string) => {
    const effectiveUid = sharedSpaceId || user?.uid;
    if (!effectiveUid || !newName.trim()) return;
    if (sharedSpaceId && shareConfig.permission === "view" && user?.uid !== sharedSpaceId) return;

    try {
      await updateDoc(
        doc(db, "artifacts", appId, "users", effectiveUid, "bookmarks", groupId),
        { title: newName.trim(), updatedAt: Date.now() }
      );
      showToast(t.msgUpdated);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateCategory = async () => {
    const effectiveUid = sharedSpaceId || user?.uid;
    if (!editCatName.trim() || !editingCategory || !effectiveUid) return;
    if (
      sharedSpaceId &&
      shareConfig.permission === "view" &&
      user?.uid !== sharedSpaceId
    )
      return;

    const newName = editCatName.trim();
    const oldName = editingCategory.name;

    try {
      await updateDoc(
        doc(
          db,
          "artifacts",
          appId,
          "users",
          effectiveUid,
          "categories",
          editingCategory.id,
        ),
        { name: newName },
      );

      bookmarks
        .filter((b) => b.category === oldName)
        .forEach(async (b) => {
          await updateDoc(
            doc(db, "artifacts", appId, "users", effectiveUid, "bookmarks", b.id),
            { category: newName },
          );
        });

      if (selectedCategory === oldName) setSelectedCategory(newName);
      setEditingCategory(null);
      showToast(t.msgUpdated);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddCategory = async () => {
    const effectiveUid = sharedSpaceId || user?.uid;
    if (!newCatName.trim() || !effectiveUid) return;
    if (
      sharedSpaceId &&
      shareConfig.permission === "view" &&
      user?.uid !== sharedSpaceId
    )
      return;

    try {
      const data = { name: newCatName.trim(), createdAt: Date.now() };
      await addDoc(
        collection(db, "artifacts", appId, "users", effectiveUid, "categories"),
        data,
      );
      setNewCatName("");
      setIsAddingCategory(false);
      showToast(t.msgAdded);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteCategory = async (id: string, name: string) => {
    const effectiveUid = sharedSpaceId || user?.uid;
    if (!effectiveUid) return;
    if (
      sharedSpaceId &&
      shareConfig.permission === "view" &&
      user?.uid !== sharedSpaceId
    )
      return;
    try {
      await deleteDoc(
        doc(db, "artifacts", appId, "users", effectiveUid, "categories", id),
      );
      if (selectedCategory === name) setSelectedCategory("all");
      showToast(t.msgDeleted);
    } catch (err) {
      console.error(err);
    }
  };

  const confirmDeleteCategory = () => {
    if (!catToDelete) return;
    const cat = customCategories.find((c) => c.id === catToDelete);
    if (cat) handleDeleteCategory(cat.id, cat.name);
    setIsRemovingCategory(false);
    setCatToDelete("");
  };

  const updatePreference = async (updates: Partial<ShareConfig>) => {
    if (!user || user.isAnonymous) return;
    const newConfig = { ...shareConfig, ...updates };
    setShareConfig(newConfig);
    const configRef = doc(
      db,
      "artifacts",
      appId,
      "public",
      "data",
      "shareConfigs",
      user.uid,
    );
    await setDoc(configRef, newConfig);
  };

  const handleCopy = (text: string, id: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
      setCopiedId(id || "link");
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error(err);
    }
    document.body.removeChild(textArea);
    setActiveMenuId(null);
  };

  const canEdit =
    !sharedSpaceId ||
    shareConfig.permission === "edit" ||
    (user && user.uid === sharedSpaceId);

  return (
    <div
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="min-h-svh flex flex-col bg-[#fcfcfc] dark:bg-[#000000] text-neutral-900 dark:text-[#ededed] font-sans relative selection:bg-black/10 dark:selection:bg-white/20 transition-colors duration-300"
    >
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-200/50 dark:from-zinc-800/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] dark:opacity-[0.035]"></div>
      </div>

      <main className={`relative z-10 w-full flex-1 flex flex-col ${(!user || (user.isAnonymous && !sharedSpaceId)) ? "overflow-y-auto overflow-x-hidden items-center pb-20 scrollbar-hide !overflow-y-visible !overflow-x-hidden" : "overflow-hidden !overflow-y-visible !overflow-x-hidden"}`}>
        {!user || (user.isAnonymous && !sharedSpaceId) ? (
          <>
            <header className="fixed top-0 left-0 right-0 z-50 w-full px-6 py-3 flex justify-between items-center bg-white/70 dark:bg-black/70 backdrop-blur-xl border-b border-neutral-200/60 dark:border-white/8 transition-colors duration-300">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-neutral-900 dark:bg-white flex items-center justify-center">
                  <Boxes className="text-white dark:text-black w-3.5 h-3.5" />
                </div>
                <span className="font-bold text-lg tracking-[-0.04em] uppercase leading-none">
                  {t.logo}
                </span>
              </div>
              <nav className="hidden md:flex items-center gap-1">
                <a href="#features" className="text-[13px] font-medium px-3.5 py-2 rounded-lg text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/8 transition-all">{t.features || "Features"}</a>
                <a href="#how-it-works" className="text-[13px] font-medium px-3.5 py-2 rounded-lg text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/8 transition-all">{t.howItWorks || "How it works"}</a>
                <a href="#faq" className="text-[13px] font-medium px-3.5 py-2 rounded-lg text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/8 transition-all">{t.faqTitle || "FAQ"}</a>
              </nav>
              <div className="flex items-center gap-2">
                <button onClick={() => { setAuthMode("login"); setIsAuthModalOpen(true); }} className="text-[13px] font-medium px-4 py-2 rounded-lg text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-white/8 transition-all">{t.login}</button>
                <button onClick={() => { setAuthMode("register"); setIsAuthModalOpen(true); }} className="text-[13px] font-semibold bg-neutral-900 dark:bg-white text-white dark:text-black px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md hover:opacity-90 transition-all">{t.register}</button>
              </div>
            </header>
            <LandingPage
              t={t}
              lang={lang}
              setAuthMode={setAuthMode}
              setIsAuthModalOpen={setIsAuthModalOpen}
              faqs={faqs}
            />
          </>
        ) : (
          <Dashboard
            t={t}
            lang={lang}
            user={user}
            bookmarks={bookmarks}
            sharedSpaceId={sharedSpaceId}
            canEdit={canEdit}
            activeWidget={activeWidget}
            currentTime={currentTime}
            randomQuran={randomQuran}
            randomHadith={randomHadith}
            aiWisdom={aiWisdom}
            isAiLoading={isAiLoading}
            refreshWidgetContent={refreshWidgetContent}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            searchInputRef={searchInputRef}
            categoriesList={categoriesList}
            customCategories={customCategories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            editingCategory={editingCategory}
            setEditingCategory={setEditingCategory}
            editCatName={editCatName}
            setEditCatName={setEditCatName}
            handleUpdateCategory={handleUpdateCategory}
            isAddingCategory={isAddingCategory}
            setIsAddingCategory={setIsAddingCategory}
            newCatName={newCatName}
            setNewCatName={setNewCatName}
            handleAddCategory={handleAddCategory}
            isRemovingCategory={isRemovingCategory}
            setIsRemovingCategory={setIsRemovingCategory}
            catToDelete={catToDelete}
            setCatToDelete={setCatToDelete}
            confirmDeleteCategory={confirmDeleteCategory}
            handleDeleteCategory={handleDeleteCategory}
            viewMode={viewMode}
            setViewMode={setViewMode}
            filteredBookmarks={filteredBookmarks}
            activeMenuId={activeMenuId}
            setActiveMenuId={setActiveMenuId}
            handleCopy={handleCopy}
            copiedId={copiedId}
            setEditingItem={setEditingItem}
            showToast={showToast}
            setIsModalOpen={setIsModalOpen}
            handleDelete={handleDelete}
            handleToggleFavorite={handleToggleFavorite}
            handleCreateGroup={handleCreateGroup}
            handleUngroup={handleUngroup}
            handleRenameGroup={handleRenameGroup}
            handleLogout={handleLogout}
            setLang={setLang}
            themeMode={themeMode}
            setThemeMode={setThemeMode}
            updatePreference={updatePreference}
            callGemini={callGemini}
          />
        )}
      </main>

      {(!user || (user.isAnonymous && !sharedSpaceId)) && <Footer t={t} />}

      {isAuthModalOpen && (
        <AuthModal
          t={t}
          authMode={authMode}
          setAuthMode={setAuthMode}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          authError={authError}
          handleAuth={handleAuth}
          setIsAuthModalOpen={setIsAuthModalOpen}
        />
      )}

      {isShareModalOpen && (
        <ShareModal
          t={t}
          lang={lang}
          user={user}
          shareConfig={shareConfig}
          updatePreference={updatePreference}
          setIsShareModalOpen={setIsShareModalOpen}
          handleCopy={handleCopy}
          copiedId={copiedId}
        />
      )}

      {isModalOpen && (
        <SaveModal
          t={t}
          editingItem={editingItem}
          setIsModalOpen={setIsModalOpen}
          handleSave={handleSave}
          analyzeLink={analyzeLink}
          aiMetaLoading={aiMetaLoading}
          categoriesList={categoriesList}
          formRef={formRef}
        />
      )}

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[130] px-4 py-2 rounded-lg bg-white dark:bg-[#111111] border border-black/10 dark:border-white/[0.08] text-black dark:text-white flex items-center gap-2 shadow-xl animate-in slide-in-from-bottom-4 duration-300">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
          <span className="text-xs font-medium tracking-wide">{toast}</span>
        </div>
      )}

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .animate-in { animation-duration: 300ms; animation-fill-mode: forwards; }
        .fade-in { animation-name: fadeIn; }
        .zoom-in { animation-name: zoomIn; }
        .zoom-in-95 { animation-name: zoomIn95; }
        .slide-in-from-bottom-4 { animation-name: slideInBottom; }
        .slide-in-from-bottom-6 { animation-name: slideInBottom6; }
        .slide-in-from-bottom-8 { animation-name: slideInBottom8; }
        .slide-in-from-bottom-12 { animation-name: slideInBottom12; }
        .slide-in-from-left-2 { animation-name: slideInLeft; }
        .slide-in-from-top-4 { animation-name: slideInTop; }
        
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes zoomIn { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }
        @keyframes zoomIn95 { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        @keyframes slideInBottom { from { opacity: 0; transform: translateY(1rem); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideInBottom6 { from { opacity: 0; transform: translateY(2rem); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideInBottom8 { from { opacity: 0; transform: translateY(3rem); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideInBottom12 { from { opacity: 0; transform: translateY(6rem); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideInLeft { from { opacity: 0; transform: translateX(-0.5rem); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slideInTop { from { opacity: 0; transform: translateY(-1rem); } to { opacity: 1; transform: translateY(0); } }
        
        /* Custom Floating Animation for Tools */
        @keyframes float-tool {
          0% { transform: translate(0, 0) rotate(0deg) scale(0.8); opacity: 0; }
          20% { opacity: 0.05; }
          50% { transform: translate(-10px, -20px) rotate(15deg) scale(1); opacity: 0.02; }
          80% { opacity: 0.05; }
          100% { transform: translate(0, 0) rotate(30deg) scale(0.8); opacity: 0; }
        }
        .animate-float-tool {
          animation: float-tool 10s ease-in-out infinite;
        }

        /* Orbit Animations for Special Section */
        .animate-spin-slow { animation: spin linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        
      `,
        }}
      />
    </div>
  );
}
