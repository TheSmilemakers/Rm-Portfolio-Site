import { ReactNode } from 'react';

export default function GameLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {children}
    </div>
  );
}