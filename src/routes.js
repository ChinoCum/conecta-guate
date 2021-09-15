import React from 'react';
const CreacionPedido = React.lazy(() => import('./views/pedido/CreacionPedido'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  // Conecta
  { path: '/creacion-pedido', name: 'Creacion de Pedido', component: CreacionPedido },
];

export default routes;
