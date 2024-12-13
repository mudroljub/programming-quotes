import React from 'react';

type PrivilegesProps = {
  privilege: number;
};

const Privileges: React.FC<PrivilegesProps> = ({ privilege }) => {

  const rows = [
    { level: 0, label: 'Unverified User', desc: 'Can vote' },
    { level: 1, label: 'Verified User', desc: 'Can add new quotes' },
    { level: 2, label: 'Editor', desc: 'Can edit existing quotes' },
    { level: 3, label: 'Admin', desc: 'Can delete quotes' },
  ]

  return (
    <table>
      <tbody style={{ border: '1px solid gray' }}>
        {rows.map(({ level, label, desc }) => (
          <tr key={level} style={{ backgroundColor: level === privilege ? '#d3f0d3' : 'transparent' }}>
            <td style={{ padding: '2px 16px' }}>{level}</td>
            <td style={{ padding: '2px 16px' }}>{label}</td>
            <td style={{ padding: '2px 16px' }}>{desc}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Privileges