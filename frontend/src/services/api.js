// const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

// async function request(path, options = {}) {
//   const controller = new AbortController();
//   const timer = setTimeout(() => controller.abort(), 10000);
//   try {
//     const res = await fetch(`${API_BASE}${path}`, {
//       ...options,
//       headers: { "Content-Type": "application/json", ...(options.headers || {}) },
//       signal: controller.signal
//     });
//     const data = await res.json().catch(() => ({}));
//     if (!res.ok) throw new Error(data.detail || "Request failed");
//     return data;
//   } catch (err) {
//     if (err.name === "AbortError") throw new Error("Request timed out");
//     throw err;
//   } finally {
//     clearTimeout(timer);
//   }
// }

// export const api = {
//   dashboard: () => request("/dashboard"),
//   users: () => request("/users"),
//   tasks: (params = {}) => request(`/tasks?${new URLSearchParams(params)}`),
//   task: (id) => request(`/tasks/${id}`),
//   createTask: (body) => request("/tasks", { method: "POST", body: JSON.stringify(body) }),
//   updateTask: (id, body) => request(`/tasks/${id}`, { method: "PUT", body: JSON.stringify(body) }),
//   deleteTask: (id) => request(`/tasks/${id}`, { method: "DELETE" }),
//   addComment: (id, body) => request(`/tasks/${id}/comments`, { method: "POST", body: JSON.stringify(body) }),
//   externalUsers: () => request("/external/users")
// };
const API_BASE =
  import.meta.env.VITE_API_URL ||
  "http://127.0.0.1:8000/api";


// ---------------------------------------------------------
// REQUEST HELPER
// ---------------------------------------------------------

async function request(path, options = {}) {
  const controller = new AbortController();

  const timer = setTimeout(() => {
    controller.abort();
  }, 10000);

  try {
    const response = await fetch(
      `${API_BASE}${path}`,
      {
        ...options,

        headers: {
          "Content-Type": "application/json",
          ...(options.headers || {}),
        },

        signal: controller.signal,
      }
    );

    const data = await response
      .json()
      .catch(() => ({}));

    if (!response.ok) {
      throw new Error(
        data.detail ||
        data.message ||
        `Request failed (${response.status})`
      );
    }

    return data;

  } catch (error) {

    if (error.name === "AbortError") {
      throw new Error(
        "Request timed out. Please check the backend server."
      );
    }

    throw error;

  } finally {
    clearTimeout(timer);
  }
}


// ---------------------------------------------------------
// TASK QUERY BUILDER
// ---------------------------------------------------------

function buildTaskQuery(params = {}) {

  const query = new URLSearchParams();

  if (params.search?.trim()) {
    query.set(
      "search",
      params.search.trim()
    );
  }

  if (params.status) {
    query.set(
      "status",
      params.status
    );
  }

  if (params.priority) {
    query.set(
      "priority",
      params.priority
    );
  }

  if (params.assignee) {
    query.set(
      "assignee",
      params.assignee
    );
  }

  query.set(
    "page",
    params.page || 1
  );

  query.set(
    "limit",
    params.limit || 10
  );

  query.set(
    "sort",
    params.sort || "due_date"
  );

  query.set(
    "order",
    params.order || "asc"
  );

  return query.toString();
}


// ---------------------------------------------------------
// API
// ---------------------------------------------------------

export const api = {

  // Dashboard
  dashboard: () =>
    request("/dashboard"),


  // Users
  users: () =>
    request("/users"),


  // Tasks
  tasks: (params = {}) => {

    const query = buildTaskQuery(
      params
    );

    return request(
      `/tasks?${query}`
    );
  },


  // Single task
  task: (id) =>
    request(
      `/tasks/${id}`
    ),


  // Create
  createTask: (body) =>
    request(
      "/tasks",
      {
        method: "POST",
        body: JSON.stringify(body),
      }
    ),


  // Update
  updateTask: (id, body) =>
    request(
      `/tasks/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(body),
      }
    ),


  // Delete
  deleteTask: (id) =>
    request(
      `/tasks/${id}`,
      {
        method: "DELETE",
      }
    ),


  // Comment
  addComment: (id, body) =>
    request(
      `/tasks/${id}/comments`,
      {
        method: "POST",
        body: JSON.stringify(body),
      }
    ),


  // External API
  externalUsers: () =>
    request(
      "/external/users"
    ),
};