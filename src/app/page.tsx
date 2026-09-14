import Quickfire from "./components/Quickfire";

export default function Home() {
  return (
    <main className="min-h-screen bg-stc-beige text-stc-navy flex flex-col items-center justify-between p-4 sm:p-8 font-body selection:bg-stc-gold/30">
      {/* Brand Header */}
      <header className="w-full max-w-lg flex items-center justify-between py-3 border-b border-stc-gray/40">
        <div>
          <h1 className="text-lg sm:text-xl font-heading font-bold tracking-tight text-stc-navy">
            STC Learn
          </h1>
          <p className="text-[11px] text-stc-navy/60">Learning as we grow.</p>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded bg-stc-navy/5 text-stc-navy/80 border border-stc-navy/10">
          13 Active Seats
        </span>
      </header>

      {/* Main Interactive Container */}
      <div className="w-full flex justify-center py-6">
        <Quickfire />
      </div>

      {/* Footer */}
      <footer className="w-full max-w-lg text-center border-t border-stc-gray/40 pt-4 pb-2">
        <p className="text-[11px] text-stc-navy/50">
          STC-Chama · Private Internal Platform · Cycle 4
        </p>
      </footer>
    </main>
  );
}