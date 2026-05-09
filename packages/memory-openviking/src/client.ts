export type FindResultItem = {
  uri: string
  level?: number
  abstract?: string
  overview?: string
  category?: string
  score?: number
  match_reason?: string
}

export type FindResult = {
  memories?: FindResultItem[]
  resources?: FindResultItem[]
  skills?: FindResultItem[]
  total?: number
}

export type CommitSessionResult = {
  session_id: string
  status: string
  task_id?: string
  archive_uri?: string
  archived?: boolean
  memories_extracted?: Record<string, number>
  error?: string
  trace_id?: string
}

export type AddResourceInput = {
  pathOrUrl: string
  to?: string
  parent?: string
  reason?: string
  instruction?: string
  wait?: boolean
  timeout?: number
}

export type AddResourceResult = {
  status?: string
  root_uri?: string
  temp_uri?: string
  source_path?: string
  warnings?: string[]
  errors?: string[]
}

const DEFAULT_BASE_URL = "http://127.0.0.1:1933"
const DEFAULT_TIMEOUT_MS = 15000

export class OpenVikingClient {
  private baseUrl: string
  private apiKey: string
  private timeoutMs: number
  private accountId: string
  private userId: string
  private agentId: string

  constructor(options: {
    baseUrl?: string
    apiKey?: string
    timeoutMs?: number
    accountId?: string
    userId?: string
    agentId?: string
  } = {}) {
    this.baseUrl = options.baseUrl || DEFAULT_BASE_URL
    this.apiKey = options.apiKey || ""
    this.timeoutMs = options.timeoutMs || DEFAULT_TIMEOUT_MS
    this.accountId = options.accountId || ""
    this.userId = options.userId || ""
    this.agentId = options.agentId || "main"
  }

  private async request<T>(
    path: string,
    init: RequestInit = {},
    agentId?: string
  ): Promise<T> {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), this.timeoutMs)

    try {
      const headers = new Headers(init.headers || {})
      if (this.apiKey) {
        headers.set("X-API-Key", this.apiKey)
      }
      if (this.accountId) {
        headers.set("X-OpenViking-Account", this.accountId)
      }
      if (this.userId) {
        headers.set("X-OpenViking-User", this.userId)
      }
      const effectiveAgentId = agentId || this.agentId
      if (effectiveAgentId) {
        headers.set("X-OpenViking-Agent", effectiveAgentId)
      }
      if (init.body && !(init.body instanceof FormData) && !headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json")
      }

      const response = await fetch(`${this.baseUrl}${path}`, {
        ...init,
        headers,
        signal: controller.signal,
      })

      const payload = (await response.json().catch(() => ({}))) as {
        status?: string
        result?: T
        error?: { code?: string; message?: string }
      }

      if (!response.ok || payload.status === "error") {
        const code = payload.error?.code ? ` [${payload.error.code}]` : ""
        const message = payload.error?.message || `HTTP ${response.status}`
        throw new Error(`OpenViking request failed${code}: ${message}`)
      }

      return (payload.result || payload) as T
    } finally {
      clearTimeout(timeoutId)
    }
  }

  async healthCheck(): Promise<{ status: string }> {
    return this.request<{ status: string }>("/health")
  }

  async find(
    query: string,
    options: {
      targetUri?: string
      limit?: number
      scoreThreshold?: number
    } = {},
    agentId?: string
  ): Promise<FindResult> {
    const body = {
      query,
      target_uri: options.targetUri || "viking://user/memories",
      limit: options.limit || 10,
      score_threshold: options.scoreThreshold,
    }
    return this.request<FindResult>("/api/v1/search/find", {
      method: "POST",
      body: JSON.stringify(body),
    }, agentId)
  }

  async read(uri: string, agentId?: string): Promise<string> {
    return this.request<string>(
      `/api/v1/content/read?uri=${encodeURIComponent(uri)}`,
      {},
      agentId
    )
  }

  async addResource(input: AddResourceInput, agentId?: string): Promise<AddResourceResult> {
    const body: Record<string, unknown> = {
      path: input.pathOrUrl,
      to: input.to,
      parent: input.parent,
      reason: input.reason || "",
      instruction: input.instruction || "",
      wait: input.wait || false,
      timeout: input.timeout,
    }
    return this.request<AddResourceResult>(
      "/api/v1/resources",
      { method: "POST", body: JSON.stringify(body) },
      agentId
    )
  }

  async addSessionMessage(
    sessionId: string,
    role: string,
    text: string,
    agentId?: string
  ): Promise<void> {
    const body = {
      role,
      parts: [{ type: "text" as const, text }],
    }
    await this.request<{ session_id: string }>(
      `/api/v1/sessions/${encodeURIComponent(sessionId)}/messages`,
      {
        method: "POST",
        body: JSON.stringify(body),
      },
      agentId
    )
  }

  async commitSession(
    sessionId: string,
    options: { wait?: boolean; timeoutMs?: number } = {},
    agentId?: string
  ): Promise<CommitSessionResult> {
    return this.request<CommitSessionResult>(
      `/api/v1/sessions/${encodeURIComponent(sessionId)}/commit`,
      {
        method: "POST",
        body: JSON.stringify({}),
      },
      agentId
    )
  }

  async deleteUri(uri: string, agentId?: string): Promise<void> {
    await this.request(
      `/api/v1/fs?uri=${encodeURIComponent(uri)}&recursive=false`,
      {
        method: "DELETE",
      },
      agentId
    )
  }
}
