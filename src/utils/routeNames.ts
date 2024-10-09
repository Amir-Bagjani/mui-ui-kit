// import { useRoutes } from "react-router-dom";

export const baseRoute = "/";
export const baseAuth = baseRoute + "authentication";

export const ROUTES_NAME = {
  home: baseRoute,
  notFound: baseRoute + "/not-found",
  authentication: {
    login: baseAuth + "/login",
    register: baseAuth + "/register",
  },
};


// const dayRoutes= {

// branch:[
//   {path:'dashboard',element:<BranchDashboard/>,children:[{}]
// ]



// agent:[
//   {path:'dashboard',element:<AgentDashboard/>,children:[{}]
// ]
// }


// const hafezRoutes= {

//   branch:[
//     {path:'dashboard',element:<BranchDashboard/>,children:[{}]
//   ]
  
  
  
//   agent:[
//     {path:'dashboard',element:<AgentDashboard/>,children:[{}]
//   ]
//   }
// useRoutes(routes[role])