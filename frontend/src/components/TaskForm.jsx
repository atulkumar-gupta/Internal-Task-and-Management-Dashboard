import { useEffect, useState } from "react";
import { Button, Input, Select, Textarea } from "./UI";

const blank = { title:"", description:"", status:"pending", priority:"medium", assigned_to:"", due_date:"" };

export default function TaskForm({ task, users, onSave, onCancel }) {
  const [form, setForm] = useState(blank);
  useEffect(() => { setForm(task ? {...task, assigned_to: String(task.assigned_to || ""), due_date: task.due_date?.slice(0,10) || ""} : blank); }, [task]);
  const set = (k,v) => setForm(f=>({...f,[k]:v}));
  return <form className="space-y-4" onSubmit={e=>{e.preventDefault(); onSave({...form, assigned_to:Number(form.assigned_to)});}}>
    <Input label="Task name" required value={form.title} onChange={e=>set("title",e.target.value)} placeholder="e.g. Prepare monthly report"/>
    <Textarea label="Description" value={form.description} onChange={e=>set("description",e.target.value)} placeholder="Describe the task..."/>
    <div className="grid gap-4 sm:grid-cols-2">
      <Select label="Status" value={form.status} onChange={e=>set("status",e.target.value)}><option value="pending">Pending</option><option value="in_progress">In Progress</option><option value="completed">Completed</option><option value="blocked">Blocked</option></Select>
      <Select label="Priority" value={form.priority} onChange={e=>set("priority",e.target.value)}><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option><option value="urgent">Urgent</option></Select>
      <Select label="Assigned user" required value={form.assigned_to} onChange={e=>set("assigned_to",e.target.value)}><option value="">Select user</option>{users.map(u=><option key={u.id} value={u.id}>{u.name}</option>)}</Select>
      <Input label="Due date" type="date" value={form.due_date} onChange={e=>set("due_date",e.target.value)}/>
    </div>
    <div className="flex justify-end gap-2 pt-2"><Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button><Button type="submit">{task?"Save changes":"Create task"}</Button></div>
  </form>;
}
