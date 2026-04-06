export interface Bookmark {
  id: string;
  title: string;
  url: string;
  category: string;
  description?: string;
  createdAt?: number;
  updatedAt?: number;
  icon?: any;
  time?: string;
  tags?: string[];
  pricing?: string;
  clicks?: number;
  isFavorite?: boolean;
  isGroup?: boolean;
  items?: string[];
  groupId?: string;
}

export interface FilterState {
  categories: string[];
  tags: string[];
  pricing: string[];
  searchQuery: string;
}

export type SortOption = 'recent' | 'az' | 'most_used';

export interface Category {
  id: string;
  name: string;
  isStatic?: boolean;
}

export interface ShareConfig {
  enabled: boolean;
  permission: "view" | "edit";
  widget: string;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'iconify-icon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { icon: string; class?: string };
    }
  }
}
