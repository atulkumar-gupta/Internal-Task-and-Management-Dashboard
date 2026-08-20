import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import TaskDetails from "./pages/TaskDetails";
import Team from "./pages/Team";

export default function App(){
  return <BrowserRouter><Routes><Route element={<Layout/>}><Route path="/" element={<Dashboard/>}/><Route path="/tasks" element={<Tasks/>}/><Route path="/tasks/:id" element={<TaskDetails/>}/><Route path="/team" element={<Team/>}/></Route></Routes></BrowserRouter>;
}
