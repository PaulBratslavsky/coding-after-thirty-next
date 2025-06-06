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
  name: string;
}

export interface HeaderProps {
  logoText: LinkProps;
  logoImage: ImageProps;
  navItems: LinkProps[];
  cta: LinkProps;
  showSignUp: boolean;
}

