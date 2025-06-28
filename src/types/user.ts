export type StrapiUserData = {
  id: number;
  documentId: string;
  username: string;
  email: string;
  userProfile: {
    id: number,
    documentId: string,
  }
}

export type StrapiUserProfileData = {
  id: number;
  documentId: string;
  name: string;
  githubLink: string;
  bio: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
