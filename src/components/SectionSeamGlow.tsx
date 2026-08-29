// Glow sutil da cor da marca concentrado nas bordas da seção (onde ela
// encontra a seção vizinha), em vez de atravessar todo o fundo — assim o
// conteúdo (títulos, ícones, texto) sempre fica sobre branco limpo, e a
// transição entre as partes fica suave sem competir com o texto escuro.
export default function SectionSeamGlow() {
  return (
    <>
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-brand-primary/20 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-brand-primary/20 to-transparent pointer-events-none" />
    </>
  );
}
