import React from 'react';
import { getAllTopics } from '@/data/loaders';

import { TopicsList } from '@/components/custom/topics-list';
import { notFound } from 'next/navigation';


interface TopicProps {
  id: number;
  documentId: string;
  title: string;
  description: string;
  type: "QUESTION" | "TOPIC";
  upvotes: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

async function loader() {
  const data = await getAllTopics();
  if (!data?.data) notFound();
  return data;
}

export default async function TopicsPage() {
  const {data} = await loader();
  return (
    <div className="container mx-auto px-4 py-8">
      <TopicsList data={data as TopicProps[]} />
    </div>
  )
}
