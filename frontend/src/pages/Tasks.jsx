
// import { useEffect, useState } from "react";

// import {
//   Button,
//   Empty,
//   ErrorBox,
//   Loading,
//   Modal,
//   PriorityBadge,
//   Select,
//   StatusBadge,
// } from "../components/UI";

// import TaskForm from "../components/TaskForm";

// import { api } from "../services/api";

// import { Link } from "react-router-dom";

// import {
//   Plus,
//   Search,
//   Pencil,
//   Trash2,
// } from "lucide-react";


// export default function Tasks() {

//   // -------------------------------------------------------
//   // STATE
//   // -------------------------------------------------------

//   const [users, setUsers] = useState([]);

//   const [data, setData] = useState({
//     items: [],
//     total: 0,
//     page: 1,
//     limit: 10,
//     pages: 1,
//     has_previous: false,
//     has_next: false,
//   });

//   const [loading, setLoading] =
//     useState(true);

//   const [error, setError] =
//     useState("");

//   const [modal, setModal] =
//     useState(null);

//   const [filters, setFilters] =
//     useState({
//       search: "",
//       status: "",
//       priority: "",
//       assignee: "",
//       sort: "due_date",
//       order: "asc",
//       page: 1,
//       limit: 10,
//     });


//   // -------------------------------------------------------
//   // LOAD USERS
//   // -------------------------------------------------------

//   useEffect(() => {

//     api.users()
//       .then((result) => {

//         setUsers(
//           Array.isArray(result)
//             ? result
//             : result.items || []
//         );

//       })
//       .catch((error) => {

//         setError(
//           error.message
//         );

//       });

//   }, []);


//   // -------------------------------------------------------
//   // LOAD TASKS
//   // -------------------------------------------------------

//   const loadTasks = async () => {

//     setLoading(true);
//     setError("");

//     try {

//       const result =
//         await api.tasks(filters);

//       setData({
//         items: result.items || [],
//         total: result.total || 0,
//         page: result.page || 1,
//         limit: result.limit || 10,
//         pages: result.pages || 1,
//         has_previous:
//           result.has_previous ||
//           false,
//         has_next:
//           result.has_next ||
//           false,
//       });

//     } catch (error) {

//       setError(
//         error.message
//       );

//       setData({
//         items: [],
//         total: 0,
//         page: 1,
//         limit: 10,
//         pages: 1,
//         has_previous: false,
//         has_next: false,
//       });

//     } finally {

//       setLoading(false);

//     }
//   };


//   // -------------------------------------------------------
//   // LOAD WHEN FILTER CHANGES
//   // -------------------------------------------------------

//   useEffect(() => {

//     loadTasks();

//   }, [
//     filters.search,
//     filters.status,
//     filters.priority,
//     filters.assignee,
//     filters.sort,
//     filters.order,
//     filters.page,
//     filters.limit,
//   ]);


//   // -------------------------------------------------------
//   // UPDATE FILTER
//   // -------------------------------------------------------

//   const updateFilter = (
//     key,
//     value
//   ) => {

//     setFilters((previous) => ({
//       ...previous,

//       [key]: value,

//       // Any new filter starts
//       // from page 1
//       ...(key !== "page"
//         ? { page: 1 }
//         : {}),
//     }));

//   };


//   // -------------------------------------------------------
//   // SEARCH
//   // -------------------------------------------------------

//   const handleSearch = (event) => {

//     updateFilter(
//       "search",
//       event.target.value
//     );

//   };


//   // -------------------------------------------------------
//   // DELETE
//   // -------------------------------------------------------

//   const removeTask = async (id) => {

//     const confirmed =
//       window.confirm(
//         "Delete this task? This action cannot be undone."
//       );

//     if (!confirmed) {
//       return;
//     }

//     try {

//       await api.deleteTask(id);

//       await loadTasks();

//     } catch (error) {

//       alert(
//         error.message
//       );

//     }

//   };


//   // -------------------------------------------------------
//   // SAVE TASK
//   // -------------------------------------------------------

//   const saveTask = async (body) => {

//     try {

//       if (modal?.task) {

//         await api.updateTask(
//           modal.task.id,
//           body
//         );

//       } else {

//         await api.createTask(
//           body
//         );

//       }

//       setModal(null);

//       await loadTasks();

//     } catch (error) {

//       alert(
//         error.message
//       );

//     }

//   };


//   // -------------------------------------------------------
//   // PREVIOUS PAGE
//   // -------------------------------------------------------

//   const goPrevious = () => {

//     if (
//       data.page <= 1
//     ) {
//       return;
//     }

//     setFilters(
//       (previous) => ({
//         ...previous,
//         page:
//           previous.page - 1,
//       })
//     );

//   };


//   // -------------------------------------------------------
//   // NEXT PAGE
//   // -------------------------------------------------------

//   const goNext = () => {

//     if (
//       data.page >= data.pages
//     ) {
//       return;
//     }

//     setFilters(
//       (previous) => ({
//         ...previous,
//         page:
//           previous.page + 1,
//       })
//     );

//   };


//   // -------------------------------------------------------
//   // SORT
//   // -------------------------------------------------------

//   const changeSort = (
//     event
//   ) => {

//     const value =
//       event.target.value;

//     updateFilter(
//       "sort",
//       value
//     );

//   };


//   // -------------------------------------------------------
//   // RESET FILTERS
//   // -------------------------------------------------------

//   const clearFilters = () => {

//     setFilters({
//       search: "",
//       status: "",
//       priority: "",
//       assignee: "",
//       sort: "due_date",
//       order: "asc",
//       page: 1,
//       limit: 5,
//     });

//   };


//   // -------------------------------------------------------
//   // UI
//   // -------------------------------------------------------

//   return (
//     <div className="space-y-5">


//       {/* ---------------------------------------------------
//           HEADER
//       --------------------------------------------------- */}

//       <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

//         <div>

//           <h1 className="text-2xl font-bold">
//             Tasks
//           </h1>

//           <p className="text-sm text-slate-500">
//             Create, assign and track team tasks.
//           </p>

//         </div>


//         <Button
//           onClick={() =>
//             setModal({
//               task: null,
//             })
//           }
//         >

//           <Plus
//             size={16}
//             className="mr-2 inline"
//           />

//           New task

//         </Button>

//       </div>


//       {/* ---------------------------------------------------
//           FILTERS
//       --------------------------------------------------- */}

//       <div className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 md:grid-cols-2 xl:grid-cols-6">


//         {/* SEARCH */}

//         <div className="relative xl:col-span-2">

//           <Search
//             className="absolute left-3 top-3 text-slate-400"
//             size={17}
//           />

//           <input
//             type="text"
//             value={filters.search}
//             onChange={handleSearch}
//             placeholder="Search tasks..."
//             className="w-full rounded-lg border border-slate-200 py-2.5 pl-9 pr-3 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
//           />

//         </div>


//         {/* STATUS */}

//         <Select
//           value={filters.status}
//           onChange={(event) =>
//             updateFilter(
//               "status",
//               event.target.value
//             )
//           }
//         >

//           <option value="">
//             All status
//           </option>

//           <option value="pending">
//             Pending
//           </option>

//           <option value="in_progress">
//             In Progress
//           </option>

//           <option value="completed">
//             Completed
//           </option>

//           <option value="blocked">
//             Blocked
//           </option>

//         </Select>


//         {/* PRIORITY */}

//         <Select
//           value={filters.priority}
//           onChange={(event) =>
//             updateFilter(
//               "priority",
//               event.target.value
//             )
//           }
//         >

//           <option value="">
//             All priority
//           </option>

//           <option value="low">
//             Low
//           </option>

//           <option value="medium">
//             Medium
//           </option>

//           <option value="high">
//             High
//           </option>

//           <option value="urgent">
//             Urgent
//           </option>

//         </Select>


//         {/* ASSIGNEE */}

//         <Select
//           value={filters.assignee}
//           onChange={(event) =>
//             updateFilter(
//               "assignee",
//               event.target.value
//             )
//           }
//         >

//           <option value="">
//             All assignees
//           </option>

//           {users.map(
//             (user) => (
//               <option
//                 key={user.id}
//                 value={user.id}
//               >
//                 {user.name}
//               </option>
//             )
//           )}

//         </Select>


//         {/* SORT */}

//         <Select
//           value={filters.sort}
//           onChange={changeSort}
//         >

//           <option value="due_date">
//             Due date
//           </option>

//           <option value="created_at">
//             Created date
//           </option>

//           <option value="updated_at">
//             Updated date
//           </option>

//           <option value="title">
//             Title
//           </option>

//         </Select>

//       </div>


//       {/* ---------------------------------------------------
//           CLEAR FILTERS
//       --------------------------------------------------- */}

//       {(filters.search ||
//         filters.status ||
//         filters.priority ||
//         filters.assignee) && (

//         <div>

//           <button
//             type="button"
//             onClick={clearFilters}
//             className="text-sm font-medium text-blue-600 hover:text-blue-800"
//           >
//             Clear all filters
//           </button>

//         </div>

//       )}


//       {/* ---------------------------------------------------
//           ERROR
//       --------------------------------------------------- */}

//       {error && (
//         <ErrorBox
//           message={error}
//         />
//       )}


//       {/* ---------------------------------------------------
//           TABLE
//       --------------------------------------------------- */}

//       <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">


//         {loading ? (

//           <Loading />

//         ) : data.items.length > 0 ? (

//           <div className="overflow-x-auto">

//             <table className="w-full min-w-[900px] text-left text-sm">

//               <thead className="bg-slate-50 text-xs uppercase text-slate-500">

//                 <tr>

//                   <th className="px-5 py-3">
//                     Task
//                   </th>

//                   <th>
//                     Assignee
//                   </th>

//                   <th>
//                     Priority
//                   </th>

//                   <th>
//                     Status
//                   </th>

//                   <th>
//                     Due date
//                   </th>

//                   <th>
//                     Created
//                   </th>

//                   <th>
//                     Actions
//                   </th>

//                 </tr>

//               </thead>


//               <tbody className="divide-y divide-slate-100">

//                 {data.items.map(
//                   (task) => (

//                     <tr
//                       key={task.id}
//                       className="hover:bg-slate-50"
//                     >

//                       {/* TASK */}

//                       <td className="px-5 py-4">

//                         <Link
//                           className="font-semibold hover:text-blue-600"
//                           to={`/tasks/${task.id}`}
//                         >
//                           {task.title}
//                         </Link>

//                         <p className="mt-1 max-w-xs truncate text-xs text-slate-500">
//                           {task.description}
//                         </p>

//                       </td>


//                       {/* ASSIGNEE */}

//                       <td>
//                         {task.assignee_name ||
//                           "Unassigned"}
//                       </td>


//                       {/* PRIORITY */}

//                       <td>

//                         <PriorityBadge
//                           value={
//                             task.priority
//                           }
//                         />

//                       </td>


//                       {/* STATUS */}

//                       <td>

//                         <StatusBadge
//                           value={
//                             task.status
//                           }
//                         />

//                       </td>


//                       {/* DUE DATE */}

//                       <td>

//                         {task.due_date
//                           ? new Date(
//                               task.due_date
//                             ).toLocaleDateString()
//                           : "-"}

//                       </td>


//                       {/* CREATED */}

//                       <td>

//                         {task.created_at
//                           ? new Date(
//                               task.created_at
//                             ).toLocaleDateString()
//                           : "-"}

//                       </td>


//                       {/* ACTIONS */}

//                       <td>

//                         <div className="flex gap-1">

//                           <button
//                             type="button"
//                             className="rounded p-2 hover:bg-slate-100"
//                             onClick={() =>
//                               setModal({
//                                 task,
//                               })
//                             }
//                           >

//                             <Pencil
//                               size={16}
//                             />

//                           </button>


//                           <button
//                             type="button"
//                             className="rounded p-2 text-red-600 hover:bg-red-50"
//                             onClick={() =>
//                               removeTask(
//                                 task.id
//                               )
//                             }
//                           >

//                             <Trash2
//                               size={16}
//                             />

//                           </button>

//                         </div>

//                       </td>

//                     </tr>

//                   )
//                 )}

//               </tbody>

//             </table>

//           </div>

//         ) : (

//           <Empty />

//         )}


//         {/* -------------------------------------------------
//             PAGINATION
//         ------------------------------------------------- */}

//         <div className="flex flex-col gap-3 border-t border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between">

//           <span className="text-sm text-slate-500">

//             Page{" "}

//             <span className="font-medium text-slate-700">
//               {data.page}
//             </span>

//             {" "}of{" "}

//             <span className="font-medium text-slate-700">
//               {data.pages}
//             </span>

//             {" "}·{" "}

//             <span className="font-medium text-slate-700">
//               {data.total}
//             </span>

//             {" "}
//             {data.total === 1
//               ? "task"
//               : "tasks"}

//           </span>


//           <div className="flex gap-2">


//             {/* PREVIOUS */}

//             <button
//               type="button"
//               onClick={goPrevious}
//               disabled={
//                 loading ||
//                 data.page <= 1
//               }
//               className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
//                 loading ||
//                 data.page <= 1
//                   ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400"
//                   : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
//               }`}
//             >
//               Previous
//             </button>


//             {/* NEXT */}

//             <button
//               type="button"
//               onClick={goNext}
//               disabled={
//                 loading ||
//                 data.page >= data.pages
//               }
//               className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
//                 loading ||
//                 data.page >= data.pages
//                   ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400"
//                   : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
//               }`}
//             >
//               Next
//             </button>

//           </div>

//         </div>

//       </div>


//       {/* ---------------------------------------------------
//           TASK MODAL
//       --------------------------------------------------- */}

//       {modal && (

//         <Modal
//           title={
//             modal.task
//               ? "Edit task"
//               : "Create task"
//           }
//           onClose={() =>
//             setModal(null)
//           }
//         >

//           <TaskForm
//             task={modal.task}
//             users={users}
//             onSave={saveTask}
//             onCancel={() =>
//               setModal(null)
//             }
//           />

//         </Modal>

//       )}

//     </div>
//   );
// }
import { useEffect, useState } from "react";

import {
  Button,
  Empty,
  ErrorBox,
  Loading,
  Modal,
  PriorityBadge,
  Select,
  StatusBadge,
} from "../components/UI";

import TaskForm from "../components/TaskForm";
import { api } from "../services/api";
import { Link } from "react-router-dom";

import {
  Plus,
  Search,
  Pencil,
  Trash2,
} from "lucide-react";

export default function Tasks() {
  const [users, setUsers] = useState([]);

  const [data, setData] = useState({
    items: [],
    total: 0,
    page: 1,
    limit: 5,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modal, setModal] = useState(null);

  // IMPORTANT: 5 tasks per page
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    priority: "",
    assignee: "",
    sort: "due_date",
    order: "asc",
    page: 1,
    limit: 5,
  });

  // -----------------------------------------
  // LOAD USERS
  // -----------------------------------------

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const result = await api.users();

        setUsers(
          Array.isArray(result)
            ? result
            : result?.items || []
        );
      } catch (error) {
        setError(error.message);
      }
    };

    loadUsers();
  }, []);

  // -----------------------------------------
  // LOAD TASKS
  // -----------------------------------------

  useEffect(() => {
    let cancelled = false;

    const loadTasks = async () => {
      setLoading(true);
      setError("");

      try {
        const result = await api.tasks(filters);

        if (cancelled) return;

        setData({
          items: result?.items || [],
          total: Number(result?.total || 0),
          page: Number(result?.page || filters.page),
          limit: Number(result?.limit || filters.limit),
        });
      } catch (error) {
        if (cancelled) return;

        setError(error.message);

        setData({
          items: [],
          total: 0,
          page: 1,
          limit: filters.limit,
        });
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadTasks();

    return () => {
      cancelled = true;
    };
  }, [
    filters.search,
    filters.status,
    filters.priority,
    filters.assignee,
    filters.sort,
    filters.order,
    filters.page,
    filters.limit,
  ]);

  // -----------------------------------------
  // PAGINATION
  // -----------------------------------------

  const totalPages = Math.max(
    1,
    Math.ceil(data.total / filters.limit)
  );

  const currentPage = filters.page;

  const goPrevious = () => {
    if (currentPage <= 1) {
      return;
    }

    setFilters((previous) => ({
      ...previous,
      page: previous.page - 1,
    }));
  };

  const goNext = () => {
    if (currentPage >= totalPages) {
      return;
    }

    setFilters((previous) => ({
      ...previous,
      page: previous.page + 1,
    }));
  };

  // -----------------------------------------
  // FILTER UPDATE
  // -----------------------------------------

  const updateFilter = (key, value) => {
    setFilters((previous) => ({
      ...previous,
      [key]: value,
      page: key === "page" ? value : 1,
    }));
  };

  // -----------------------------------------
  // DELETE TASK
  // -----------------------------------------

  const removeTask = async (id) => {
    const confirmed = window.confirm(
      "Delete this task? This action cannot be undone."
    );

    if (!confirmed) {
      return;
    }

    try {
      await api.deleteTask(id);

      // Reload current page.
      // If last item on page was deleted,
      // automatically move to previous page.
      const newTotal = Math.max(0, data.total - 1);
      const newTotalPages = Math.max(
        1,
        Math.ceil(newTotal / filters.limit)
      );

      setFilters((previous) => ({
        ...previous,
        page: Math.min(previous.page, newTotalPages),
      }));
    } catch (error) {
      alert(error.message);
    }
  };

  // -----------------------------------------
  // SAVE TASK
  // -----------------------------------------

  const saveTask = async (body) => {
    try {
      if (modal?.task) {
        await api.updateTask(
          modal.task.id,
          body
        );
      } else {
        await api.createTask(body);
      }

      setModal(null);

      // After creating a task go to page 1
      setFilters((previous) => ({
        ...previous,
        page: 1,
      }));
    } catch (error) {
      alert(error.message);
    }
  };

  // -----------------------------------------
  // CLEAR FILTERS
  // -----------------------------------------

  const clearFilters = () => {
    setFilters({
      search: "",
      status: "",
      priority: "",
      assignee: "",
      sort: "due_date",
      order: "asc",
      page: 1,
      limit: 5,
    });
  };

  // -----------------------------------------
  // UI
  // -----------------------------------------

  return (
    <div className="space-y-5">

      {/* HEADER */}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-bold">
            Tasks
          </h1>

          <p className="text-sm text-slate-500">
            Create, assign and track team tasks.
          </p>
        </div>

        <Button
          onClick={() =>
            setModal({
              task: null,
            })
          }
        >
          <Plus
            size={16}
            className="mr-2 inline"
          />

          New task
        </Button>

      </div>

      {/* FILTERS */}

      <div className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 md:grid-cols-2 xl:grid-cols-6">

        {/* SEARCH */}

        <div className="relative xl:col-span-2">

          <Search
            className="absolute left-3 top-3 text-slate-400"
            size={17}
          />

          <input
            type="text"
            value={filters.search}
            onChange={(event) =>
              updateFilter(
                "search",
                event.target.value
              )
            }
            placeholder="Search tasks..."
            className="w-full rounded-lg border border-slate-200 py-2.5 pl-9 pr-3 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />

        </div>

        {/* STATUS */}

        <Select
          value={filters.status}
          onChange={(event) =>
            updateFilter(
              "status",
              event.target.value
            )
          }
        >
          <option value="">
            All status
          </option>

          <option value="pending">
            Pending
          </option>

          <option value="in_progress">
            In Progress
          </option>

          <option value="completed">
            Completed
          </option>

          <option value="blocked">
            Blocked
          </option>
        </Select>

        {/* PRIORITY */}

        <Select
          value={filters.priority}
          onChange={(event) =>
            updateFilter(
              "priority",
              event.target.value
            )
          }
        >
          <option value="">
            All priority
          </option>

          <option value="low">
            Low
          </option>

          <option value="medium">
            Medium
          </option>

          <option value="high">
            High
          </option>

          <option value="urgent">
            Urgent
          </option>
        </Select>

        {/* ASSIGNEE */}

        <Select
          value={filters.assignee}
          onChange={(event) =>
            updateFilter(
              "assignee",
              event.target.value
            )
          }
        >
          <option value="">
            All assignees
          </option>

          {users.map((user) => (
            <option
              key={user.id}
              value={user.id}
            >
              {user.name}
            </option>
          ))}
        </Select>

        {/* SORT */}

        <Select
          value={filters.sort}
          onChange={(event) =>
            updateFilter(
              "sort",
              event.target.value
            )
          }
        >
          <option value="due_date">
            Due date
          </option>

          <option value="created_at">
            Created date
          </option>

          <option value="updated_at">
            Updated date
          </option>

          <option value="title">
            Title
          </option>
        </Select>

      </div>

      {/* CLEAR */}

      {(filters.search ||
        filters.status ||
        filters.priority ||
        filters.assignee) && (
        <div>
          <button
            type="button"
            onClick={clearFilters}
            className="text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* ERROR */}

      {error && (
        <ErrorBox message={error} />
      )}

      {/* TABLE */}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

        {loading ? (
          <Loading />
        ) : data.items.length > 0 ? (

          <div className="overflow-x-auto">

            <table className="w-full min-w-[900px] text-left text-sm">

              <thead className="bg-slate-50 text-xs uppercase text-slate-500">

                <tr>
                  <th className="px-5 py-3">
                    Task
                  </th>

                  <th>
                    Assignee
                  </th>

                  <th>
                    Priority
                  </th>

                  <th>
                    Status
                  </th>

                  <th>
                    Due date
                  </th>

                  <th>
                    Created
                  </th>

                  <th>
                    Actions
                  </th>
                </tr>

              </thead>

              <tbody className="divide-y divide-slate-100">

                {data.items.map((task) => (

                  <tr
                    key={task.id}
                    className="hover:bg-slate-50"
                  >

                    <td className="px-5 py-4">

                      <Link
                        className="font-semibold hover:text-blue-600"
                        to={`/tasks/${task.id}`}
                      >
                        {task.title}
                      </Link>

                      <p className="mt-1 max-w-xs truncate text-xs text-slate-500">
                        {task.description}
                      </p>

                    </td>

                    <td>
                      {task.assignee_name ||
                        "Unassigned"}
                    </td>

                    <td>
                      <PriorityBadge
                        value={task.priority}
                      />
                    </td>

                    <td>
                      <StatusBadge
                        value={task.status}
                      />
                    </td>

                    <td>
                      {task.due_date
                        ? new Date(
                            task.due_date
                          ).toLocaleDateString()
                        : "-"}
                    </td>

                    <td>
                      {task.created_at
                        ? new Date(
                            task.created_at
                          ).toLocaleDateString()
                        : "-"}
                    </td>

                    <td>

                      <div className="flex gap-1">

                        <button
                          type="button"
                          className="rounded p-2 hover:bg-slate-100"
                          onClick={() =>
                            setModal({
                              task,
                            })
                          }
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          type="button"
                          className="rounded p-2 text-red-600 hover:bg-red-50"
                          onClick={() =>
                            removeTask(task.id)
                          }
                        >
                          <Trash2 size={16} />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        ) : (

          <Empty />

        )}

        {/* PAGINATION */}

        <div className="flex flex-col gap-3 border-t border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between">

          <span className="text-sm text-slate-500">

            Page{" "}

            <span className="font-medium text-slate-700">
              {currentPage}
            </span>

            {" "}of{" "}

            <span className="font-medium text-slate-700">
              {totalPages}
            </span>

            {" "}·{" "}

            <span className="font-medium text-slate-700">
              {data.total}
            </span>

            {" "}

            {data.total === 1
              ? "task"
              : "tasks"}

          </span>

          <div className="flex gap-2">

            {/* PREVIOUS */}

            <button
              type="button"
              onClick={goPrevious}
              disabled={
                loading ||
                currentPage <= 1
              }
              className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                loading ||
                currentPage <= 1
                  ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              Previous
            </button>

            {/* NEXT */}

            <button
              type="button"
              onClick={goNext}
              disabled={
                loading ||
                currentPage >= totalPages
              }
              className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                loading ||
                currentPage >= totalPages
                  ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              Next
            </button>

          </div>

        </div>

      </div>

      {/* MODAL */}

      {modal && (

        <Modal
          title={
            modal.task
              ? "Edit task"
              : "Create task"
          }
          onClose={() =>
            setModal(null)
          }
        >

          <TaskForm
            task={modal.task}
            users={users}
            onSave={saveTask}
            onCancel={() =>
              setModal(null)
            }
          />

        </Modal>

      )}

    </div>
  );
}