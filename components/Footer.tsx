export function Footer(): JSX.Element {
  return (
    <footer style={{ padding: 16, borderTop: '1px solid #222', marginTop: 24, fontSize: 12, opacity: 0.8 }}>
      © {new Date().getFullYear()} SLS Protocol
    </footer>
  );
}


