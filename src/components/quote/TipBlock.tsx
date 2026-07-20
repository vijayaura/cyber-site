type TipBlockProps = {
  tip: string
}

export function TipBlock({ tip }: TipBlockProps) {
  return (
    <div className="flex gap-3 rounded-2xl border border-[#ffe08a]/40 bg-[#fffbeb] px-4 py-3.5">
      <span className="text-lg leading-none">💡</span>
      <p className="text-[14px] leading-relaxed text-[#78716c]">{tip}</p>
    </div>
  )
}
