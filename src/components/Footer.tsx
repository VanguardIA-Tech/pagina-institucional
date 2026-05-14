export default function Footer() {
  return (
    <footer className="py-16 px-6 bg-vg-void border-t border-white/[0.03]">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h4 className="text-sm font-medium mb-4">VanguardIA</h4>
          <p className="text-xs text-vg-text-dim leading-relaxed">
            Da Amazônia para o mundo.
            <br />
            Arquitetura brasileira de
            <br />
            Inteligência Aplicada.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-medium mb-4">Sistema</h4>
          <div className="space-y-2 text-xs text-vg-text-dim">
            <p>ICIA</p>
            <p>ICIA.OS</p>
            <p>DEEP</p>
            <p>CNH da IA</p>
            <p>ICIA 360</p>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-medium mb-4">Movimento</h4>
          <div className="space-y-2 text-xs text-vg-text-dim">
            <p>Do It Hub</p>
            <p>AI Night</p>
            <p>AI On Hands</p>
            <p>Conselho ICIA</p>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-medium mb-4">Contato</h4>
          <div className="space-y-2 text-xs text-vg-text-dim">
            <a
              href="https://www.instagram.com/grupovanguard.ia/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-vg-blue-soft transition-colors block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vg-blue-soft/60 rounded"
            >
              Instagram
            </a>
            <a
              href="https://www.linkedin.com/company/grupovanguardiabr/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-vg-blue-soft transition-colors block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vg-blue-soft/60 rounded"
            >
              LinkedIn
            </a>
            <p className="pt-4">Belém, Pará</p>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-white/[0.02] text-center">
        <p className="text-[10px] font-mono text-vg-text-dim tracking-[0.2em] uppercase">
          &copy; {new Date().getFullYear()} Grupo VanguardIA. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
