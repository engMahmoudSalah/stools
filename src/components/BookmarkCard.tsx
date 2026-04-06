import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, MoreHorizontal, ExternalLink, CheckSquare, Copy, AlignJustify, Edit2, Trash2, Check } from "lucide-react";
import { getFavicon } from "@/src/lib/utils";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface BookmarkCardProps {
  bookmark: any;
  variant: "compact" | "bento" | "list";
  isSelected: boolean;
  isMultiSelect: boolean;
  toggleSelection: (id: string, e: any) => void;
  canEdit: boolean;
  t: any;
  handleCopy: (url: string, id: string, e?: any) => void;
  setEditingItem: (item: any) => void;
  setIsModalOpen: (open: boolean) => void;
  handleDelete: (id: string) => void;
  setViewingDescriptionItem: (item: any) => void;
  setIsMultiSelect: (select: boolean) => void;
}

export const BookmarkCard: React.FC<BookmarkCardProps> = ({
  bookmark,
  variant,
  isSelected,
  isMultiSelect,
  toggleSelection,
  canEdit,
  t,
  handleCopy,
  setEditingItem,
  setIsModalOpen,
  handleDelete,
  setViewingDescriptionItem,
  setIsMultiSelect,
}) => {
  const baseClasses = "group relative overflow-hidden transition-all duration-300 cursor-pointer border flex flex-col";
  const selectedClasses = isSelected ? "border-primary ring-1 ring-primary" : "border-border/50 hover:border-border";

  if (variant === "compact") {
    return (
      <Card
        className={`${baseClasses} ${selectedClasses} p-3`}
        onClick={(e) => {
          if (isMultiSelect) toggleSelection(bookmark.id, e);
          else window.open(bookmark.url, "_blank");
        }}
      >
        <div className="flex items-center gap-3">
          {isMultiSelect && (
            <div className="shrink-0" onClick={(e) => { e.stopPropagation(); toggleSelection(bookmark.id, e); }}>
              <div className={`h-5 w-5 rounded border flex items-center justify-center ${isSelected ? 'bg-primary border-primary text-primary-foreground' : 'bg-background border-muted-foreground/30 text-transparent hover:border-primary'}`}>
                <Check className="h-3.5 w-3.5" />
              </div>
            </div>
          )}
          <div className="h-10 w-10 shrink-0 rounded-lg bg-muted/50 border border-border/50 flex items-center justify-center overflow-hidden">
            {getFavicon(bookmark.url) ? (
              <img src={getFavicon(bookmark.url)!} alt="" className="w-6 h-6 object-contain" referrerPolicy="no-referrer" />
            ) : (
              <span className="text-lg font-semibold text-muted-foreground uppercase">
                {bookmark.title ? bookmark.title.charAt(0) : <Globe className="h-5 w-5" />}
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <h3 className="font-semibold text-sm leading-tight truncate group-hover:text-primary transition-colors pe-8">{bookmark.title}</h3>
            <div className="mt-1.5 flex items-center">
              <Badge variant="secondary" className="text-[9px] uppercase tracking-wider px-1.5 py-0 h-5 font-normal bg-muted/50 text-muted-foreground">{bookmark.category}</Badge>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  if (variant === "bento") {
    return (
      <Card
        className={`${baseClasses} ${selectedClasses} p-4 gap-3`}
        onClick={(e) => {
          if (isMultiSelect) toggleSelection(bookmark.id, e);
          else window.open(bookmark.url, "_blank");
        }}
      >
        <div className="flex justify-between items-start">
          <div className="h-10 w-10 shrink-0 rounded-xl bg-muted/50 border border-border/50 flex items-center justify-center overflow-hidden">
            {getFavicon(bookmark.url) ? (
              <img src={getFavicon(bookmark.url)!} alt="" className="w-6 h-6 object-contain" referrerPolicy="no-referrer" />
            ) : (
              <Globe className="h-5 w-5 text-muted-foreground" />
            )}
          </div>
          <Badge variant="secondary" className="text-[10px] rounded-full px-2 py-0.5 font-medium bg-muted/50 text-muted-foreground">{bookmark.category}</Badge>
        </div>
        <h3 className="font-medium text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">{bookmark.title}</h3>
      </Card>
    );
  }

  // List variant
  return (
    <Card
      className={`${baseClasses} ${selectedClasses} p-2 flex-row items-center gap-4`}
      onClick={(e) => {
        if (isMultiSelect) toggleSelection(bookmark.id, e);
        else window.open(bookmark.url, "_blank");
      }}
    >
      <div className="h-8 w-8 shrink-0 rounded bg-muted/50 border border-border/50 flex items-center justify-center overflow-hidden">
        {getFavicon(bookmark.url) ? (
          <img src={getFavicon(bookmark.url)!} alt="" className="w-5 h-5 object-contain" referrerPolicy="no-referrer" />
        ) : (
          <Globe className="h-4 w-4 text-muted-foreground" />
        )}
      </div>
      <h3 className="font-medium text-sm flex-1 truncate">{bookmark.title}</h3>
      <Badge variant="secondary" className="text-[10px] px-2 py-0.5 font-normal bg-muted/50 text-muted-foreground">{bookmark.category}</Badge>
    </Card>
  );
};
