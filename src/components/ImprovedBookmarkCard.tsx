import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Check } from "lucide-react";
import { getFavicon } from "@/src/lib/utils";

export const ImprovedBookmarkCard: React.FC<{
  bookmark: any;
  isSelected: boolean;
  isMultiSelect: boolean;
  isDead?: boolean;
  toggleSelection: (id: string, e: any) => void;
  onClick: (e: any) => void;
}> = ({ bookmark, isSelected, isMultiSelect, isDead, toggleSelection, onClick }) => {
  return (
    <Card
      className={`group relative overflow-hidden transition-all duration-300 hover:shadow-md cursor-pointer border ${isSelected ? 'border-primary ring-1 ring-primary' : 'border-border/50 hover:border-border'} flex flex-col p-3`}
      onClick={onClick}
    >
      {isDead && (
        <Badge variant="destructive" className="absolute top-2 right-2 text-[9px] uppercase tracking-wider px-1.5 py-0 h-5 font-normal">
          Dead
        </Badge>
      )}
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
          <h3 className="font-semibold text-sm leading-tight truncate group-hover:text-primary transition-colors pe-8">
            {bookmark.title}
          </h3>
          <div className="mt-1.5 flex items-center">
            <Badge variant="secondary" className="text-[9px] uppercase tracking-wider px-1.5 py-0 h-5 font-normal bg-muted/50 text-muted-foreground">
              {bookmark.category}
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );
};
