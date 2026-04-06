import React from "react";
import { useSidebar, Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInput } from "@/components/ui/sidebar";
import { Plus, LayoutGrid, Search, Boxes, Clock, Star, Folder, Wand2, Link2Off, Settings, Sun, Monitor, Moon, LogOut, Check, X, MoreHorizontal, ExternalLink, CheckSquare, Copy, AlignJustify, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";

export function DashboardSidebar(props: any) {
  const { toggleSidebar, state, isMobile } = useSidebar();
  const {
    lang, t, user, searchInputRef, searchTerm, setSearchTerm,
    selectedCategory, setSelectedCategory, bookmarks,
    customCategories, isAddingCategory, setIsAddingCategory,
    newCatName, setNewCatName, handleAddCategory,
    editingCategory, setEditingCategory, editCatName, setEditCatName, handleUpdateCategory,
    handleDeleteCategory, canEdit, filteredBookmarks, setLang, themeMode, setThemeMode, handleLogout,
    setIsModalOpen
  } = props;

  return (
    <Sidebar collapsible="icon" side={lang === "ar" ? "right" : "left"} className="border-none h-full [&>div[data-sidebar=sidebar]]:bg-transparent [&>div[data-sidebar=sidebar]]:border-none">
      {/* Collapsed View */}
      {!isMobile && (
        <div className="flex flex-col items-center py-5 h-full group-data-[state=expanded]:hidden w-full bg-sidebar">
          <button 
            className="w-10 h-10 rounded-xl hover:bg-sidebar-accent flex items-center justify-center mb-6 transition-colors group/btn" 
            onClick={() => setIsModalOpen(true)}
            title={t.addBookmark}
          >
            <Plus className="w-6 h-6 text-[#00D9FF] group-hover/btn:scale-110 transition-transform" />
          </button>
          
          <button 
            className="w-10 h-10 rounded-xl hover:bg-sidebar-accent flex items-center justify-center mb-6 transition-colors group/btn" 
            onClick={() => { setSelectedCategory("all"); toggleSidebar(); }}
            title={t.allBookmarks}
          >
            <LayoutGrid className="w-5 h-5 text-gray-400 group-hover/btn:text-white transition-colors" />
          </button>

          <button 
            className="w-10 h-10 rounded-xl hover:bg-sidebar-accent flex items-center justify-center mb-6 transition-colors group/btn" 
            onClick={() => { toggleSidebar(); setTimeout(() => searchInputRef.current?.focus(), 100); }}
            title={t.searchPlaceholder}
          >
            <Search className="w-5 h-5 text-gray-400 group-hover/btn:text-white transition-colors" />
          </button>

          <button 
            className="w-10 h-10 rounded-xl bg-[#4ADE80] flex items-center justify-center mb-auto transition-transform hover:scale-105 shadow-lg shadow-green-500/20" 
            onClick={() => toggleSidebar()}
            title={t.collections}
          >
            <span className="text-white font-bold text-xl leading-none">E</span>
          </button>

          <button 
            className="w-10 h-10 rounded-full overflow-hidden border-2 border-transparent hover:border-white/20 transition-all mt-auto" 
            onClick={() => toggleSidebar()}
          >
            {user?.photoURL ? (
              <img src={user.photoURL} alt="User" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-sidebar-accent flex items-center justify-center text-white font-medium">
                {user?.email?.charAt(0).toUpperCase() || "U"}
              </div>
            )}
          </button>
        </div>
      )}

      {/* Expanded View */}
      <div className={`flex flex-col h-full w-full bg-sidebar border-e border-sidebar-border ${!isMobile ? 'group-data-[state=collapsed]:hidden' : ''}`}>
        <SidebarHeader className="h-auto flex flex-col gap-4 px-4 py-4 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-black dark:bg-white flex items-center justify-center shadow-lg">
              <Boxes className="text-white dark:text-black w-3 h-3" />
            </div>
            <span className="font-bold text-lg tracking-tighter uppercase leading-none text-sidebar-foreground">
              {t.logo}
            </span>
            <Button variant="ghost" size="icon" className="ms-auto h-8 w-8 text-sidebar-foreground" onClick={() => toggleSidebar()}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="relative w-full group">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-sidebar-foreground group-focus-within:text-primary transition-colors" />
            <SidebarInput
              ref={searchInputRef}
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full ps-9 pe-12 bg-sidebar-accent border-sidebar-border focus-visible:bg-sidebar-accent focus-visible:ring-1 focus-visible:ring-primary transition-all h-9 text-xs text-sidebar-foreground"
            />
            <div className="absolute end-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <kbd className="hidden sm:inline-flex h-4 items-center gap-1 rounded border bg-sidebar-accent px-1 font-mono text-[9px] font-medium text-sidebar-foreground opacity-100">
                <span className="text-[9px]">⌘</span>K
              </kbd>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent className="h-full overflow-y-auto scrollbar-hide text-foreground">
          <SidebarGroup>
            <div className="flex items-center justify-between pe-2 sticky top-0 z-10 bg-muted/80 backdrop-blur-md py-2">
              <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{t.categories || "Categories"}</SidebarGroupLabel>
            </div>
            <SidebarGroupContent>
              <SidebarMenu>
                {props.categoriesList.filter((c: any) => c.isStatic).map((cat: any) => (
                  <SidebarMenuItem key={cat.id}>
                    <SidebarMenuButton
                      isActive={selectedCategory === cat.name}
                      onClick={() => setSelectedCategory(cat.name)}
                      className="group/item transition-all"
                    >
                      {cat.name === "all" ? <LayoutGrid className="me-2 h-4 w-4 text-muted-foreground group-hover/item:text-foreground transition-colors" /> : <Folder className="me-2 h-4 w-4 text-muted-foreground group-hover/item:text-foreground transition-colors" />}
                      <span className="uppercase truncate">{t[cat.name] || cat.name}</span>
                      {cat.name === "all" && <Badge variant="secondary" className="ms-auto text-[10px] h-5 px-1.5 opacity-0 group-hover/item:opacity-100 transition-opacity">{filteredBookmarks.length}</Badge>}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <div className="flex items-center justify-between pe-2 sticky top-0 z-10 bg-muted/80 backdrop-blur-md py-2">
              <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{t.library}</SidebarGroupLabel>
            </div>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={selectedCategory === "recent"}
                    onClick={() => setSelectedCategory("recent")}
                    className="group/item transition-all"
                  >
                    <Clock className="me-2 h-4 w-4 text-muted-foreground group-hover/item:text-foreground transition-colors" />
                    <span className="truncate">{t.recent}</span>
                    <Badge variant="secondary" className="ms-auto text-[10px] h-5 px-1.5 opacity-0 group-hover/item:opacity-100 transition-opacity">{bookmarks.filter((b: any) => b.createdAt && Date.now() - b.createdAt < 7 * 24 * 60 * 60 * 1000).length}</Badge>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={selectedCategory === "favorites"}
                    onClick={() => setSelectedCategory("favorites")}
                    className="group/item transition-all"
                  >
                    <Star className="me-2 h-4 w-4 text-muted-foreground group-hover/item:text-foreground transition-colors" />
                    <span className="truncate">{t.favorites}</span>
                    <Badge variant="secondary" className="ms-auto text-[10px] h-5 px-1.5 opacity-0 group-hover/item:opacity-100 transition-opacity">{bookmarks.filter((b: any) => b.isFavorite).length}</Badge>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <div className="flex items-center justify-between pe-2 sticky top-0 z-10 bg-muted/80 backdrop-blur-md py-2">
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
            <SidebarGroupContent>
              <SidebarMenu>
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
                {customCategories.map((cat: any) => (
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
                        isActive={selectedCategory === cat.name}
                        onClick={() => setSelectedCategory(cat.name)}
                        className="group/item transition-all"
                      >
                        <Folder className="me-2 h-4 w-4 text-muted-foreground group-hover/item:text-foreground transition-colors" />
                        <span className="truncate">{cat.name}</span>
                        <Badge variant="secondary" className="ms-auto text-[10px] h-5 px-1.5 opacity-0 group-hover/item:opacity-100 transition-opacity">{bookmarks.filter((b: any) => b.category === cat.name).length}</Badge>
                        {canEdit && (
                          <DropdownMenu>
                            <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover/item:opacity-100 transition-opacity ms-1" onClick={(e) => e.stopPropagation()} />}>
                              <MoreHorizontal className="h-3 w-3" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={(e) => { e.stopPropagation(); setEditingCategory(cat); setEditCatName(cat.name); }}>
                                <Edit2 className="me-2 h-4 w-4" /> {t.editDetails}
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={(e) => { e.stopPropagation(); handleDeleteCategory(cat.id); }}>
                                <Trash2 className="me-2 h-4 w-4" /> {t.deleteBookmark}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton className="text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-500/10">
                    <Wand2 className="me-2 h-4 w-4" />
                    <span>{t.smartSuggestions}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton className="text-destructive hover:text-destructive hover:bg-destructive/10">
                    <Link2Off className="me-2 h-4 w-4" />
                    <span>Dead Links (2)</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="p-4 border-t border-border/50 flex flex-col gap-4 text-foreground">
          <div className="flex items-center justify-between">
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" />}>
                <Settings className="h-4 w-4 text-muted-foreground" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
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
          </div>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-3 overflow-hidden">
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarImage src={user?.photoURL} />
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                  {user?.email?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-medium truncate">{user?.displayName || "User"}</span>
                <span className="text-xs text-muted-foreground truncate">{user?.email}</span>
              </div>
            </div>
            {!props.sharedSpaceId && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="shrink-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                title={t.logout}
              >
                <LogOut size={16} />
              </Button>
            )}
          </div>
        </SidebarFooter>
      </div>
    </Sidebar>
  );
}
