export interface Author {
  name: string;
  avatar: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  category: string;
  author: Author;
  featured?: boolean;
  tags?: string[];
}

export interface BlogForm {
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  tags: string[];
  author: Author;
  featured: boolean;
}

export interface BlogCategory {
  name: string;
  slug: string;
  count?: number;
}
