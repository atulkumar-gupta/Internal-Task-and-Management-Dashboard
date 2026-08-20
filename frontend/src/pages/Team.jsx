import { useApi } from "../hooks/useApi";
import { api } from "../services/api";
import { Button, ErrorBox, Loading } from "../components/UI";
import { Mail, UserPlus } from "lucide-react";

export default function Team(){
  const {data,loading,error}=useApi(api.users,[]);
  if(loading)return <Loading/>; if(error)return <ErrorBox message={error}/>;
  return <div className="space-y-5"><div className="flex items-center justify-between"><div><h1 className="text-2xl font-bold">Team</h1><p className="text-sm text-slate-500">Team members available for task assignment.</p></div><Button variant="secondary"><UserPlus size={16} className="mr-2 inline"/>Team members</Button></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{data.map(u=><div key={u.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center gap-4"><div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 font-bold text-blue-700">{u.name.split(" ").map(x=>x[0]).join("").slice(0,2)}</div><div><h2 className="font-semibold">{u.name}</h2><p className="text-xs capitalize text-slate-500">{u.role}</p></div></div><div className="mt-5 flex items-center gap-2 text-sm text-slate-500"><Mail size={15}/>{u.email}</div></div>)}</div></div>;
}
