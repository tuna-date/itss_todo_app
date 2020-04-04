import React from 'react';

const Dashboard = React.lazy(() => import('./views/Dashboard'));

const List = React.lazy(() => import('./views/Giga/Lists/ListItem'));
const EditItem = React.lazy(() => import('./views/Giga/Lists/EditItem'));
const CreateItem = React.lazy(() => import('./views/Giga/Lists/CreateItem'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/edit/:id', exact: true, name: 'Cập nhật thông tin công việc', component: EditItem},
  { path: '/add', exact: true, name: 'Thêm công việc mới', component: CreateItem},
  { path: '/lists', exact: true, name: 'Danh sách công việc', component: List},

  { path: '/dashboard', name: 'Dashboard', component: Dashboard },

];

export default routes;
