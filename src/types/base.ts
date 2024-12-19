export interface LinkProps {
  id: number;
  label: string;
  href: string;
  isExternal: boolean;
}

export interface ImageProps {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string | null;
}

export interface HeaderProps {
  logoText: LinkProps;
  navItems: LinkProps[];
  cta: LinkProps;
  showSignUp: boolean;
}
