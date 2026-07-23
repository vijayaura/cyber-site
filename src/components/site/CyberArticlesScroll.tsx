import { motion } from 'motion/react'
import { ArrowUpRight, Newspaper } from 'lucide-react'
import { Container } from '@/components/site/Container'
import { SectionWaveBg } from '@/components/site/SectionWaveBg'

export type CyberArticle = {
  title: string
  source: string
  date: string
  excerpt: string
  url: string
  tag: string
}

type CyberArticlesScrollProps = {
  articles: CyberArticle[]
  className?: string
}

export function CyberArticlesScroll({ articles, className = '' }: CyberArticlesScrollProps) {
  return (
    <section className={`relative overflow-hidden section-pad border-b border-border bg-paper ${className}`}>
      <SectionWaveBg corner="bottom-left" />
      <Container className="relative z-[1]">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="label-caps text-electric">From the news</p>
            <h2 className="display-lg mt-4">Why SMEs need cyber cover</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Real-world incidents show why insurance, incident response, and strong controls matter for small
              businesses — not just enterprises.
            </p>
          </div>
          <p className="hidden text-sm text-muted-foreground sm:block">Scroll to explore →</p>
        </div>

        <div className="relative mt-10 sm:mt-12">
          <div
            className="flex gap-4 overflow-x-auto pb-2 pt-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-5 [&::-webkit-scrollbar]:hidden"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {articles.map((article, i) => (
              <motion.a
                key={article.url}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ type: 'spring', stiffness: 110, damping: 16, delay: i * 0.05 }}
                className="group flex w-[min(85vw,320px)] shrink-0 snap-start flex-col rounded-2xl border border-border/70 bg-white p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-electric/30 hover:shadow-medium sm:w-[340px] sm:p-7"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-electric/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-electric">
                    <Newspaper className="size-3" aria-hidden />
                    {article.tag}
                  </span>
                  <ArrowUpRight
                    className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-electric"
                    aria-hidden
                  />
                </div>

                <p className="mt-5 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  {article.source} · {article.date}
                </p>
                <h3 className="mt-2 font-display text-xl leading-snug text-foreground transition-colors group-hover:text-electric">
                  {article.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{article.excerpt}</p>
                <span className="mt-5 text-sm font-medium text-electric">Read article</span>
              </motion.a>
            ))}
          </div>

          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-paper to-transparent sm:w-24"
            aria-hidden
          />
        </div>
      </Container>
    </section>
  )
}
