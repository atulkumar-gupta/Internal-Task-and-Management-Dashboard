import { Loader2, X } from "lucide-react";

export function Button({ children, variant="primary", className="", ...props }) {
  const styles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50",
    danger: "bg-red-600 text-white hover:bg-red-700",
    ghost: "text-slate-600 hover:bg-slate-100"
  };
  return <button className={`rounded-lg px-4 py-2 text-sm font-medium transition ${styles[variant]} ${className}`} {...props}>{children}</button>;
}
export function Input({ label, ...props }) {
  return <label className="block text-sm font-medium text-slate-700">{label && <span className="mb-1.5 block">{label}</span>}<input className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" {...props}/></label>;
}
export function Select({ label, children, ...props }) {
  return <label className="block text-sm font-medium text-slate-700">{label && <span className="mb-1.5 block">{label}</span>}<select className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 outline-none focus:border-blue-500" {...props}>{children}</select></label>;
}
export function Textarea({ label, ...props }) {
  return <label className="block text-sm font-medium text-slate-700">{label && <span className="mb-1.5 block">{label}</span>}<textarea className="min-h-28 w-full resize-y rounded-lg border border-slate-200 bg-white px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" {...props}/></label>;
}
export function StatusBadge({ value }) {
  const map = { pending:"bg-amber-50 text-amber-700", in_progress:"bg-blue-50 text-blue-700", completed:"bg-emerald-50 text-emerald-700", blocked:"bg-red-50 text-red-700" };
  return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${map[value] || "bg-slate-100 text-slate-600"}`}>{value.replace("_"," ")}</span>;
}
export function PriorityBadge({ value }) {
  const map = { low:"bg-slate-100 text-slate-600", medium:"bg-blue-50 text-blue-700", high:"bg-orange-50 text-orange-700", urgent:"bg-red-50 text-red-700" };
  return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${map[value] || "bg-slate-100 text-slate-600"}`}>{value}</span>;
}
export function Modal({ title, children, onClose }) {
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
    <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
      <div className="flex items-center justify-between border-b border-slate-100 p-5"><h2 className="text-lg font-bold text-slate-900">{title}</h2><button onClick={onClose}><X/></button></div>
      <div className="p-5">{children}</div>
    </div>
  </div>;
}
export function Loading() { return <div className="flex items-center justify-center p-12 text-slate-500"><Loader2 className="mr-2 animate-spin"/>Loading...</div>; }
export function Empty({ text="No records found." }) { return <div className="p-12 text-center text-sm text-slate-500">{text}</div>; }
export function ErrorBox({ message }) { return <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700">{message}</div>; }
