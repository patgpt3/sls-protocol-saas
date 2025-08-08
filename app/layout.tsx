export const metadata = {
  title: 'SLS SaaS',
  description: 'Storage Layer Security SaaS',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}


