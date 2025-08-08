export function Header(): JSX.Element {
  return (
    <header style={{ padding: 16, borderBottom: '1px solid #222', display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <img src="/favicon.svg" width={28} height={28} alt="SLS" />
        <strong>SLS SaaS</strong>
      </div>
      <nav style={{ display: 'flex', gap: 16 }}>
        <a href="/" >Home</a>
        <a href="/docs">Docs</a>
        <a href="/status">Status</a>
      </nav>
    </header>
  );
}


