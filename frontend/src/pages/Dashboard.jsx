import { useApi } from "../hooks/useApi";
import { api } from "../services/api";
import { ErrorBox, Loading, StatusBadge, PriorityBadge } from "../components/UI";
import { ListTodo, Clock3, PlayCircle, CheckCircle2, AlertTriangle, UserCheck } from "lucide-react";
import { Link } from "react-router-dom";

const cards = [
  ["total_tasks","Total Tasks",ListTodo,"bg-slate-100"],["pending_tasks","Pending Tasks",Clock3,"bg-amber-50"],
  ["in_progress_tasks","In Progress",PlayCircle,"bg-blue-50"],["completed_tasks","Completed",CheckCircle2,"bg-emerald-50"],
  ["overdue_tasks","Overdue",AlertTriangle,"bg-red-50"],["current_user_tasks","My Tasks",UserCheck,"bg-violet-50"]
];

export default function Dashboard() {
  const {data,loading,error} = useApi(api.dashboard, []);
  if(loading) return <Loading/>; if(error) return <ErrorBox message={error}/>;
  return <div className="space-y-6">
    <div><h1 className="text-2xl font-bold text-slate-900">Dashboard</h1><p className="mt-1 text-sm text-slate-500">A quick overview of the team's work.</p></div>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{cards.map(([key,label,Icon,bg])=><div key={key} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><div><p className="text-sm text-slate-500">{label}</p><p className="mt-2 text-3xl font-bold text-slate-900">{data[key]}</p></div><div className={`rounded-xl p-3 ${bg}`}><Icon size={22}/></div></div></div>)}</div>
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm"><div className="border-b border-slate-100 p-5"><h2 className="font-bold">My Tasks</h2></div><div className="divide-y divide-slate-100">{data.my_tasks.map(t=><Link to={`/tasks/${t.id}`} key={t.id} className="flex flex-col gap-2 p-5 hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-semibold">{t.title}</p><p className="text-xs text-slate-500">Due {new Date(t.due_date).toLocaleDateString()}</p></div><div className="flex gap-2"><PriorityBadge value={t.priority}/><StatusBadge value={t.status}/></div></Link>)}{!data.my_tasks.length && <p className="p-8 text-center text-sm text-slate-500">No tasks assigned to you.</p>}</div></section>
  </div>;
}
