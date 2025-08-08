import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main style={{ padding: 0, maxWidth: 980, margin: '0 auto' }}>
      <Header />
      <section style={{ padding: 24 }}>
        <h1 style={{ fontSize: 28, marginBottom: 8 }}>Welcome to SLS Protocol SaaS</h1>
        <p style={{ marginBottom: 12 }}>
          This is the starting shell. We’ll flesh out auth, dashboards, and integrations next.
        </p>
        <ul style={{ lineHeight: 1.8 }}>
          <li>API URL: {process.env.NEXT_PUBLIC_API_URL || 'not set'}</li>
          <li>Access Server: {process.env.NEXT_PUBLIC_ACCESS_SERVER_URL || 'not set'}</li>
          <li>Stream API: {process.env.NEXT_PUBLIC_STREAM_API_URL || 'not set'}</li>
          <li>Middleware API: {process.env.NEXT_PUBLIC_MIDDLEWARE_API_URL || 'not set'}</li>
        </ul>
      </section>
      <Footer />
    </main>
  );
}


