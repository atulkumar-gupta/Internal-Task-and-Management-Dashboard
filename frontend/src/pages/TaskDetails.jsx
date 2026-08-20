import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../services/api";
import { Button, ErrorBox, Loading, PriorityBadge, Select, StatusBadge, Textarea } from "../components/UI";
import { ArrowLeft } from "lucide-react";

export default function TaskDetails(){
  const {id}=useParams(), nav=useNavigate(); const [task,setTask]=useState(null),[users,setUsers]=useState([]),[comment,setComment]=useState(""),[error,setError]=useState("");
  const load=()=>api.task(id).then(setTask).catch(e=>setError(e.message));
  useEffect(()=>{load();api.users().then(setUsers).catch(()=>{});},[id]);
  if(error&&!task)return <ErrorBox message={error}/>; if(!task)return <Loading/>;
  const change=async(k,v)=>{try{await api.updateTask(id,{[k]:v});load()}catch(e){setError(e.message)}};
  const add=async e=>{e.preventDefault();if(!comment.trim())return;try{await api.addComment(id,{user_id:1,comment});setComment("");load()}catch(e){setError(e.message)}};
  return <div className="mx-auto max-w-5xl space-y-5">
    <button onClick={()=>nav("/tasks")} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900"><ArrowLeft size={16}/>Back to tasks</button>
    {error&&<ErrorBox message={error}/>}
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div><h1 className="text-2xl font-bold">{task.title}</h1><p className="mt-2 text-sm text-slate-500">Created {new Date(task.created_at).toLocaleString()} · Updated {new Date(task.updated_at).toLocaleString()}</p></div><div className="flex gap-2"><PriorityBadge value={task.priority}/><StatusBadge value={task.status}/></div></div>
      <div className="mt-7 grid gap-6 md:grid-cols-2"><div><h3 className="mb-2 text-xs font-semibold uppercase text-slate-500">Description</h3><p className="whitespace-pre-wrap text-sm leading-6 text-slate-700">{task.description||"No description provided."}</p></div><div className="space-y-4"><Select label="Status" value={task.status} onChange={e=>change("status",e.target.value)}><option value="pending">Pending</option><option value="in_progress">In Progress</option><option value="completed">Completed</option><option value="blocked">Blocked</option></Select><Select label="Assigned user" value={task.assigned_to} onChange={e=>change("assigned_to",Number(e.target.value))}>{users.map(u=><option key={u.id} value={u.id}>{u.name}</option>)}</Select><p className="text-sm"><span className="font-semibold">Due date:</span> {new Date(task.due_date).toLocaleDateString()}</p></div></div>
    </div>
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm"><div className="border-b border-slate-100 p-5"><h2 className="font-bold">Comments / Notes</h2></div><div className="divide-y divide-slate-100">{task.comments.map(c=><div key={c.id} className="p-5"><p className="text-sm">{c.comment}</p><p className="mt-2 text-xs text-slate-400">{c.user_name} · {new Date(c.created_at).toLocaleString()}</p></div>)}{!task.comments.length&&<p className="p-6 text-sm text-slate-500">No comments yet.</p>}<form onSubmit={add} className="space-y-3 p-5"><Textarea value={comment} onChange={e=>setComment(e.target.value)} placeholder="Add a note or comment..."/><div className="flex justify-end"><Button>Add comment</Button></div></form></div></div>
  </div>;
}
