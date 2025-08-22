# Project Patterns and Best Practices

This document outlines the coding patterns and best practices followed in this Next.js project.

## File Structure and Naming

### Component Naming
- Use `PascalCase` for component files and function names
- Page components: `HomePage`, `CoursePage`, `LessonPage`
- Layout components: `RootLayout`, `CourseLayout`
- Avoid generic suffixes like `Route` - use descriptive names

### Type Naming
- Prefix all type definitions with `T`: `TUserData`, `TCourseData`, `TLessonData`
- Use descriptive prop type names: `CourseLayoutProps`, `LessonPageProps`

## Data Loading Patterns

### Loader Functions
- Use loader as name to keep generic:
  ```typescript
  // Good
  async function loader() { }

  // Avoid
  async function getLessonData(slug: string) { }
  async function getCurrentUser() { }
  async function getCoursesData() { }
  
  ```

  But give descriptive name for what they return:
  ```typescript
  // Good
  const lessons = async function loader()

  ```

### Error Handling
- Use `validateApiResponse()` for all API responses instead of try/catch blocks
- Add `notFound()` calls when required data is missing:
  ```typescript
  async function getLessonData(slug: string) {
    const response = await loaders.getLessonBySlug(slug);
    const data = validateApiResponse(response, "lesson");
    const lessonData = data[0];
    
    if (!lessonData) notFound();
    
    return lessonData;
  }
  ```

### Type Inference
- Avoid explicit typing on loader functions - let TypeScript infer return types
- The loader functions return properly typed data from `validateApiResponse()`

## Import Organization

Organize imports in this order:
1. Next.js imports (`next/navigation`, `next/link`)
2. Data utilities (`@/data-utils/loaders`, `@/lib/error-handler`)
3. Custom components (`@/components/custom/*`)
4. UI components (`@/components/ui/*`)

```typescript
import { notFound } from "next/navigation";
import { loaders } from "@/data-utils/loaders";
import { validateApiResponse } from "@/lib/error-handler";
import { LessonLink } from "@/components/custom/lesson-link";
import { ScrollArea } from "@/components/ui/scroll-area";
```

## Component Patterns

### Page Components
```typescript
type PageProps = {
  readonly params: Promise<{ slug: string }>;
};

export default async function SomePage({ params }: PageProps) {
  const { slug } = await params;
  const data = await getSomeData(slug);
  
  return (
    <div>
      {/* Component JSX */}
    </div>
  );
}
```

### Layout Components
```typescript
type LayoutProps = {
  readonly params: Promise<{ slug: string }>;
  readonly children: React.ReactNode;
};

export default async function SomeLayout({ params, children }: LayoutProps) {
  const { slug } = await params;
  const data = await getSomeData(slug);
  
  return (
    <div>
      {/* Layout JSX */}
      {children}
    </div>
  );
}
```

## Type Definitions

### Data Types Location
- All data types are centralized in `src/types/index.ts`
- Use `type` declarations instead of `interface`
- Use intersection types (`&`) for extending types:

```typescript
export type TLessonDetailData = TLessonData & {
  content: string;
  resources?: string;
  player: Array<{
    videoId: string;
    timecode: number;
  }>;
};
```

### API Response Types
- All API responses use `TStrapiResponse<T>` wrapper type
- Loader functions return the unwrapped data type after validation

## JSX Best Practices

### Conditional Rendering
```typescript
// Good - with proper fallback
{lessons.length > 0 ? (
  lessons.map((lesson) => (
    <LessonLink
      key={lesson.documentId}
      lesson={lesson}
      index={index}
    />
  ))
) : (
  <div>No lessons found</div>
)}
```

### Key Props
- Use `documentId` for keys instead of array indices
- Place `key` prop first in component props

### String Interpolation
- Use template literals for dynamic strings:
  ```typescript
  pathname={`/courses/${courseSlug}`}
  ```

## Error Handling

### Data Validation
- Use `validateApiResponse()` for all API calls
- Pass context string for better error messages:
  ```typescript
  const data = validateApiResponse(response, "lesson");
  ```

### Null Checks
- Add proper null checks for optional data:
  ```typescript
  const video = player?.[0];
  if (!video) {
    return <div>No video available</div>;
  }
  ```

## Styling

### Class Names
- Use descriptive class names
- Prefer utility classes from Tailwind CSS
- Use consistent spacing patterns

## Commands

### Type Checking
```bash
npm run typecheck
```

### Linting
```bash
npm run lint
```

### Development
```bash
npm run dev
```

## Notes for Claude

- Always use the TodoWrite tool for multi-step tasks
- Remove try/catch blocks - use `validateApiResponse()` instead
- Check for proper error handling with `notFound()` calls
- Ensure type safety and proper TypeScript patterns
- Follow import organization rules
- Use descriptive naming for all functions and components