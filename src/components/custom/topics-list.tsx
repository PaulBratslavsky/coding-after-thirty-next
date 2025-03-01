"use client"
import { formatDate } from "@/lib/utils"
import { useState, useActionState } from "react"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ThumbsUp, Plus } from "lucide-react"

// Import the server action from the separate file
import { addTopic } from "@/data/actions"

interface TopicProps {
  id: number
  documentId: string
  title: string
  description: string
  type: "QUESTION" | "TOPIC"
  upvotes: number
  createdAt: string
  updatedAt: string
  publishedAt: string
}

interface FormState {
  message: string;
  errors: {
    title?: string[];
    description?: string[];
    type?: string[];
  };
  title: string;
  description: string;
  type: "TOPIC" | "QUESTION";
}

// Add Topic Form Component
function AddTopicForm({ onClose }: { onClose: () => void }) {
  const initialState: FormState = {
    message: "",
    errors: {},
    title: "",
    description: "",
    type: "TOPIC",
  }
  const [state, formAction, isPending] = useActionState(addTopic, initialState)

  return (
    <form action={formAction}>
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" placeholder="Enter topic title" defaultValue={state.title || ""} />
          {state.errors?.title && <p className="text-sm text-red-500 mt-1">{state.errors.title[0]}</p>}
        </div>

        <div>
          <Label htmlFor="type">Type</Label>
          <Select name="type" defaultValue={state.type || "TOPIC"}>
            <SelectTrigger>
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TOPIC">Topic</SelectItem>
              <SelectItem value="QUESTION">Question</SelectItem>
            </SelectContent>
          </Select>
          {state.errors?.type && <p className="text-sm text-red-500 mt-1">{state.errors.type[0]}</p>}
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Enter topic description"
            className="min-h-[100px]"
            defaultValue={state.description || ""}
          />
          {state.errors?.description && <p className="text-sm text-red-500 mt-1">{state.errors.description[0]}</p>}
        </div>

        {state.message && (
          <div
            className={`p-3 rounded ${state.errors && Object.keys(state.errors).length > 0 ? "bg-red-50 text-red-500" : "bg-green-50 text-green-500"}`}
          >
            {state.message}
          </div>
        )}

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        </DialogFooter>
      </div>
    </form>
  )
}

export function TopicsList({ data }: { data: TopicProps[] }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Topics</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Topic
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Topic</DialogTitle>
              <DialogDescription>Create a new topic or question to share with the community.</DialogDescription>
            </DialogHeader>
            <AddTopicForm onClose={() => setIsOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <h1 className="text-sm text-gray-500 mb-4">Note: Form and upvote is not working yet, work in progress.</h1>

      <Table className="my-6">
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Upvotes</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((topic: TopicProps) => (
            <TableRow key={topic.documentId}>
              <TableCell className="font-medium">{topic.title}</TableCell>
              <TableCell>
                <Badge variant={topic.type === "TOPIC" ? "default" : "secondary"}>
                  {topic.type === "TOPIC" ? "Topic" : "Question"}
                </Badge>
              </TableCell>
              <TableCell className="max-w-xs truncate">
                <HoverCard>
                  <HoverCardTrigger className="cursor-pointer flex items-center">
                    {topic.description.slice(0, 100).slice(0, 35) + " [ See more ]"}
                  </HoverCardTrigger>
                  <HoverCardContent className="w-3/4 rounded shadow-md text-wrap">
                    <p className="text-sm my-6">{topic.description}</p>
                    <form>
                      <Button variant="outline" size="sm" type="submit" disabled>
                        <ThumbsUp className="mr-2 h-4 w-4" />
                        Upvote
                      </Button>
                    </form>
                  </HoverCardContent>
                </HoverCard>
              </TableCell>
              <TableCell>{formatDate(topic.createdAt)}</TableCell>
              <TableCell>{topic.upvotes}</TableCell>
              <TableCell>
                <form>
                  <Button variant="outline" size="sm" type="submit" disabled>
                    <ThumbsUp className="mr-2 h-4 w-4" />
                    Upvote
                  </Button>
                </form>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

