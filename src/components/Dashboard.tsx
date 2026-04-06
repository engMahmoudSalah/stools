import React, { useState, useMemo } from "react";
import {
  Search,
  Plus,
  LayoutGrid,
  AlignJustify,
  Menu,
  Archive,
  MoreHorizontal,
  Check,
  Copy,
  Edit2,
  Trash2,
  Globe,
  PlusCircle,
  X,
  Sparkles,
  Tags,
  Folder,
  FolderOpen,
  Clock,
  Star,
  Link2Off,
  Wand2,
  Share2,
  Filter,
  CheckSquare,
  Square,
  ExternalLink,
  LogOut,
  Box,
  Layers,
  CreditCard,
  Boxes,
  Settings,
  Sun,
  Moon,
  Monitor,
  User,
  List,
  ChevronRightIcon,
  SquareMinus,
  Minus,
  Grid,
  Grip,
  LayoutDashboard,
  LayoutTemplate,
  RefreshCw,
  Zap,
  Eye,
  EyeOff,
} from "lucide-react";
import { Bookmark, Category } from "@/src/types";
import { getFavicon } from "@/src/lib/utils";
import { db } from "@/src/lib/firebase";
import { HeroWidget } from "@/src/components/widgets/HeroWidget";
import { format } from "date-fns";
import { motion, AnimatePresence } from "motion/react";

import { ImprovedBookmarkCard } from "@/src/components/ImprovedBookmarkCard";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarHeader,
  SidebarFooter,
  SidebarTrigger,
  SidebarInput,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { DynamicLightRays } from "./DynamicLightRays";
import { FloatingToolComp } from "@/src/components/ui/FloatingToolComp";
import { ChatGPTIcon, GeminiIcon, ReactIcon, NeonDBIcon } from "@/src/components/icons/Icons";

interface DashboardProps {
  t: any;
  lang: string;
  user: any;
  bookmarks: Bookmark[];
  sharedSpaceId: string | null;
  canEdit: boolean;
  activeWidget: string;
  currentTime: Date;
  randomQuran: any;
  randomHadith: any;
  aiWisdom: any;
  isAiLoading: boolean;
  refreshWidgetContent: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  searchInputRef: React.RefObject<HTMLInputElement>;
  categoriesList: Category[];
  customCategories: Category[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  editingCategory: Category | null;
  setEditingCategory: (cat: Category | null) => void;
  editCatName: string;
  setEditCatName: (name: string) => void;
  handleUpdateCategory: () => void;
  isAddingCategory: boolean;
  setIsAddingCategory: (isAdding: boolean) => void;
  newCatName: string;
  setNewCatName: (name: string) => void;
  handleAddCategory: () => void;
  isRemovingCategory: boolean;
  setIsRemovingCategory: (isRemoving: boolean) => void;
  catToDelete: string;
  setCatToDelete: (id: string) => void;
  confirmDeleteCategory: () => void;
  handleDeleteCategory: (id: string, name: string) => void;
  viewMode: string;
  setViewMode: (mode: string) => void;
  filteredBookmarks: Bookmark[];
  activeMenuId: string | null;
  setActiveMenuId: (id: string | null) => void;
  handleCopy: (text: string, id: string, e?: React.MouseEvent) => void;
  copiedId: string | null;
  setEditingItem: (item: Bookmark | null) => void;
  setIsModalOpen: (isOpen: boolean) => void;
  handleDelete: (id: string) => void;
  handleToggleFavorite: (id: string, currentFav: boolean) => void;
  handleCreateGroup: (name: string, itemIds: string[]) => void;
  handleUngroup: (groupId: string, itemIds: string[]) => void;
  handleRenameGroup: (groupId: string, newName: string) => void;
  handleLogout: () => void;
  setLang: (lang: string) => void;
  themeMode: string;
  setThemeMode: (mode: string) => void;
  updatePreference: (prefs: any) => void;
  showToast: (msg: string) => void;
  callGemini: (prompt: string) => Promise<string>;
  isLoading?: boolean;
}

export const Dashboard: React.FC<DashboardProps> = ({
  t,
  lang,
  user,
  bookmarks,
  sharedSpaceId,
  canEdit,
  activeWidget,
  currentTime,
  randomQuran,
  randomHadith,
  aiWisdom,
  isAiLoading,
  refreshWidgetContent,
  searchTerm,
  setSearchTerm,
  searchInputRef,
  categoriesList,
  customCategories,
  selectedCategory,
  setSelectedCategory,
  editingCategory,
  setEditingCategory,
  editCatName,
  setEditCatName,
  handleUpdateCategory,
  isAddingCategory,
  setIsAddingCategory,
  newCatName,
  setNewCatName,
  handleAddCategory,
  isRemovingCategory,
  setIsRemovingCategory,
  catToDelete,
  setCatToDelete,
  confirmDeleteCategory,
  handleDeleteCategory,
  viewMode,
  setViewMode,
  filteredBookmarks,
  activeMenuId,
  setActiveMenuId,
  handleCopy,
  copiedId,
  setEditingItem,
  setIsModalOpen,
  handleDelete,
  handleToggleFavorite,
  handleCreateGroup,
  handleUngroup,
  handleRenameGroup,
  handleLogout,
  setLang,
  themeMode,
  setThemeMode,
  updatePreference,
  showToast,
  callGemini,
  isLoading = false,
}) => {
  const [isMultiSelect, setIsMultiSelect] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [deadLinkIds, setDeadLinkIds] = useState<Set<string>>(new Set());
  const [suggestions, setSuggestions] = useState<string>("");
  const [isSuggestionsModalOpen, setIsSuggestionsModalOpen] = useState(false);

  const checkDeadLinks = async () => {
    showToast("Checking dead links...");
    const newDeadLinkIds = new Set<string>();
    for (const bookmark of bookmarks) {
      try {
        const response = await fetch('/api/check-url', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: bookmark.url }),
        });
        const data = await response.json();
        if (data.status !== 200) {
          newDeadLinkIds.add(bookmark.id);
        }
      } catch (e) {
        newDeadLinkIds.add(bookmark.id);
      }
    }
    setDeadLinkIds(newDeadLinkIds);
    if (newDeadLinkIds.size > 0) {
      showToast(`Found ${newDeadLinkIds.size} dead links.`);
    } else {
      showToast("No dead links found!");
    }
  };

  const getSmartSuggestions = async () => {
    showToast("Getting smart suggestions...");
    const prompt = `Analyze these bookmarks and suggest 3 new categories or tools to explore: ${bookmarks.map(b => b.title).join(', ')}`;
    try {
      const suggestionsResponse = await callGemini(prompt);
      setSuggestions(suggestionsResponse);
      setIsSuggestionsModalOpen(true);
    } catch (e) {
      showToast("Failed to get suggestions.");
    }
  };

  const [viewingDescriptionItem, setViewingDescriptionItem] = useState<Bookmark | null>(null);
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "a-z" | "z-a">("newest");
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [expandedGroupId, setExpandedGroupId] = useState<string | null>(null);
  const [isRenameGroupModalOpen, setIsRenameGroupModalOpen] = useState(false);
  const [groupToRename, setGroupToRename] = useState<Bookmark | null>(null);
  const [showFloatingTools, setShowFloatingTools] = useState(false);
  const [isSelectBookmarksModalOpen, setIsSelectBookmarksModalOpen] = useState(false);
  const [selectedBookmarksToFavorite, setSelectedBookmarksToFavorite] = useState<Set<string>>(new Set());

  React.useEffect(() => {
    if (expandedGroupId) {
      const groupExists = bookmarks.some(b => b.id === expandedGroupId);
      if (!groupExists) {
        setExpandedGroupId(null);
      }
    }
  }, [expandedGroupId, bookmarks]);

  const sortedBookmarks = useMemo(() => {
    return [...filteredBookmarks].sort((a, b) => {
      if (sortBy === "newest") return (b.createdAt || 0) - (a.createdAt || 0);
      if (sortBy === "oldest") return (a.createdAt || 0) - (b.createdAt || 0);
      if (sortBy === "a-z") return (a.title || "").localeCompare(b.title || "");
      if (sortBy === "z-a") return (b.title || "").localeCompare(a.title || "");
      return 0;
    });
  }, [filteredBookmarks, sortBy]);

  const displayBookmarks = useMemo(() => {
    if (expandedGroupId) {
      return bookmarks.filter(b => b.groupId === expandedGroupId).sort((a, b) => {
        if (sortBy === "newest") return (b.createdAt || 0) - (a.createdAt || 0);
        if (sortBy === "oldest") return (a.createdAt || 0) - (b.createdAt || 0);
        if (sortBy === "a-z") return (a.title || "").localeCompare(b.title || "");
        if (sortBy === "z-a") return (b.title || "").localeCompare(a.title || "");
        return 0;
      });
    }
    return sortedBookmarks;
  }, [expandedGroupId, bookmarks, sortedBookmarks, sortBy]);

  const toggleSelection = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSet = new Set(selectedItems);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedItems(newSet);
    if (newSet.size === 0) setIsMultiSelect(false);
  };

  const handleBulkDelete = () => {
    selectedItems.forEach((id) => handleDelete(id));
    setSelectedItems(new Set());
    setIsMultiSelect(false);
  };

  const getContainerClasses = () => {
    const base = "grid divide-x divide-y divide-border/50 -mx-px -my-px";
    switch (viewMode) {
      case "extra-large": return `${base} grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3`;
      case "large": return `${base} grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`;
      case "medium": return `${base} grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5`;
      case "small": return `${base} grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8`;
      case "tiles": return `${base} grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5`;
      case "content": return `${base} grid-cols-1 md:grid-cols-2 lg:grid-cols-3`;
      case "list": return "flex flex-col divide-y divide-border/50 -my-px";
      case "details": return "flex flex-col divide-y divide-border/50 -my-px";
      case "minimal": return `${base} grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6`;
      default: return `${base} grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`;
    }
  };

  return (
    <TooltipProvider>
      <SidebarProvider defaultOpen={true} className="flex-1 overflow-hidden !overflow-visible min-h-0 relative">
        <div className="flex w-full flex-1 h-full overflow-hidden !overflow-visible !h-auto bg-transparent text-foreground relative min-h-0 z-10">
          {/* SIDEBAR */}
          <Sidebar 
            side={lang === "ar" ? "right" : "left"} 
            variant="floating"
            collapsible="icon"
            className="border-none"
          >
            <SidebarHeader className="h-auto flex flex-col gap-4 p-3 border-b border-border/50">
              <div className="flex flex-col gap-4">
                <div 
                  className="flex items-center gap-2 overflow-hidden cursor-pointer group-data-[collapsible=icon]:justify-center"
                  onClick={() => setSelectedCategory("all")}
                >
                  <div className="w-6 h-6 shrink-0 rounded-lg bg-black dark:bg-white flex items-center justify-center shadow-lg">
                    <Boxes className="text-white dark:text-black w-3 h-3" />
                  </div>
                  <span className="font-bold text-lg tracking-tighter uppercase leading-none truncate group-data-[collapsible=icon]:hidden">
                    {t.logo}
                  </span>
                </div>
                <SidebarTrigger className="w-full flex justify-center" />
              </div>
            </SidebarHeader>
            <SidebarContent className="h-full overflow-y-auto scrollbar-hide">
              <SidebarGroup>
                <div className="flex items-center justify-between pe-2 sticky top-0 z-10 bg-muted/80 backdrop-blur-md py-2 group-data-[collapsible=icon]:hidden">
                  <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{t.library}</SidebarGroupLabel>
                </div>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        isActive={selectedCategory === "recent"}
                        onClick={() => setSelectedCategory("recent")}
                        className="group flex items-center justify-between transition-all cursor-pointer"
                      >
                        <div className="flex items-center gap-2 overflow-hidden">
                          <Clock className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
                          <span className="truncate group-data-[collapsible=icon]:hidden">{t.recent}</span>
                        </div>
                        <Badge variant="secondary" className="ms-auto text-[10px] h-5 px-1.5 group-data-[collapsible=icon]:hidden">{bookmarks.filter(b => b.createdAt && Date.now() - b.createdAt < 7 * 24 * 60 * 60 * 1000).length}</Badge>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        isActive={selectedCategory === "favorites"}
                        onClick={() => setSelectedCategory("favorites")}
                        className="group flex items-center justify-between transition-all cursor-pointer"
                      >
                        <div className="flex items-center gap-2 overflow-hidden">
                          <Star className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
                          <span className="truncate group-data-[collapsible=icon]:hidden">{t.favorites}</span>
                        </div>
                        <Badge variant="secondary" className="ms-auto text-[10px] h-5 px-1.5 group-data-[collapsible=icon]:hidden">{bookmarks.filter(b => b.isFavorite).length}</Badge>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              <SidebarGroup>
                <div className="flex items-center justify-between pe-2 sticky top-0 z-10 bg-muted/80 backdrop-blur-md py-2 group-data-[collapsible=icon]:hidden">
                  <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{t.collections}</SidebarGroupLabel>
                  {canEdit && (
                    <Tooltip>
                      <TooltipTrigger render={<Button variant="ghost" size="icon" className="h-5 w-5 rounded-full" onClick={() => setIsAddingCategory(true)} />}>
                        <Plus size={12} />
                      </TooltipTrigger>
                      <TooltipContent>{t.addCollection}</TooltipContent>
                    </Tooltip>
                  )}
                </div>
                
                {/* Collapsed State Dropdown */}
                <SidebarGroupContent className="hidden group-data-[collapsible=icon]:block">
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <DropdownMenu>
                        <DropdownMenuTrigger render={<SidebarMenuButton className="justify-center" />}>
                          <Folder className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side="right" align="start" className="w-48">
                          <DropdownMenuItem onClick={() => setSelectedCategory("all")}>
                            <Folder className="me-2 h-4 w-4" />
                            {t.allBookmarks || "All"}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {customCategories.map((cat) => (
                            <DropdownMenuItem key={cat.id} onClick={() => setSelectedCategory(cat.name)}>
                              <Folder className="me-2 h-4 w-4" />
                              {t[cat.name] || cat.name}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>

                {/* Expanded State List */}
                <SidebarGroupContent className="group-data-[collapsible=icon]:hidden">
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        isActive={selectedCategory === "all"}
                        onClick={() => setSelectedCategory("all")}
                        className="group flex items-center justify-between transition-all cursor-pointer"
                      >
                        <div className="flex items-center gap-2 overflow-hidden">
                          <Folder className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
                          <span className="truncate">{t.allBookmarks || "All"}</span>
                        </div>
                        <Badge variant="secondary" className="ms-auto text-[10px] h-5 px-1.5">{bookmarks.length}</Badge>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    
                    {isAddingCategory && (
                      <SidebarMenuItem>
                        <div className="flex items-center gap-2 px-3 py-1.5">
                          <Input
                            autoFocus
                            value={newCatName}
                            onChange={(e) => setNewCatName(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
                            placeholder={t.newCollection}
                            className="h-7 text-xs bg-background"
                          />
                          <Button size="icon" variant="ghost" className="h-7 w-7 text-green-500 hover:text-green-600 hover:bg-green-500/10" onClick={handleAddCategory}>
                            <Check size={14} />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-7 w-7 text-muted-foreground hover:text-foreground" onClick={() => setIsAddingCategory(false)}>
                            <X size={14} />
                          </Button>
                        </div>
                      </SidebarMenuItem>
                    )}
                    {customCategories.map((cat) => (
                      <SidebarMenuItem key={cat.id}>
                        {editingCategory?.id === cat.id ? (
                          <div className="flex items-center gap-2 px-3 py-1.5">
                            <Input
                              autoFocus
                              value={editCatName}
                              onChange={(e) => setEditCatName(e.target.value)}
                              onKeyDown={(e) => e.key === "Enter" && handleUpdateCategory()}
                              className="h-7 text-xs bg-background"
                            />
                            <Button size="icon" variant="ghost" className="h-7 w-7 text-green-500 hover:text-green-600 hover:bg-green-500/10" onClick={handleUpdateCategory}>
                              <Check size={14} />
                            </Button>
                            <Button size="icon" variant="ghost" className="h-7 w-7 text-muted-foreground hover:text-foreground" onClick={() => setEditingCategory(null)}>
                              <X size={14} />
                            </Button>
                          </div>
                        ) : (
                          <SidebarMenuButton
                            render={<div role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && setSelectedCategory(cat.name)} />}
                            isActive={selectedCategory === cat.name}
                            onClick={() => setSelectedCategory(cat.name)}
                            className="group flex items-center justify-between transition-all cursor-pointer"
                          >
                            <div className="flex items-center gap-2 overflow-hidden">
                              <Folder className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
                              <span className="truncate group-data-[collapsible=icon]:hidden">{t[cat.name] || cat.name}</span>
                            </div>
                            <div className="ms-auto flex items-center gap-1 group-data-[collapsible=icon]:hidden">
                              <Badge variant="secondary" className="text-[10px] h-5 px-1.5">{bookmarks.filter(b => b.category === cat.name).length}</Badge>
                              {!cat.isStatic && canEdit && (
                                <div onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity" />}>
                                      <MoreHorizontal size={14} />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-40" onClick={(e) => e.stopPropagation()}>
                                      <DropdownMenuItem onClick={(e) => { e.stopPropagation(); setEditingCategory(cat); setEditCatName(cat.name); }}>
                                        <Edit2 className="me-2 h-4 w-4" /> {t.editDetails}
                                      </DropdownMenuItem>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={(e) => { e.stopPropagation(); handleDeleteCategory(cat.id, cat.name); }}>
                                        <Trash2 className="me-2 h-4 w-4" /> {t.deleteBookmark}
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              )}
                            </div>
                          </SidebarMenuButton>
                        )}
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              <SidebarGroup>
                <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider group-data-[collapsible=icon]:hidden">{t.aiInsights}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        onClick={getSmartSuggestions}
                        className="text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-500/10 group flex items-center justify-between transition-all cursor-pointer">
                        <div className="flex items-center gap-2 overflow-hidden">
                          <Wand2 className="h-4 w-4 shrink-0" />
                          <span className="truncate group-data-[collapsible=icon]:hidden">{t.smartSuggestions}</span>
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        onClick={checkDeadLinks}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 group flex items-center justify-between transition-all cursor-pointer">
                        <div className="flex items-center gap-2 overflow-hidden">
                          <Link2Off className="h-4 w-4 shrink-0" />
                          <span className="truncate group-data-[collapsible=icon]:hidden">Dead Links (2)</span>
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="p-3 border-t border-border/50 flex flex-col gap-4">
              {canEdit && (
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      onClick={() => { setEditingItem(null); setIsModalOpen(true); }}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground justify-center group-data-[collapsible=icon]:!p-0"
                    >
                      <Plus className="h-4 w-4" />
                      <span className="group-data-[collapsible=icon]:hidden">{t.addBookmark}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              )}
              <SidebarMenu>
                <SidebarMenuItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger render={
                      <SidebarMenuButton className="group flex items-center justify-between transition-all cursor-pointer">
                        <div className="flex items-center gap-2 overflow-hidden">
                          <Settings className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
                          <span className="truncate group-data-[collapsible=icon]:hidden">{t.settings || "Settings"}</span>
                        </div>
                      </SidebarMenuButton>
                    } />
                    <DropdownMenuContent align="start" className="w-56" side="right">
                      <DropdownMenuItem onClick={() => setLang(lang === "ar" ? "en" : "ar")}>
                        {lang === "ar" ? "English" : "العربية"}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">{t.theme}</div>
                      <div className="flex items-center gap-1 px-2 pb-2">
                        <Button variant={themeMode === "light" ? "secondary" : "ghost"} size="icon" className="h-7 w-7 rounded-full" onClick={() => setThemeMode("light")}><Sun className="h-3 w-3" /></Button>
                        <Button variant={themeMode === "system" ? "secondary" : "ghost"} size="icon" className="h-7 w-7 rounded-full" onClick={() => setThemeMode("system")}><Monitor className="h-3 w-3" /></Button>
                        <Button variant={themeMode === "dark" ? "secondary" : "ghost"} size="icon" className="h-7 w-7 rounded-full" onClick={() => setThemeMode("dark")}><Moon className="h-3 w-3" /></Button>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <div className="flex items-center justify-between gap-2 mt-2 group-data-[collapsible=icon]:justify-center">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <Avatar className="h-8 w-8 shrink-0">
                        <AvatarImage src={user?.photoURL} />
                        <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                          {user?.email?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col overflow-hidden group-data-[collapsible=icon]:hidden">
                        <span className="text-sm font-medium truncate">{user?.displayName || "User"}</span>
                        <span className="text-xs text-muted-foreground truncate">{user?.email}</span>
                      </div>
                    </div>
                    {!sharedSpaceId && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleLogout}
                        className="shrink-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10 group-data-[collapsible=icon]:hidden"
                        title={t.logout}
                      >
                        <LogOut size={16} />
                      </Button>
                    )}
                  </div>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </Sidebar>

          {/* MAIN CONTENT */}
          <main className="flex-1 flex flex-col min-w-0 bg-transparent min-h-0 !overflow-visible !h-auto relative">
            <DynamicLightRays lang={lang} />
            {/* TOP BAR */}
            <header className="sticky top-0 z-10 flex h-16 items-center gap-2 md:gap-4 border-b border-border/50 bg-background/80 backdrop-blur-md px-4 md:px-6">
              
              <div className="md:hidden flex items-center">
                <SidebarTrigger />
              </div>

              <div className="flex-1 flex items-center gap-4 max-w-2xl">
                <div className="relative w-full group">
                  <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    ref={searchInputRef}
                    type="text"
                    placeholder={t.searchPlaceholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full ps-9 pe-12 bg-white dark:bg-zinc-900 border-border/50 focus-visible:bg-background focus-visible:ring-1 focus-visible:ring-primary transition-all rounded-full h-10 text-ellipsis shadow-sm"
                  />
                  <div className="absolute end-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    <kbd className="inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                      <span className="text-xs">⌘</span>K
                    </kbd>
                  </div>
                </div>
              </div>

              <div className="ms-auto flex items-center gap-2">
                <DropdownMenu>
                  <Tooltip>
                    <TooltipTrigger render={<div className="inline-block" />}>
                      <DropdownMenuTrigger render={<Button variant="outline" size="icon" className="h-10 w-10 rounded-full" />}>
                        <Filter className="h-4 w-4" />
                      </DropdownMenuTrigger>
                    </TooltipTrigger>
                    <TooltipContent>{t.sortBookmarks}</TooltipContent>
                  </Tooltip>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setSortBy("newest")} className={sortBy === "newest" ? "bg-muted" : ""}>
                      {t.newestFirst}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("oldest")} className={sortBy === "oldest" ? "bg-muted" : ""}>
                      {t.oldestFirst}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("a-z")} className={sortBy === "a-z" ? "bg-muted" : ""}>
                      {t.aToZ}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("z-a")} className={sortBy === "z-a" ? "bg-muted" : ""}>
                      {t.zToA}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                  <DropdownMenuTrigger render={<Button variant="outline" size="icon" className="h-10 w-10 rounded-full bg-background border-border/50 hover:bg-muted/50" />}>
                      {viewMode === "extra-large" && <Square className="h-4 w-4" />}
                      {viewMode === "large" && <Square className="h-4 w-4" />}
                      {viewMode === "medium" && <Square className="h-4 w-4" />}
                      {viewMode === "small" && <Square className="h-4 w-4" />}
                      {viewMode === "list" && <Menu className="h-4 w-4" />}
                      {viewMode === "details" && <AlignJustify className="h-4 w-4" />}
                      {viewMode === "tiles" && <LayoutGrid className="h-4 w-4" />}
                      {viewMode === "content" && <SquareMinus className="h-4 w-4" />}
                      {viewMode === "minimal" && <Minus className="h-4 w-4" />}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem onClick={() => setViewMode("extra-large")} className="flex items-center gap-2 cursor-pointer">
                      <div className="w-4 flex justify-center">{viewMode === "extra-large" && <div className="w-2 h-2 rounded-full bg-primary" />}</div>
                      <Square className="h-4 w-4" />
                      <span>Extra large icons</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setViewMode("large")} className="flex items-center gap-2 cursor-pointer">
                      <div className="w-4 flex justify-center">{viewMode === "large" && <div className="w-2 h-2 rounded-full bg-primary" />}</div>
                      <Square className="h-4 w-4" />
                      <span>Large icons</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setViewMode("medium")} className="flex items-center gap-2 cursor-pointer">
                      <div className="w-4 flex justify-center">{viewMode === "medium" && <div className="w-2 h-2 rounded-full bg-primary" />}</div>
                      <Square className="h-4 w-4" />
                      <span>Medium icons</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setViewMode("small")} className="flex items-center gap-2 cursor-pointer">
                      <div className="w-4 flex justify-center">{viewMode === "small" && <div className="w-2 h-2 rounded-full bg-primary" />}</div>
                      <Square className="h-4 w-4" />
                      <span>Small icons</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setViewMode("list")} className="flex items-center gap-2 cursor-pointer">
                      <div className="w-4 flex justify-center">{viewMode === "list" && <div className="w-2 h-2 rounded-full bg-primary" />}</div>
                      <Menu className="h-4 w-4" />
                      <span>List</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setViewMode("details")} className="flex items-center gap-2 cursor-pointer">
                      <div className="w-4 flex justify-center">{viewMode === "details" && <div className="w-2 h-2 rounded-full bg-primary" />}</div>
                      <AlignJustify className="h-4 w-4" />
                      <span>Details</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setViewMode("tiles")} className="flex items-center gap-2 cursor-pointer">
                      <div className="w-4 flex justify-center">{viewMode === "tiles" && <div className="w-2 h-2 rounded-full bg-primary" />}</div>
                      <LayoutGrid className="h-4 w-4" />
                      <span>Tiles</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setViewMode("content")} className="flex items-center gap-2 cursor-pointer">
                      <div className="w-4 flex justify-center">{viewMode === "content" && <div className="w-2 h-2 rounded-full bg-primary" />}</div>
                      <SquareMinus className="h-4 w-4" />
                      <span>Content</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setViewMode("minimal")} className="flex items-center gap-2 cursor-pointer">
                      <div className="w-4 flex justify-center">{viewMode === "minimal" && <div className="w-2 h-2 rounded-full bg-primary" />}</div>
                      <Minus className="h-4 w-4" />
                      <span>Minimal</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </header>

            {/* CONTENT AREA */}
            <ScrollArea className="flex-1 !h-auto !overflow-visible [&>[data-slot=scroll-area-viewport]]:!h-auto [&>[data-slot=scroll-area-viewport]]:!overflow-visible">
              <div className="px-6 py-6 max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    {expandedGroupId && (
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setExpandedGroupId(null)}>
                        <ChevronRightIcon className="h-4 w-4 rotate-180" />
                      </Button>
                    )}
                    <div>
                      <h1 className="text-2xl font-bold tracking-tight">
                        {expandedGroupId 
                          ? bookmarks.find(b => b.id === expandedGroupId)?.title 
                          : (t[selectedCategory] || selectedCategory)}
                      </h1>
                      <p className="text-sm text-muted-foreground mt-1">
                        {displayBookmarks.length} {displayBookmarks.length === 1 ? 'bookmark' : 'bookmarks'}
                      </p>
                    </div>
                  </div>
                  
                  {isMultiSelect && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 bg-primary/10 text-primary px-4 py-2 rounded-full border border-primary/20"
                    >
                      <span className="text-sm font-medium">{selectedItems.size} {t.selected}</span>
                      <Separator orientation="vertical" className="h-4 bg-primary/20" />
                      <Button variant="ghost" size="sm" className="h-7 px-2 text-primary hover:text-primary hover:bg-primary/20" onClick={() => setIsGroupModalOpen(true)}>
                        <Folder className="h-3.5 w-3.5 me-1.5" /> {lang === "ar" ? "إنشاء مجموعة" : "Create Group"}
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 px-2 text-primary hover:text-primary hover:bg-primary/20" onClick={() => {}}>
                        <Tags className="h-3.5 w-3.5 me-1.5" /> {t.tag}
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 px-2 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={handleBulkDelete}>
                        <Trash2 className="h-3.5 w-3.5 me-1.5" /> {t.delete}
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-primary hover:text-primary hover:bg-primary/20" onClick={() => { setIsMultiSelect(false); setSelectedItems(new Set()); }}>
                        <X className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  )}
                </div>

                {filteredBookmarks?.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-24 text-center">
                    <div className="h-20 w-20 rounded-full bg-muted/50 flex items-center justify-center mb-6">
                      <Archive className="h-10 w-10 text-muted-foreground/50" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      {selectedCategory === "favorites" ? t.favoritesEmpty || "Favorites is Empty" : t.noBookmarksFound}
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-6">
                      {selectedCategory === "favorites" 
                        ? t.noFavoritesAddBookmarks || "Add bookmarks to your favorites to see them here"
                        : (searchTerm ? t.noSearchMatch : t.noBookmarksInCollection)
                      }
                    </p>
                    {canEdit && (
                      <Button 
                        onClick={() => {
                          if (selectedCategory === "favorites") {
                            setIsSelectBookmarksModalOpen(true);
                          } else {
                            setEditingItem(null);
                            setIsModalOpen(true);
                          }
                        }} 
                        className="rounded-full px-6"
                      >
                        <Plus className="me-2 h-4 w-4" /> {t.addYourFirstBookmark}
                      </Button>
                    )}
                  </div>
                ) : (
                  <motion.div 
                    layout
                    className={`${getContainerClasses()} overflow-hidden`}
                  >
                    {isLoading ? (
                      // Loading skeletons
                      Array.from({ length: 6 }).map((_, index) => {
                        return (
                          <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2, delay: index * 0.1 }}
                            key={`skeleton-${index}`}
                          >
                            <Card className="flex flex-col p-6 h-[240px] bg-gradient-to-b from-background to-muted/10">
                              <div className="flex flex-col items-center text-center gap-4 h-full">
                                <Skeleton className="h-24 w-24 rounded-2xl" />
                                <div className="flex-1 flex flex-col justify-between w-full mt-2 space-y-3">
                                  <Skeleton className="h-6 w-3/4 mx-auto" />
                                  <Skeleton className="h-5 w-1/2 mx-auto" />
                                </div>
                              </div>
                            </Card>
                          </motion.div>
                        );
                      })
                    ) : (
                      <AnimatePresence>
                        {displayBookmarks.map((bookmark) => {
                        const isSelected = selectedItems.has(bookmark.id);
                        
                        // Action Menu Component to reuse
                        const actionsMenuNode = canEdit ? (
                          <div onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
                            <DropdownMenu>
                              <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-muted" />}>
                                <MoreHorizontal className="h-4 w-4" />
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48" onClick={(e) => e.stopPropagation()}>
                                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); window.open(bookmark.url, "_blank"); }}>
                                  <ExternalLink className="me-2 h-4 w-4" /> {t.openInNewTab}
                                </DropdownMenuItem>
                              <DropdownMenuItem onClick={(e) => { e.stopPropagation(); setIsMultiSelect(true); toggleSelection(bookmark.id, e); }}>
                                <CheckSquare className="me-2 h-4 w-4" /> {t.select}
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleCopy(bookmark.url, bookmark.id, e); }}>
                                <Copy className="me-2 h-4 w-4" /> {t.copyUrl}
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={(e) => { e.stopPropagation(); setViewingDescriptionItem(bookmark); }}>
                                <AlignJustify className="me-2 h-4 w-4" /> {t.showDescription}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={(e) => {
                                e.stopPropagation();
                                handleToggleFavorite(bookmark.id, !!bookmark.isFavorite);
                              }}>
                                <Star className={`me-2 h-4 w-4 ${bookmark.isFavorite ? 'fill-yellow-400 text-yellow-400' : ''}`} /> 
                                {bookmark.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={(e) => { e.stopPropagation(); setEditingItem(bookmark); setIsModalOpen(true); }}>
                                <Edit2 className="me-2 h-4 w-4" /> {t.editDetails}
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={(e) => { e.stopPropagation(); handleDelete(bookmark.id); }}>
                                <Trash2 className="me-2 h-4 w-4" /> {t.deleteBookmark}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                          </div>
                        ) : null;

                        // Group Card Rendering
                        if (bookmark.isGroup) {
                          const groupItems = bookmark.items || [];
                          const groupBookmarks = bookmarks.filter(b => groupItems.includes(b.id));
                          
                          return (
                            <motion.div layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2 }} key={bookmark.id}>
                              <Card 
                                className={`group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer ${isSelected ? 'ring-1 ring-primary' : ''} flex flex-col p-4 h-[160px] bg-primary/5`}
                                onClick={(e) => {
                                  if (isMultiSelect) toggleSelection(bookmark.id, e);
                                  else setExpandedGroupId(bookmark.id);
                                }}
                              >
                                <div className="flex flex-col items-center text-center gap-3 h-full">
                                  {isMultiSelect && (
                                    <div className="absolute top-3 left-3 z-10" onClick={(e) => { e.stopPropagation(); toggleSelection(bookmark.id, e); }}>
                                      <div className={`h-5 w-5 rounded border flex items-center justify-center ${isSelected ? 'bg-primary border-primary text-primary-foreground' : 'bg-background border-muted-foreground/30 text-transparent hover:border-primary'}`}>
                                        <Check className="h-3.5 w-3.5" />
                                      </div>
                                    </div>
                                  )}
                                  <div className="h-12 w-12 shrink-0 rounded-xl bg-primary/20 text-primary shadow-sm border border-primary/30 flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-300">
                                    <Folder className="h-6 w-6" />
                                  </div>
                                  <div className="flex-1 flex flex-col justify-between w-full mt-1">
                                    <h3 className="font-semibold text-sm leading-tight line-clamp-1 group-hover:text-primary transition-colors">
                                      {bookmark.title.length > 11 ? bookmark.title.substring(0, 11) + '...' : bookmark.title}
                                    </h3>
                                    <div className="mt-2 flex justify-center items-center gap-2">
                                      <Badge variant="secondary" className="text-[10px] px-2 py-0.5 h-5 font-medium bg-primary/10 text-primary border-primary/20">
                                        {groupBookmarks.length} {lang === "ar" ? "عناصر" : "items"}
                                      </Badge>
                                    </div>
                                    {/* Mini favicons */}
                                    <div className="flex justify-center -space-x-2 mt-2">
                                      {groupBookmarks.slice(0, 4).map((gb, i) => (
                                        <div key={gb.id} className="w-6 h-6 rounded-full bg-background border border-border flex items-center justify-center overflow-hidden z-[4-i]">
                                          {getFavicon(gb.url) ? (
                                            <img src={getFavicon(gb.url)!} alt="" className="w-3 h-3 object-contain" referrerPolicy="no-referrer" />
                                          ) : (
                                            <Globe className="h-3 w-3 text-muted-foreground" />
                                          )}
                                        </div>
                                      ))}
                                      {groupBookmarks.length > 4 && (
                                        <div className="w-6 h-6 rounded-full bg-muted border border-border flex items-center justify-center z-0 text-[8px] font-bold">
                                          +{groupBookmarks.length - 4}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className={`absolute end-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity z-20`}>
                                  <div onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
                                    <DropdownMenu>
                                      <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-muted" />}>
                                        <MoreHorizontal className="h-4 w-4" />
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end" className="w-48" onClick={(e) => e.stopPropagation()}>
                                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleUngroup(bookmark.id, groupItems); }}>
                                          <FolderOpen className="me-2 h-4 w-4" /> {lang === "ar" ? "فك المجموعة" : "Ungroup"}
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={(e) => { 
                                          e.stopPropagation(); 
                                          setGroupToRename(bookmark);
                                          setNewGroupName(bookmark.title || "");
                                          setIsRenameGroupModalOpen(true);
                                        }}>
                                          <Edit2 className="me-2 h-4 w-4" /> {lang === "ar" ? "إعادة تسمية" : "Rename"}
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={(e) => { e.stopPropagation(); handleDelete(bookmark.id); }}>
                                          <Trash2 className="me-2 h-4 w-4" /> {t.deleteBookmark}
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </div>
                                </div>
                              </Card>
                            </motion.div>
                          );
                        }

                        // 1. Extra Large Icons
                        if (viewMode === "extra-large") {
                          return (
                            <motion.div layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2 }} key={bookmark.id}>
                              <Card 
                                className={`group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer ${isSelected ? 'ring-1 ring-primary' : 'hover:border-primary/50'} flex flex-col p-6 h-[240px] bg-gradient-to-b from-background to-muted/10`}
                                onClick={(e) => {
                                  if (isMultiSelect) toggleSelection(bookmark.id, e);
                                  else window.open(bookmark.url, "_blank");
                                }}
                              >
                                {deadLinkIds.has(bookmark.id) && (
                                  <Badge variant="destructive" className="absolute top-4 right-4 text-[10px] uppercase tracking-wider px-2 py-0.5 h-6 font-normal">
                                    Dead
                                  </Badge>
                                )}
                                <div className="flex flex-col items-center text-center gap-4 h-full">
                                  {isMultiSelect && (
                                    <div className="absolute top-4 left-4 z-10" onClick={(e) => { e.stopPropagation(); toggleSelection(bookmark.id, e); }}>
                                      <div className={`h-6 w-6 rounded border flex items-center justify-center ${isSelected ? 'bg-primary border-primary text-primary-foreground' : 'bg-background border-muted-foreground/30 text-transparent hover:border-primary'}`}>
                                        <Check className="h-4 w-4" />
                                      </div>
                                    </div>
                                  )}
                                  <div className="h-24 w-24 shrink-0 rounded-2xl bg-background shadow-sm border border-border/50 flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-300 relative">
                                    {getFavicon(bookmark.url) ? (
                                      <img src={getFavicon(bookmark.url)!} alt="" className="w-12 h-12 object-contain" referrerPolicy="no-referrer" />
                                    ) : (
                                      <Globe className="h-12 w-12 text-muted-foreground" />
                                    )}
                                    {bookmark.isFavorite && (
                                      <div className="absolute -top-1 -right-1">
                                        <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex-1 flex flex-col justify-between w-full mt-2">
                                    <h3 className="font-semibold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                                      {bookmark.title.length > 11 ? bookmark.title.substring(0, 11) + '...' : bookmark.title}
                                    </h3>
                                    <div className="mt-3 flex justify-center">
                                      <Badge variant="secondary" className="text-xs px-3 py-1 h-6 font-medium bg-muted text-muted-foreground">
                                        {bookmark.category}
                                      </Badge>
                                    </div>
                                  </div>
                                </div>
                                <div className={`absolute end-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity z-20`}>
                                  {actionsMenuNode}
                                </div>
                              </Card>
                            </motion.div>
                          );
                        }

                        // 2. Large Icons (Current Grid)
                        if (viewMode === "large" || viewMode === "grid") {
                          return (
                            <motion.div layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2 }} key={bookmark.id}>
                              <Card 
                                className={`group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer ${isSelected ? 'ring-1 ring-primary' : ''} flex flex-col p-4 h-[160px] bg-gradient-to-b from-background to-muted/10`}
                                onClick={(e) => {
                                  if (isMultiSelect) toggleSelection(bookmark.id, e);
                                  else window.open(bookmark.url, "_blank");
                                }}
                              >
                                {deadLinkIds.has(bookmark.id) && (
                                  <Badge variant="destructive" className="absolute top-2 right-2 text-[8px] uppercase tracking-wider px-1.5 py-0.5 h-5 font-normal">
                                    Dead
                                  </Badge>
                                )}
                                <div className="flex flex-col items-center text-center gap-3 h-full">
                                  {isMultiSelect && (
                                    <div className="absolute top-3 left-3 z-10" onClick={(e) => { e.stopPropagation(); toggleSelection(bookmark.id, e); }}>
                                      <div className={`h-5 w-5 rounded border flex items-center justify-center ${isSelected ? 'bg-primary border-primary text-primary-foreground' : 'bg-background border-muted-foreground/30 text-transparent hover:border-primary'}`}>
                                        <Check className="h-3.5 w-3.5" />
                                      </div>
                                    </div>
                                  )}
                                  <div className="h-12 w-12 shrink-0 rounded-xl bg-background shadow-sm border border-border/50 flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-300 relative">
                                    {getFavicon(bookmark.url) ? (
                                      <img src={getFavicon(bookmark.url)!} alt="" className="w-6 h-6 object-contain" referrerPolicy="no-referrer" />
                                    ) : (
                                      <Globe className="h-6 w-6 text-muted-foreground" />
                                    )}
                                    {bookmark.isFavorite && (
                                      <div className="absolute -top-1 -right-1">
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex-1 flex flex-col justify-between w-full mt-1">
                                    <h3 className="font-semibold text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                                      {bookmark.title.length > 11 ? bookmark.title.substring(0, 11) + '...' : bookmark.title}
                                    </h3>
                                    <div className="mt-2 flex justify-center">
                                      <Badge variant="secondary" className="text-[10px] px-2 py-0.5 h-5 font-medium bg-muted text-muted-foreground">
                                        {bookmark.category}
                                      </Badge>
                                    </div>
                                  </div>
                                </div>
                                <div className={`absolute end-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity z-20`}>
                                  {actionsMenuNode}
                                </div>
                              </Card>
                            </motion.div>
                          );
                        }

                        // 3. Medium Icons
                        if (viewMode === "medium") {
                          return (
                            <motion.div layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2 }} key={bookmark.id}>
                              <Card 
                                className={`group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer ${isSelected ? 'ring-1 ring-primary' : ''} flex flex-col p-3 h-[130px] bg-gradient-to-b from-background to-muted/10`}
                                onClick={(e) => {
                                  if (isMultiSelect) toggleSelection(bookmark.id, e);
                                  else window.open(bookmark.url, "_blank");
                                }}
                              >
                                {deadLinkIds.has(bookmark.id) && (
                                  <Badge variant="destructive" className="absolute top-1 right-1 text-[7px] uppercase tracking-wider px-1 py-0.5 h-4 font-normal">
                                    Dead
                                  </Badge>
                                )}
                                <div className="flex flex-col items-center justify-center text-center gap-2 h-full">
                                  {isMultiSelect && (
                                    <div className="absolute top-2 left-2 z-10" onClick={(e) => { e.stopPropagation(); toggleSelection(bookmark.id, e); }}>
                                      <div className={`h-4 w-4 rounded border flex items-center justify-center ${isSelected ? 'bg-primary border-primary text-primary-foreground' : 'bg-background border-muted-foreground/30 text-transparent hover:border-primary'}`}>
                                        <Check className="h-3 w-3" />
                                      </div>
                                    </div>
                                  )}
                                  <div className="h-12 w-12 shrink-0 rounded-lg bg-background shadow-sm border border-border/50 flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-300 relative">
                                    {getFavicon(bookmark.url) ? (
                                      <img src={getFavicon(bookmark.url)!} alt="" className="w-6 h-6 object-contain" referrerPolicy="no-referrer" />
                                    ) : (
                                      <Globe className="h-6 w-6 text-muted-foreground" />
                                    )}
                                    {bookmark.isFavorite && (
                                      <div className="absolute -top-1 -right-1">
                                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex-1 flex flex-col justify-between w-full mt-1">
                                    <h3 className="font-medium text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                                      {bookmark.title.length > 11 ? bookmark.title.substring(0, 11) + '...' : bookmark.title}
                                    </h3>
                                  </div>
                                </div>
                                <div className={`absolute end-1 top-1 opacity-0 group-hover:opacity-100 transition-opacity z-20`}>
                                  {actionsMenuNode}
                                </div>
                              </Card>
                            </motion.div>
                          );
                        }

                        // 4. Small Icons
                        if (viewMode === "small") {
                          return (
                            <motion.div layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2 }} key={bookmark.id}>
                              <Card 
                                className={`group relative overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 cursor-pointer ${isSelected ? 'ring-1 ring-primary' : ''} flex flex-col p-2 h-[90px] bg-gradient-to-b from-background to-muted/10`}
                                onClick={(e) => {
                                  if (isMultiSelect) toggleSelection(bookmark.id, e);
                                  else window.open(bookmark.url, "_blank");
                                }}
                              >
                                {deadLinkIds.has(bookmark.id) && (
                                  <Badge variant="destructive" className="absolute top-0.5 right-0.5 text-[6px] uppercase tracking-wider px-0.5 py-0 h-3 font-normal">
                                    Dead
                                  </Badge>
                                )}
                                <div className="flex flex-col items-center text-center gap-1 h-full">
                                  {isMultiSelect && (
                                    <div className="absolute top-1 left-1 z-10" onClick={(e) => { e.stopPropagation(); toggleSelection(bookmark.id, e); }}>
                                      <div className={`h-3 w-3 rounded border flex items-center justify-center ${isSelected ? 'bg-primary border-primary text-primary-foreground' : 'bg-background border-muted-foreground/30 text-transparent hover:border-primary'}`}>
                                        <Check className="h-2 w-2" />
                                      </div>
                                    </div>
                                  )}
                                  <div className="h-10 w-10 shrink-0 rounded-lg bg-background shadow-sm border border-border/50 flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-300 relative">
                                    {getFavicon(bookmark.url) ? (
                                      <img src={getFavicon(bookmark.url)!} alt="" className="w-5 h-5 object-contain" referrerPolicy="no-referrer" />
                                    ) : (
                                      <Globe className="h-5 w-5 text-muted-foreground" />
                                    )}
                                    {bookmark.isFavorite && (
                                      <div className="absolute -top-1 -right-1">
                                        <Star className="h-2 w-2 fill-yellow-400 text-yellow-400" />
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex-1 flex flex-col justify-between w-full mt-0.5">
                                    <h3 className="font-medium text-xs leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                                      {bookmark.title.length > 11 ? bookmark.title.substring(0, 11) + '...' : bookmark.title}
                                    </h3>
                                  </div>
                                </div>
                                <div className={`absolute end-1 top-1 opacity-0 group-hover:opacity-100 transition-opacity z-20`}>
                                  {actionsMenuNode}
                                </div>
                              </Card>
                            </motion.div>
                          );
                        }

                        // 5. List (Current Compact)
                        if (viewMode === "list" || viewMode === "compact") {
                          return (
                            <motion.div layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2 }} key={bookmark.id}>
                              <Card 
                                className={`group relative overflow-hidden transition-all duration-200 hover:shadow-md cursor-pointer ${isSelected ? 'ring-1 ring-primary' : ''} flex items-center p-3 h-[60px] bg-background hover:bg-muted/30`}
                                onClick={(e) => {
                                  if (isMultiSelect) toggleSelection(bookmark.id, e);
                                  else window.open(bookmark.url, "_blank");
                                }}
                              >
                                {deadLinkIds.has(bookmark.id) && (
                                  <Badge variant="destructive" className="absolute top-1 right-1 text-[6px] uppercase tracking-wider px-0.5 py-0 h-3 font-normal">
                                    Dead
                                  </Badge>
                                )}
                                <div className="flex items-center gap-3 w-full">
                                  {isMultiSelect && (
                                    <div className="shrink-0" onClick={(e) => { e.stopPropagation(); toggleSelection(bookmark.id, e); }}>
                                      <div className={`h-5 w-5 rounded border flex items-center justify-center ${isSelected ? 'bg-primary border-primary text-primary-foreground' : 'bg-background border-muted-foreground/30 text-transparent hover:border-primary'}`}>
                                        <Check className="h-3.5 w-3.5" />
                                      </div>
                                    </div>
                                  )}
                                  <div className="h-8 w-8 shrink-0 rounded bg-muted/50 border border-border/50 flex items-center justify-center overflow-hidden relative">
                                    {getFavicon(bookmark.url) ? (
                                      <img src={getFavicon(bookmark.url)!} alt="" className="w-4 h-4 object-contain" referrerPolicy="no-referrer" />
                                    ) : (
                                      <Globe className="h-4 w-4 text-muted-foreground" />
                                    )}
                                    {bookmark.isFavorite && (
                                      <div className="absolute -top-1 -right-1">
                                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex-1 min-w-0 flex items-center gap-3">
                                    <h3 className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                                      {bookmark.title.length > 11 ? bookmark.title.substring(0, 11) + '...' : bookmark.title}
                                    </h3>
                                    <span className="text-xs text-muted-foreground truncate opacity-70 block max-w-[200px]">
                                      {bookmark.url.replace(/^https?:\/\/(www\.)?/, '')}
                                    </span>
                                  </div>
                                  <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                    {actionsMenuNode}
                                  </div>
                                </div>
                              </Card>
                            </motion.div>
                          );
                        }

                        // 6. Details (Current Detailed List)
                        if (viewMode === "details") {
                          return (
                            <motion.div layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2 }} key={bookmark.id}>
                              <Card 
                                className={`group relative overflow-hidden transition-all duration-200 hover:shadow-md cursor-pointer ${isSelected ? 'ring-1 ring-primary' : ''} flex flex-col p-4 h-[120px] bg-background hover:bg-muted/20`}
                                onClick={(e) => {
                                  if (isMultiSelect) toggleSelection(bookmark.id, e);
                                  else window.open(bookmark.url, "_blank");
                                }}
                              >
                                {deadLinkIds.has(bookmark.id) && (
                                  <Badge variant="destructive" className="absolute top-2 right-2 text-[7px] uppercase tracking-wider px-1 py-0.5 h-4 font-normal">
                                    Dead
                                  </Badge>
                                )}
                                <div className="flex items-start gap-4 h-full">
                                  {isMultiSelect && (
                                    <div className="shrink-0 mt-1" onClick={(e) => { e.stopPropagation(); toggleSelection(bookmark.id, e); }}>
                                      <div className={`h-5 w-5 rounded border flex items-center justify-center ${isSelected ? 'bg-primary border-primary text-primary-foreground' : 'bg-background border-muted-foreground/30 text-transparent hover:border-primary'}`}>
                                        <Check className="h-3.5 w-3.5" />
                                      </div>
                                    </div>
                                  )}
                                  <div className="h-10 w-10 shrink-0 rounded-lg bg-muted/50 border border-border/50 flex items-center justify-center overflow-hidden mt-1 relative">
                                    {getFavicon(bookmark.url) ? (
                                      <img src={getFavicon(bookmark.url)!} alt="" className="w-5 h-5 object-contain" referrerPolicy="no-referrer" />
                                    ) : (
                                      <Globe className="h-5 w-5 text-muted-foreground" />
                                    )}
                                    {bookmark.isFavorite && (
                                      <div className="absolute -top-1 -right-1">
                                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex-1 min-w-0 flex flex-col h-full">
                                    <div className="flex items-start justify-between gap-4">
                                      <h3 className="font-semibold text-base truncate group-hover:text-primary transition-colors">
                                        {bookmark.title.length > 11 ? bookmark.title.substring(0, 11) + '...' : bookmark.title}
                                      </h3>
                                      <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity -mt-1 -mr-1">
                                        {actionsMenuNode}
                                      </div>
                                    </div>
                                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1 flex-1">
                                      {bookmark.description || bookmark.url}
                                    </p>
                                    <div className="mt-auto pt-2 flex items-center gap-2">
                                      <Badge variant="outline" className="text-[10px] px-2 py-0 h-4 font-medium">
                                        {bookmark.category}
                                      </Badge>
                                      <span className="text-[10px] text-muted-foreground">
                                        {bookmark.createdAt ? format(bookmark.createdAt, 'MMM d, yyyy') : ''}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </Card>
                            </motion.div>
                          );
                        }

                        // 7. Tiles
                        if (viewMode === "tiles") {
                          return (
                            <motion.div layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2 }} key={bookmark.id}>
                              <Card 
                                className={`group relative overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer ${isSelected ? 'ring-1 ring-primary' : ''} flex items-center p-3 h-[60px] bg-background`}
                                onClick={(e) => {
                                  if (isMultiSelect) toggleSelection(bookmark.id, e);
                                  else window.open(bookmark.url, "_blank");
                                }}
                              >
                                {deadLinkIds.has(bookmark.id) && (
                                  <Badge variant="destructive" className="absolute top-1 right-1 text-[6px] uppercase tracking-wider px-0.5 py-0 h-3 font-normal">
                                    Dead
                                  </Badge>
                                )}
                                <div className="flex items-center gap-3 w-full">
                                  {isMultiSelect && (
                                    <div className="shrink-0" onClick={(e) => { e.stopPropagation(); toggleSelection(bookmark.id, e); }}>
                                      <div className={`h-4 w-4 rounded border flex items-center justify-center ${isSelected ? 'bg-primary border-primary text-primary-foreground' : 'bg-background border-muted-foreground/30 text-transparent hover:border-primary'}`}>
                                        <Check className="h-3 w-3" />
                                      </div>
                                    </div>
                                  )}
                                  <div className="h-8 w-8 shrink-0 rounded bg-muted/50 border border-border/50 flex items-center justify-center overflow-hidden relative">
                                    {getFavicon(bookmark.url) ? (
                                      <img src={getFavicon(bookmark.url)!} alt="" className="w-4 h-4 object-contain" referrerPolicy="no-referrer" />
                                    ) : (
                                      <Globe className="h-4 w-4 text-muted-foreground" />
                                    )}
                                    {bookmark.isFavorite && (
                                      <div className="absolute -top-1 -right-1">
                                        <Star className="h-2 w-2 fill-yellow-400 text-yellow-400" />
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h3 className="font-medium text-xs truncate group-hover:text-primary transition-colors">
                                      {bookmark.title.length > 11 ? bookmark.title.substring(0, 11) + '...' : bookmark.title}
                                    </h3>
                                  </div>
                                  <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                    {actionsMenuNode}
                                  </div>
                                </div>
                              </Card>
                            </motion.div>
                          );
                        }

                        // 9. Minimal
                        if (viewMode === "minimal") {
                          return (
                            <motion.div layout initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2 }} key={bookmark.id}>
                              <div 
                                className={`group relative transition-all duration-200 cursor-pointer flex items-center justify-center py-2 px-3 rounded-md hover:bg-muted/30 ${isSelected ? 'bg-primary/10' : 'bg-transparent'} w-full md:h-[120px]`}
                                onClick={(e) => {
                                  if (isMultiSelect) toggleSelection(bookmark.id, e);
                                  else window.open(bookmark.url, "_blank");
                                }}
                              >
                                {deadLinkIds.has(bookmark.id) && (
                                  <Badge variant="destructive" className="absolute top-1 right-1 text-[7px] uppercase tracking-wider px-1 py-0.5 h-4 font-normal z-10">
                                    Dead
                                  </Badge>
                                )}
                                <div className="flex flex-row md:flex-col items-center gap-3 md:gap-2 w-full md:justify-center">
                                  {isMultiSelect && (
                                    <div className="shrink-0 md:absolute md:top-2 md:left-2 md:z-10" onClick={(e) => { e.stopPropagation(); toggleSelection(bookmark.id, e); }}>
                                      <div className={`h-5 w-5 rounded border flex items-center justify-center ${isSelected ? 'bg-primary border-primary text-primary-foreground' : 'bg-background border-muted-foreground/30 text-transparent hover:border-primary'}`}>
                                        <Check className="h-3.5 w-3.5" />
                                      </div>
                                    </div>
                                  )}
                                  <div className="h-12 w-12 shrink-0 flex items-center justify-center relative">
                                    {getFavicon(bookmark.url) ? (
                                      <img src={getFavicon(bookmark.url)!} alt="" className="w-10 h-10 object-contain" referrerPolicy="no-referrer" />
                                    ) : (
                                      <Globe className="h-10 w-10 text-muted-foreground" />
                                    )}
                                    {bookmark.isFavorite && (
                                      <div className="absolute -top-1 -right-1">
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex-1 min-w-0 pr-6 md:pr-0 md:w-full md:text-center">
                                    <h3 className="font-medium text-base truncate group-hover:text-primary transition-colors">
                                      {bookmark.title.length > 11 ? bookmark.title.substring(0, 11) + '...' : bookmark.title}
                                    </h3>
                                  </div>
                                  <div className="absolute right-2 md:top-2 md:right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    {actionsMenuNode}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          );
                        }

                        // 8. Content
                        return (
                          <motion.div layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2 }} key={bookmark.id}>
                            <Card 
                              className={`group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer ${isSelected ? 'ring-1 ring-primary' : ''} flex flex-col p-5 h-[200px] bg-background`}
                              onClick={(e) => {
                                if (isMultiSelect) toggleSelection(bookmark.id, e);
                                else window.open(bookmark.url, "_blank");
                              }}
                            >
                              {deadLinkIds.has(bookmark.id) && (
                                <Badge variant="destructive" className="absolute top-3 right-3 text-[8px] uppercase tracking-wider px-1.5 py-0.5 h-5 font-normal">
                                  Dead
                                </Badge>
                              )}
                              <div className="flex items-start gap-4 h-full">
                                {isMultiSelect && (
                                  <div className="shrink-0 mt-1" onClick={(e) => { e.stopPropagation(); toggleSelection(bookmark.id, e); }}>
                                    <div className={`h-5 w-5 rounded border flex items-center justify-center ${isSelected ? 'bg-primary border-primary text-primary-foreground' : 'bg-background border-muted-foreground/30 text-transparent hover:border-primary'}`}>
                                      <Check className="h-3.5 w-3.5" />
                                    </div>
                                  </div>
                                )}
                                <div className="h-14 w-14 shrink-0 rounded-xl bg-muted/50 border border-border/50 flex items-center justify-center overflow-hidden mt-1 relative">
                                  {getFavicon(bookmark.url) ? (
                                    <img src={getFavicon(bookmark.url)!} alt="" className="w-8 h-8 object-contain" referrerPolicy="no-referrer" />
                                  ) : (
                                    <Globe className="h-8 w-8 text-muted-foreground" />
                                  )}
                                  {bookmark.isFavorite && (
                                    <div className="absolute -top-1 -right-1">
                                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    </div>
                                  )}
                                </div>
                                <div className="flex-1 min-w-0 flex flex-col h-full">
                                  <div className="flex items-start justify-between gap-4">
                                    <h3 className="font-bold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                                      {bookmark.title.length > 11 ? bookmark.title.substring(0, 11) + '...' : bookmark.title}
                                    </h3>
                                    <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity -mt-1 -mr-1">
                                      {actionsMenuNode}
                                    </div>
                                  </div>
                                  <p className="text-sm text-muted-foreground line-clamp-3 mt-2 flex-1">
                                    {bookmark.description || bookmark.url}
                                  </p>
                                  <div className="mt-auto pt-3 flex items-center justify-between">
                                    <Badge variant="secondary" className="text-xs px-2.5 py-0.5 font-medium">
                                      {bookmark.category}
                                    </Badge>
                                    <span className="text-xs text-muted-foreground">
                                      {bookmark.createdAt ? format(bookmark.createdAt, 'MMM d, yyyy') : ''}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </Card>
                          </motion.div>
                        );
                      })}
                      </AnimatePresence>
                    )}
                  </motion.div>
                )}
              </div>
            </ScrollArea>
          </main>
        </div>
      </SidebarProvider>

      {/* Description Modal */}
      {viewingDescriptionItem && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setViewingDescriptionItem(null)}
          ></div>
          <div className="bg-white dark:bg-[#0a0a0a] w-full max-w-[500px] rounded-2xl p-6 relative z-10 border border-black/10 dark:border-white/[0.08] shadow-2xl animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setViewingDescriptionItem(null)}
              className="absolute top-4 end-4 p-2 text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
            <div className="flex items-center gap-3 mb-4 pe-8">
              <div className="h-10 w-10 shrink-0 rounded-lg bg-muted/50 border border-border/50 flex items-center justify-center overflow-hidden">
                {getFavicon(viewingDescriptionItem.url) ? (
                  <img src={getFavicon(viewingDescriptionItem.url)!} alt="" className="w-6 h-6 object-contain" referrerPolicy="no-referrer" />
                ) : (
                  <span className="text-lg font-semibold text-muted-foreground uppercase">
                    {viewingDescriptionItem.title ? viewingDescriptionItem.title.charAt(0) : <Globe className="h-5 w-5" />}
                  </span>
                )}
              </div>
              <h2 className="text-xl font-bold text-black dark:text-white tracking-tight line-clamp-2">
                {viewingDescriptionItem.title.length > 11 ? viewingDescriptionItem.title.substring(0, 11) + '...' : viewingDescriptionItem.title}
              </h2>
            </div>
            <div className="bg-muted/30 rounded-xl p-4 border border-border/50">
              <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                {viewingDescriptionItem.description || t.noDescription}
              </p>
            </div>
            <div className="mt-6 flex justify-end">
              <Button onClick={() => setViewingDescriptionItem(null)}>
                {t.close || "Close"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Group Creation Modal */}
      {isGroupModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsGroupModalOpen(false)}
          ></div>
          <div className="bg-background w-full max-w-[400px] rounded-2xl p-6 relative z-10 border border-border shadow-2xl animate-in zoom-in-95 duration-200">
            <h2 className="text-xl font-bold mb-4">{lang === "ar" ? "إنشاء مجموعة جديدة" : "Create New Group"}</h2>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">{lang === "ar" ? "اسم المجموعة" : "Group Name"}</label>
              <Input
                autoFocus
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                placeholder={lang === "ar" ? "أدخل اسم المجموعة..." : "Enter group name..."}
                maxLength={11}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && newGroupName.trim()) {
                    handleCreateGroup(newGroupName, Array.from(selectedItems));
                    setIsGroupModalOpen(false);
                    setIsMultiSelect(false);
                    setSelectedItems(new Set());
                    setNewGroupName("");
                  }
                }}
              />
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setIsGroupModalOpen(false)}>
                {t.cancel || "Cancel"}
              </Button>
              <Button 
                disabled={!newGroupName.trim()}
                onClick={() => {
                  handleCreateGroup(newGroupName, Array.from(selectedItems));
                  setIsGroupModalOpen(false);
                  setIsMultiSelect(false);
                  setSelectedItems(new Set());
                  setNewGroupName("");
                }}
              >
                {lang === "ar" ? "إنشاء" : "Create"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Group Rename Modal */}
      {isRenameGroupModalOpen && groupToRename && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => {
              setIsRenameGroupModalOpen(false);
              setGroupToRename(null);
            }}
          ></div>
          <div className="bg-background w-full max-w-[400px] rounded-2xl p-6 relative z-10 border border-border shadow-2xl animate-in zoom-in-95 duration-200">
            <h2 className="text-xl font-bold mb-4">{lang === "ar" ? "إعادة تسمية المجموعة" : "Rename Group"}</h2>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">{lang === "ar" ? "اسم المجموعة" : "Group Name"}</label>
              <Input
                autoFocus
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                placeholder={lang === "ar" ? "أدخل اسم المجموعة..." : "Enter group name..."}
                maxLength={11}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && newGroupName.trim()) {
                    handleRenameGroup(groupToRename.id, newGroupName);
                    setIsRenameGroupModalOpen(false);
                    setGroupToRename(null);
                    setNewGroupName("");
                  }
                }}
              />
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="ghost" onClick={() => {
                setIsRenameGroupModalOpen(false);
                setGroupToRename(null);
              }}>
                {t.cancel || "Cancel"}
              </Button>
              <Button 
                disabled={!newGroupName.trim()}
                onClick={() => {
                  handleRenameGroup(groupToRename.id, newGroupName);
                  setIsRenameGroupModalOpen(false);
                  setGroupToRename(null);
                  setNewGroupName("");
                }}
              >
                {lang === "ar" ? "حفظ" : "Save"}
              </Button>
            </div>
          </div>
        </div>
      )}
      <Sheet open={isSuggestionsModalOpen} onOpenChange={setIsSuggestionsModalOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{t.smartSuggestions}</SheetTitle>
            <SheetDescription className="whitespace-pre-wrap">
              {suggestions}
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>

      {/* Select Bookmarks to Favorites Modal */}
      <Sheet open={isSelectBookmarksModalOpen} onOpenChange={setIsSelectBookmarksModalOpen}>
        <SheetContent side={lang === "ar" ? "left" : "right"} className="w-full sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>{t.selectBookmarks || "Select Bookmarks to Add to Favorites"}</SheetTitle>
            <SheetDescription>
              {t.selectBookmarksDesc || "Choose bookmarks from your collection to add to favorites"}
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6 space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto">
            {bookmarks
              .filter(b => !b.isFavorite && !b.isGroup)
              .map((bookmark) => (
                <div 
                  key={bookmark.id} 
                  className="flex items-start gap-3 p-3 rounded-lg border border-border/50 hover:border-primary/50 cursor-pointer transition-colors"
                  onClick={() => {
                    const newSelected = new Set(selectedBookmarksToFavorite);
                    if (newSelected.has(bookmark.id)) {
                      newSelected.delete(bookmark.id);
                    } else {
                      newSelected.add(bookmark.id);
                    }
                    setSelectedBookmarksToFavorite(newSelected);
                  }}
                >
                  <div className="flex items-center justify-center h-6 w-6 rounded border border-border flex-shrink-0 mt-0.5">
                    {selectedBookmarksToFavorite.has(bookmark.id) && (
                      <Check className="h-4 w-4 text-primary" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">{bookmark.title}</h4>
                    <p className="text-xs text-muted-foreground truncate">{bookmark.url}</p>
                  </div>
                </div>
              ))}
            {bookmarks.filter(b => !b.isFavorite && !b.isGroup).length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-8">
                {t.allBookmarksFavorited || "All your bookmarks are already in favorites!"}
              </p>
            )}
          </div>
          <div className="flex gap-3 mt-6">
            <Button 
              variant="outline" 
              onClick={() => {
                setIsSelectBookmarksModalOpen(false);
                setSelectedBookmarksToFavorite(new Set());
              }}
              className="flex-1"
            >
              {t.cancel || "Cancel"}
            </Button>
            <Button 
              onClick={() => {
                selectedBookmarksToFavorite.forEach(id => {
                  handleToggleFavorite(id, false);
                });
                setIsSelectBookmarksModalOpen(false);
                setSelectedBookmarksToFavorite(new Set());
              }}
              disabled={selectedBookmarksToFavorite.size === 0}
              className="flex-1"
            >
              {t.addToFavorites || `Add (${selectedBookmarksToFavorite.size})`}
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Floating Tools */}
      {showFloatingTools && (
        <div className={`fixed bottom-6 z-50 flex flex-col gap-3 ${lang === "ar" ? "left-6" : "right-6"}`}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex flex-col gap-2"
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  className="h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  onClick={() => setShowFloatingTools(false)}
                >
                  <Zap className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                Hide Tools
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="outline"
                  className="h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-background/80 backdrop-blur-sm"
                  onClick={getSmartSuggestions}
                >
                  <Wand2 className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                AI Suggestions
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="outline"
                  className="h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-background/80 backdrop-blur-sm"
                  onClick={checkDeadLinks}
                >
                  <Link2Off className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                Check Dead Links
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="outline"
                  className="h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-background/80 backdrop-blur-sm"
                  onClick={() => { setEditingItem(null); setIsModalOpen(true); }}
                >
                  <Plus className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                Add Bookmark
              </TooltipContent>
            </Tooltip>
          </motion.div>
        </div>
      )}

      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <FloatingToolComp Icon={ChatGPTIcon} className="top-20 left-20" delay="0s" />
        <FloatingToolComp Icon={GeminiIcon} className="top-40 right-32" delay="2s" />
        <FloatingToolComp Icon={ReactIcon} className="bottom-32 left-40" delay="4s" />
        <FloatingToolComp Icon={NeonDBIcon} className="bottom-20 right-20" delay="6s" />
      </div>

      {/* Show Tools Button */}
      {!showFloatingTools && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={`fixed bottom-6 z-50 ${lang === "ar" ? "left-6" : "right-6"}`}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                className="h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-900 dark:hover:bg-gray-100"
                onClick={() => setShowFloatingTools(true)}
              >
                <Eye className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              Show Tools
            </TooltipContent>
          </Tooltip>
        </motion.div>
      )}
    </TooltipProvider>
  );
};
