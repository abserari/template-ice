import React from 'react';
import { ResponsiveGrid } from '@alifd/next';
import Guide from './components/Guide';
import CardList from '@/components/Cardlist'

const { Cell } = ResponsiveGrid;

const Dashboard = () => {
  return (
    <CardList></CardList>
  );
};

export default Dashboard;
