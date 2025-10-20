'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a0a0a',
          color: 'white',
          fontFamily: 'system-ui, sans-serif',
          padding: '1rem'
        }}>
          <div style={{ textAlign: 'center', maxWidth: '500px' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#62bfa4' }}>
              Something went wrong
            </h2>
            <p style={{ color: '#999', marginBottom: '2rem' }}>
              {error.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={() => reset()}
              style={{
                background: '#62bfa4',
                color: '#0a0a0a',
                padding: '0.75rem 2rem',
                borderRadius: '0.5rem',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600'
              }}
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
