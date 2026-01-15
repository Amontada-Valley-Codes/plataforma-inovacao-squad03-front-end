'use client'

export default function PagePocs() {
  return (
    <div className="w-full min-h-full mb-5">
      <div className="rounded-[10px] py-2 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="text-blue">
          <h1 className="text-2xl md:text-3xl font-medium mb-1">
            POCs
          </h1>
          <p className="text-base md:text-lg text-muted-foreground">
            Provas de Conceito em desenvolvimento
          </p>
        </div>
      </div>
    </div>
  );
}
