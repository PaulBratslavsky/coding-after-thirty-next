import { InlineMusicPlayer } from "@/components/custom/inline-music-player";
import { PaginationComponent } from "@/components/custom/pagination";

import { getAllSongs } from "@/data/loaders";
import { notFound } from "next/navigation";
export interface StrapiAudioData {
  id: number;
  title: string;
  artist: {
    id: number;
    name: string;
  };
  image: {
    id: number;
    url: string;
    alternativeText: string;
  };
  audio: {
    id: number;
    url: string;
  };
}

interface PageProps {
  searchParams: Promise<{ page?: string; query?: string; category?: string }>
}


async function loader(page: number, query: string) {
  const data = await getAllSongs(page, query);
  const songs = data.data;
  if (!songs) return notFound();
  const totalPages = data.meta?.pagination?.pageCount ?? 1;
  return { songs, totalPages };
}

  export default async function SongsRoute({ searchParams } : PageProps) {
  const resolvedParams = await searchParams;
  const currentPage = Number(resolvedParams?.page) || 1;
  const currentQuery = resolvedParams?.query ?? "";
  
  const data = await loader(currentPage, currentQuery);

  const audioFiles = data.songs; 
  const totalPages = data.totalPages;

  return (
    <div className="container mx-auto">
      <div className="grid my-2 sm:grid-cols-1 md:grid-cols-2 gap-4">
        {audioFiles.map((audio: any) => (
          <InlineMusicPlayer key={audio.id} audio={audio} />
        ))}
      </div>
      <PaginationComponent pageCount={totalPages} />
    </div>
  );
}
