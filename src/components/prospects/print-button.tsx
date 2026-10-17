"use client"

export function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()} className="bg-[#e63a2b] px-4 py-2 text-xs font-bold uppercase tracking-widest text-white">
      Enregistrer en PDF
    </button>
  )
}
