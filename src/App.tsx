import React from 'react';

import type { ID } from 'types/opaque';
import {Three} from './three';

import './app.css';

const nodes = [
  {
    id: 'ss' as ID,
    label: 'label',
    children: [
      {
        id: 'ss' as ID,
        label: 'label',
        children: [
          {
            id: 'ss' as ID,
            label: 'label',
            children: [],
          }
        ],
      },
      {
        id: 'ss' as ID,
        label: 'label',
        children: [],
      }
    ],
  }
];

export const App = () => {
  return (
    <div className="app">
      <Three nodes={nodes} />
    </div>
  );
}
