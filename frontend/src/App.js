import {useState} from 'react';
import './App.css';
import GymDashboard from '../src/dashboard';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import AddMember from './members/addMembers';

function App() {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false)
  }

  const router = createHashRouter([
    {
      path: '/',
      element: <GymDashboard/>
    },
    {
      path: '/add-member',
      element: <AddMember open={open} handleClose={handleClose}/>
    }
  ])
  
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
