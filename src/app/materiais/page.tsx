import { ExternalLink, FolderOpen } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/layout/PageHeader";
import { driveEmbedUrl, driveFolderUrl, turma } from "@/lib/data/turma";

export const metadata = { title: "Materiais | Hub da Turma" };

export default function MateriaisPage() {
  const folderId = turma.materiaisFolderId;

  return (
    <div>
      <PageHeader
        eyebrow="Estudo"
        title="Materiais"
        description="Slides e resumos organizados por matéria (subpastas). O que for adicionado na pasta Materiais do Drive aparece aqui automaticamente."
      >
        <a
          href={driveFolderUrl(folderId)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-2 rounded-panel border border-ink bg-ink px-4 font-black text-white shadow-lg shadow-zinc-900/15"
        >
          <FolderOpen className="h-4 w-4" />
          Abrir no Drive
        </a>
      </PageHeader>

      <Card className="p-0">
        <iframe
          title="Pasta de materiais no Google Drive"
          src={driveEmbedUrl(folderId)}
          className="h-[600px] w-full rounded-panel border-0"
          loading="lazy"
        />
      </Card>

      <p className="mt-3 flex items-center gap-1.5 text-sm text-muted">
        <ExternalLink className="h-3.5 w-3.5" />
        Cada matéria é uma subpasta. Clique numa pasta para ver os slides, ou use “Abrir no Drive”.
      </p>
    </div>
  );
}
