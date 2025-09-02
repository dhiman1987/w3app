import { useState } from "react";
import TimelineView from "./views/timeline/TimelineView";
import './App.css';
import ManageEventsView from "./views/manageEvents/ManageEvents";



export default function App(){
  const [activeView, setActiveView] = useState<'timeline' | 'manage-events'>('timeline');
return (
  <>
    <button onClick={() => setActiveView('manage-events')}>Manage Events</button>
    <button onClick={() => setActiveView('timeline')}>Timeline</button>
    {activeView === 'timeline' && <TimelineView />}
    {activeView === 'manage-events' && <ManageEventsView />}
    

  </>
);
}
