import React from 'react';
import { getAllTopics } from '@/data/loaders';
import { getUserMeLoader } from "@/lib/services/user"
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
  const user = await getUserMeLoader();

  if (!data?.data) notFound();
  return {
    data: data.data,
    user: user?.data,
  };
}

export default async function TopicsPage() {
  const {data, user} = await loader();

  console.log(user, "user");
  return (
    <div className="container mx-auto px-4 py-8">
      <TopicsList data={data as TopicProps[]} user={user} />
    </div>
  )
}
