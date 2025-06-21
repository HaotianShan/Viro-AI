// src/services/agentService.ts
const API_BASE = "http://43.153.36.204:8000";

export const createSession = async (userId: string, sessionId: string) => {
  const response = await fetch(
    `${API_BASE}/apps/multi_tool_agent/users/${userId}/sessions/${sessionId}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    }
  );
  return response.json();
};

export const runAgent = async (
  userId: string,
  sessionId: string,
  message: string
) => {
  const payload = {
    appName: "multi_tool_agent",
    userId,
    sessionId,
    newMessage: {
      parts: [{ text: message }],
      role: "user",
    },
    streaming: false,
  };

  const response = await fetch(`${API_BASE}/run`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  // Extract just the text content from the response
  return data[0]?.content?.parts?.[0]?.text || "No response from agent";
};
