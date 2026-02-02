import type { ReactNode } from 'react';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { source } from '@/lib/source';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

async function getLatestUpdateDate(): Promise<string | null> {
  try {
    const filePath = path.join(process.cwd(), 'content/docs/updates/index.mdx');
    const content = await readFile(filePath, 'utf8');
    const match = content.match(/^##\s+(\d{4}-\d{2}-\d{2})\s*$/m);
    return match?.[1] ?? null;
  } catch {
    return null;
  }
}

export default async function Layout({ children }: { children: ReactNode }) {
  const latestDate = await getLatestUpdateDate();
  return (
    <DocsLayout
      tree={source.getPageTree()}
      sidebar={{
        enabled: true,
        banner: (
          <div className="rounded-xl border border-[var(--color-fd-border)] bg-[var(--color-fd-card)] px-3 py-3 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 text-[13px] font-semibold tracking-tight text-[var(--color-fd-foreground)]">
                  <span>最近更新</span>
                  {latestDate && (
                    <span className="rounded-full border border-[var(--color-fd-border)] bg-[var(--color-fd-muted)] px-2 py-0.5 text-[11px] font-medium text-[var(--color-fd-muted-foreground)]">
                      {latestDate}
                    </span>
                  )}
                </div>
                <div className="mt-1 text-[12px] leading-snug text-[var(--color-fd-muted-foreground)]">
                  新增「取模与取余」高频刷题用法，配色对比度更清晰。
                </div>
              </div>
              <a
                href="/docs/updates"
                className="shrink-0 rounded-md border border-[var(--color-fd-border)] bg-transparent px-2.5 py-1.5 text-[12px] font-medium text-[var(--color-fd-foreground)] hover:bg-[var(--color-fd-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-fd-ring)] focus:ring-offset-2 focus:ring-offset-[var(--color-fd-background)]"
              >
                查看
              </a>
            </div>
          </div>
        ),
      }}
      {...baseOptions()}
    >
      {children}
    </DocsLayout>
  );
}
