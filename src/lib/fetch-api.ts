type NextFetchRequestConfig = {
  revalidate?: number | false;
  tags?: string[];
};

interface APIResponse<T = unknown> {
  data: T | null;
  status: number;
  statusText: string;
  error?: boolean;
}

interface FetchAPIOptions {
  method: "GET" | "POST" | "PUT" | "DELETE";
  authToken?: string;
  body?: Record<string, unknown>;
  next?: NextFetchRequestConfig;
}

export async function fetchAPI<T>(url: string, options: FetchAPIOptions): Promise<APIResponse<T>> {
  const { method, authToken, body, next } = options;

  const requestInit: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(authToken && { Authorization: `Bearer ${authToken}` }),
    },
    ...(body && { body: JSON.stringify(body) }),
  };

  const fetchOptions = next ? { ...requestInit, next } : requestInit;

  try {
    const response = await fetch(url, fetchOptions);
    const contentType = response.headers.get("content-type");

    if (!response.ok) {
      return {
        status: response.status,
        statusText: response.statusText,
        data: null,
        error: true,
      };
    }

    if (contentType?.includes("application/json")) {
      const data = await response.json();
      return {
        status: response.status,
        statusText: response.statusText,
        data,
        error: false,
      };
    }

    return {
      status: response.status,
      statusText: response.statusText,
      data: null,
      error: false,
    };
  } catch (error) {
    console.error(`Error ${method} data:`, error);
    return {
      status: 500,
      statusText: error instanceof Error ? error.message : 'Unknown error',
      data: null,
      error: true,
    };
  }
}