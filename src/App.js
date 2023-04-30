
import './App.css';
import {createBrowserRouter,RouterProvider } from 'react-router-dom';
import Rootlayout from './Rootlayout/Rootlayout';
import Adduser from './Components/addusers/Adduser'
import Users from './Components/users/Users'
import Removeduser from './Components/removedusers/Removeduser'

function App() {

  const router=createBrowserRouter(
    [
      {
        path:"/",
        element:<Rootlayout/>,
        children:
        [
          {
            path:"/",
            element:<Adduser/>
          },
          {
            path:"/Users",
            element:<Users/>
          },
          {
            path:"/RemovedUsers",
            element:<Removeduser/>
  
          }
        ]
        
      }
    ]
  )




  return (
    <div className="App">
      <RouterProvider router={router}/>
     
    </div>
  );
}

export default App;
