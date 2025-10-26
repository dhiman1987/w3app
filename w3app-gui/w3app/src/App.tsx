
import TimelineView from "./views/timeline/TimelineView";
import './App.css';

import { makeServer } from './mock/mirage/server'

if (import.meta.env.MODE === 'development') {
  makeServer()
}


export default function App(){
return (<TimelineView />);
}
