import React, { useState } from "react";
import { Plus, LayoutGrid, Search, Boxes, Clock, Star, Folder, Settings, Sun, Monitor, Moon, LogOut, X, MoreHorizontal, ExternalLink, CheckSquare, Copy, AlignJustify, Edit2, Trash2, ChevronLeft, ChevronRight, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export function FloatingSidebar(props: any) {
  const [isExpanded, setIsExpanded] = useState(false);
  const {
    lang, t, user, searchTerm, setSearchTerm,
    selectedCategory, setSelectedCategory, bookmarks,
    customCategories, canEdit, handleLogout,
    setIsModalOpen
  } = props;

  const toggleSidebar = () => setIsExpanded(!isExpanded);

  return (
    <div 
      className={cn(
        "fixed left-3 top-3 bottom-3 z-50 bg-[#1a1f2e] text-white rounded-2xl shadow-xl transition-all duration-300 ease-in-out flex flex-col items-center py-4",
        isExpanded ? "w-64" : "w-16"
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-center mb-8">
        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-lg">
          <Boxes className="text-black w-4 h-4" />
        </div>
        {isExpanded && <span className="font-bold text-lg tracking-tighter uppercase ms-2">{t.logo}</span>}
      </div>

      {/* Toggle Button */}
      <Button variant="ghost" size="icon" className="mb-8 text-white hover:bg-white/10" onClick={toggleSidebar}>
        {isExpanded ? <ChevronLeft /> : <Menu />}
      </Button>

      {/* Navigation */}
      <div className="flex flex-col gap-4 w-full px-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button variant="ghost" size="icon" className={cn("w-full justify-start text-white hover:bg-white/10", !isExpanded && "justify-center")} onClick={() => setSelectedCategory("recent")}>
                <Clock className="w-5 h-5" />
                {isExpanded && <span className="ms-3">{t.recent}</span>}
              </Button>
            </TooltipTrigger>
            {!isExpanded && <TooltipContent side="right">{t.recent}</TooltipContent>}
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button variant="ghost" size="icon" className={cn("w-full justify-start text-white hover:bg-white/10", !isExpanded && "justify-center")} onClick={() => setSelectedCategory("favorites")}>
                <Star className="w-5 h-5" />
                {isExpanded && <span className="ms-3">{t.favorites}</span>}
              </Button>
            </TooltipTrigger>
            {!isExpanded && <TooltipContent side="right">{t.favorites}</TooltipContent>}
          </Tooltip>
        </TooltipProvider>

        {/* Collections */}
        <div className={cn("mt-4 text-xs font-semibold text-gray-400 uppercase", !isExpanded && "text-center")}>
          {isExpanded ? t.collections : <div className="h-px w-4 bg-gray-600 mx-auto" />}
        </div>
        {customCategories.map((cat: any) => (
          <Button key={cat.id} variant="ghost" size="icon" className={cn("w-full justify-start text-white hover:bg-white/10", !isExpanded && "justify-center")} onClick={() => setSelectedCategory(cat.name)}>
            <Folder className="w-5 h-5" />
            {isExpanded && <span className="ms-3">{cat.name}</span>}
          </Button>
        ))}
      </div>

      {/* Bottom Items */}
      <div className="mt-auto flex flex-col gap-4 w-full px-2">
        <Button variant="ghost" size="icon" className={cn("w-full justify-start text-white hover:bg-white/10", !isExpanded && "justify-center")} onClick={() => setIsModalOpen(true)}>
          <Plus className="w-5 h-5" />
          {isExpanded && <span className="ms-3">{t.addBookmark}</span>}
        </Button>
        <Button variant="ghost" size="icon" className={cn("w-full justify-start text-white hover:bg-white/10", !isExpanded && "justify-center")}>
          <Settings className="w-5 h-5" />
          {isExpanded && <span className="ms-3">{t.settings}</span>}
        </Button>
        
        {/* User Profile */}
        <div className={cn("flex items-center mt-4", !isExpanded ? "justify-center" : "px-2")}>
          <Avatar className="h-10 w-10">
            <AvatarImage src={user?.photoURL} />
            <AvatarFallback>{user?.email?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
          </Avatar>
          {isExpanded && (
            <div className="ms-3 overflow-hidden">
              <p className="text-sm font-medium truncate">{user?.displayName || "User"}</p>
              <Button variant="link" className="text-xs text-gray-400 p-0 h-auto" onClick={handleLogout}>{t.logout}</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
