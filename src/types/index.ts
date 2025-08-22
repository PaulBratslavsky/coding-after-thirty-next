import type { Block } from "@/components/blocks/block-renderer"

export interface BaseParams {
  [key: string]: string | string[] | undefined;
}

export interface RouteParams extends BaseParams {
  documentId?: string;
}

export type Params = Promise<RouteParams>;
export type TSearchParams = Promise<BaseParams>;

export type TImage = {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string | null;
};

export type TLink = {
  id: number;
  href: string;
  label: string;
  isExternal?: boolean;
};


type ComponentType =
  | "blocks.hero"
  | "blocks.heading"
  | "blocks.card-carousel"
  | "blocks.content-with-image";



export interface Base<
  T extends ComponentType,
  D extends object = Record<string, unknown>,
> {
  id: number;
  __component?: T;
  documentId?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  data?: D;
}

export type TStrapiResponse<T = null> = {
  success: boolean;
  data?: T;
  error?: {
    status: number;
    name: string;
    message: string;
    details?: Record<string, string[]>;
  };
  meta?: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
  status: number;
};


export type TLandingPageData = {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  blocks: Block[];
};

export type TGlobalData = {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  siteName: string;
  siteDescription: string;
  header: THeaderProps;
};

export type TCourseData = {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  title: string;
  slug: string;
  description: string;
  image: TImage;
  isPremium: boolean;
};

export type TLessonData = {
  id: number;
  documentId: string;
  slug: string;
  title: string;
  description: string;
};

export type TCourseWithLessonsData = TCourseData & {
  lessons: TLessonData[];
};

export type TLessonDetailData = TLessonData & {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  content: string;
  resources?: string;
  player: Array<{
    videoId: string;
    timecode: number;
  }>;
};

export type THeaderProps = {
  logoText: TLink;
  logoImage?: TImage;
  navItems: TLink[];
  cta: TLink;
  showSignUp: boolean;
};

export type { TStrapiUserData } from "./user";

