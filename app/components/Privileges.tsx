'use client';

import React from 'react';

type PrivilegesProps = {
  privilege: number;
};

const Privileges: React.FC<PrivilegesProps> = ({ privilege }) => {
  const getPrivilegeLabel = (privilege: number) => {
    switch (privilege) {
      case 0:
        return 'Unverified User';
      case 1:
        return 'Verified User';
      case 2:
        return 'Editor';
      case 3:
        return 'Admin';
      default:
        return 'Unknown';
    }
  };

  const rows = [
    { level: 0, label: 'Unverified User' },
    { level: 1, label: 'Verified User' },
    { level: 2, label: 'Editor' },
    { level: 3, label: 'Admin' },
  ];

  return (
    <table>
      <thead>
        <tr>
          <th>Privilege:</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {rows.map(({ level, label }) => (
          <tr key={level} style={{ backgroundColor: level === privilege ? '#d3f0d3' : 'transparent' }}>
            <td>{level}</td>
            <td>{label}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Privileges;
