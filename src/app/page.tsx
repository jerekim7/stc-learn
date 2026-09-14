import Quickfire from "./components/Quickfire";

export default function Home() {
  return (
    <main className="min-h-screen bg-stc-beige text-stc-navy flex flex-col items-center justify-between p-6 sm:p-12 font-body">
      <header className="w-full max-w-xl flex items-center justify-between py-4 border-b border-stc-gray/40">
        <div>
          <h1 className="text-xl font-heading font-bold tracking-tight text-stc-navy">
            STC Learn
          </h1>
          <p className="text-xs text-stc-navy/60">Learning as we grow.</p>
        </div>
        <span className="text-[11px] font-semibold uppercase px-2.5 py-1 rounded bg-stc-gold/20 text-stc-navy border border-stc-gold/30">
          Alpha v0.1
        </span>
      </header>

      <div className="w-full flex justify-center py-8">
        <Quickfire />
      </div>

      <footer className="w-full max-w-xl text-center border-t border-stc-gray/40 pt-4">
        <p className="text-[11px] text-stc-navy/50">
          STC-Chama · Internal Alpha Drop · 13 Active Seats
        </p>
      </footer>
    </main>
  );
}