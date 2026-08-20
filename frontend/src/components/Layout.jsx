import { NavLink, Outlet } from "react-router-dom";
import { LayoutDashboard, ListTodo, Users, Menu } from "lucide-react";
import { useState } from "react";

export default function Layout() {
  const [open, setOpen] = useState(false);
  const links = [
    ["/", "Dashboard", LayoutDashboard],
    ["/tasks", "Tasks", ListTodo],
    ["/team", "Team", Users]
  ];
  return <div className="min-h-screen bg-slate-50">
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-6">
        <div className="flex items-center gap-3"><button className="lg:hidden" onClick={()=>setOpen(!open)}><Menu/></button><div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 font-bold text-white">T</div><span className="font-bold text-slate-900">TaskFlow</span></div>
        <div className="flex items-center gap-3"><div className="hidden text-right sm:block"><p className="text-sm font-semibold">Alex Morgan</p><p className="text-xs text-slate-500">Administrator</p></div><div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-sm font-bold">AM</div></div>
      </div>
    </header>
    <div className="mx-auto flex max-w-7xl">
      <aside className={`${open ? "block" : "hidden"} absolute z-20 w-64 border-r border-slate-200 bg-white lg:static lg:block lg:min-h-[calc(100vh-61px)]`}>
        <nav className="space-y-1 p-4">{links.map(([to,label,Icon])=><NavLink key={to} to={to} end={to==="/"} onClick={()=>setOpen(false)} className={({isActive})=>`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${isActive?"bg-blue-50 text-blue-700":"text-slate-600 hover:bg-slate-50"}`}><Icon size={18}/>{label}</NavLink>)}</nav>
      </aside>
      <main className="min-w-0 flex-1 p-4 lg:p-6"><Outlet/></main>
    </div>
  </div>;
}
