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
    { level: 0, label: 'Unverified User', desc: 'Can vote' },
    { level: 1, label: 'Verified User', desc: 'Can add new quotes' },
    { level: 2, label: 'Editor', desc: 'Can edit existing quotes' },
    { level: 3, label: 'Admin', desc: 'Can delete quotes' },
  ]

  return (
    <table>
      <thead>
        <tr>
          <th>Privilege:</th>
          <th style={{ minWidth: '160px' }}></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {rows.map(({ level, label, desc }) => (
          <tr key={level} style={{ backgroundColor: level === privilege ? '#d3f0d3' : 'transparent' }}>
            <td>{level}</td>
            <td>{label}</td>
            <td>{desc}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Privileges