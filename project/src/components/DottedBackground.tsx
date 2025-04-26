export function DottedBackground() {
    return (
      <div className="absolute inset-0 bg-white" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundImage: `
          radial-gradient(#ccc 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px',
        backgroundPosition: 'center center',
        opacity: 0.95,
        zIndex: -1, // behind content
      }} />
    );
  }  