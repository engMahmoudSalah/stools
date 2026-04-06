import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Globe, MoreHorizontal, ExternalLink, CheckSquare, Copy, AlignJustify, Edit2, Trash2, Check } from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

// Minimalist: No border, subtle hover background
export const BookmarkCardMinimal = ({ bookmark, isSelected, isMultiSelect, canEdit, getFavicon, toggleSelection, handleCopy, setViewingDescriptionItem, setEditingItem, setIsModalOpen, handleDelete, t }: any) => (
  <Card 
    className={`group relative transition-all duration-200 cursor-pointer border-transparent hover:bg-muted/30 flex flex-col p-2.5 ${isSelected ? 'bg-muted/50 border-primary/50' : ''}`}
    onClick={(e) => isMultiSelect ? toggleSelection(bookmark.id, e) : window.open(bookmark.url, "_blank")}
  >
    <div className="flex items-center gap-2.5">
      <div className="h-8 w-8 shrink-0 rounded-md bg-background border border-border/50 flex items-center justify-center overflow-hidden">
        {getFavicon(bookmark.url) ? <img src={getFavicon(bookmark.url)!} alt="" className="w-5 h-5 object-contain" referrerPolicy="no-referrer" /> : <Globe className="h-4 w-4 text-muted-foreground" />}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-xs leading-tight truncate">{bookmark.title}</h3>
        <Badge variant="secondary" className="mt-1 text-[9px] px-1 h-4 font-normal bg-muted text-muted-foreground">
          {bookmark.category}
        </Badge>
      </div>
    </div>
  </Card>
);

// Elevated: Border, shadow on hover
export const BookmarkCardElevated = ({ bookmark, isSelected, isMultiSelect, canEdit, getFavicon, toggleSelection, handleCopy, setViewingDescriptionItem, setEditingItem, setIsModalOpen, handleDelete, t }: any) => (
  <Card 
    className={`group relative transition-all duration-300 hover:shadow-lg cursor-pointer border ${isSelected ? 'border-primary ring-1 ring-primary' : 'border-border hover:border-primary/50'} flex flex-col p-3.5 rounded-xl`}
    onClick={(e) => isMultiSelect ? toggleSelection(bookmark.id, e) : window.open(bookmark.url, "_blank")}
  >
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 shrink-0 rounded-xl bg-muted border border-border flex items-center justify-center overflow-hidden shadow-inner">
        {getFavicon(bookmark.url) ? <img src={getFavicon(bookmark.url)!} alt="" className="w-6 h-6 object-contain" referrerPolicy="no-referrer" /> : <Globe className="h-5 w-5 text-muted-foreground" />}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-sm leading-tight truncate">{bookmark.title}</h3>
        <Badge variant="outline" className="mt-1.5 text-[10px] px-1.5 h-5 font-medium">
          {bookmark.category}
        </Badge>
      </div>
    </div>
  </Card>
);

// Compact: List-like
export const BookmarkCardCompact = ({ bookmark, isSelected, isMultiSelect, canEdit, getFavicon, toggleSelection, handleCopy, setViewingDescriptionItem, setEditingItem, setIsModalOpen, handleDelete, t }: any) => (
  <Card 
    className={`group relative transition-all duration-200 cursor-pointer border border-border/40 hover:border-primary/30 flex items-center gap-3 p-2 rounded-lg ${isSelected ? 'bg-primary/5' : ''}`}
    onClick={(e) => isMultiSelect ? toggleSelection(bookmark.id, e) : window.open(bookmark.url, "_blank")}
  >
    <div className="h-6 w-6 shrink-0 rounded-full bg-muted flex items-center justify-center overflow-hidden">
        {getFavicon(bookmark.url) ? <img src={getFavicon(bookmark.url)!} alt="" className="w-4 h-4 object-contain" referrerPolicy="no-referrer" /> : <Globe className="h-3 w-3 text-muted-foreground" />}
    </div>
    <h3 className="font-medium text-xs leading-tight truncate flex-1">{bookmark.title}</h3>
    <Badge variant="ghost" className="text-[9px] px-1 h-4 font-normal text-muted-foreground">
        {bookmark.category}
    </Badge>
  </Card>
);
