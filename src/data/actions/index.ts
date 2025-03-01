"use server"

import { authenticatedSdk } from "@/lib/sdk"

import { revalidatePath } from "next/cache"
import { z } from "zod"

const formSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  type: z.enum(["QUESTION", "TOPIC"], {
    required_error: "Please select a type.",
  }),
})

// Define the form state type
type FormState = {
  message: string
  errors: {
    title?: string[]
    description?: string[]
    type?: string[]
  }
  title: string
  description: string
  type: string
  documentId?: string
}

// Make sure the server action matches the expected signature for useActionState
export async function addTopic(state: FormState, formData: FormData): Promise<FormState> {
  // Extract form values
  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const type = formData.get("type") as string

  // Validate the form data
  const validatedFields = formSchema.safeParse({
    title,
    description,
    type,
  })

  // If validation fails, return the errors and preserve the form values
  if (!validatedFields.success) {
    return {
      title,
      description,
      type,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "There was a problem with your submission",
    }
  }

  // Validation succeeded, extract the validated data
  const validatedData = validatedFields.data

  const newTopic = await authenticatedSdk.collection("topics").create({
      title: validatedData.title,
      description: validatedData.description,
      type: validatedData.type,
  })

  if (!newTopic) {
    return {
      message: "There was a problem with your submission",
      errors: {
        title: ["There was a problem with your submission"],
        description: ["There was a problem with your submission"],
        type: ["There was a problem with your submission"],
      },
      ...validatedData,
    }
  }


  // Revalidate the path to refresh the data
  revalidatePath("/topics")

  // Return success message and the validated data
  return {
    message: "Topic added successfully",
    errors: {},
    title: validatedData.title,
    description: validatedData.description,
    type: validatedData.type,
    documentId: newTopic.data.documentId
  }
}

