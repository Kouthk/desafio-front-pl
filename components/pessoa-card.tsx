import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatarData } from "@/lib/utils"
import type { PessoaDTO } from "@/lib/api"

interface PessoaCardProps {
  pessoa: PessoaDTO
}

export function PessoaCard({ pessoa }: PessoaCardProps) {
  // Verificar se a pessoa está desaparecida ou foi encontrada
  const isDesaparecido = !pessoa.ultimaOcorrencia?.dataLocalizacao

  return (
    <Card
      className={`card-hover h-full flex flex-col relative overflow-hidden transition-all duration-300 ${
        isDesaparecido
          ? "border-red-500 hover:border-primary hover:border-2"
          : "border-green-500 hover:border-primary hover:border-2"
      }`}
    >
      {/* Faixa de status destacada no topo */}
      <div
        className={`w-full py-1.5 text-center text-white font-bold text-sm ${
          isDesaparecido ? "bg-red-600" : "bg-green-600"
        }`}
      >
        {isDesaparecido ? "DESAPARECIDO" : "ENCONTRADO"}
      </div>

      <CardHeader className="pb-2 pt-3">
        <div className="aspect-[3/4] w-full overflow-hidden rounded-md mb-2">
          <img
            src={pessoa.urlFoto || `/placeholder.svg?height=300&width=225&text=Pessoa ${pessoa.id}`}
            alt={`Foto de ${pessoa.nome}`}
            className="object-cover w-full h-full"
          />
        </div>
        <CardTitle className="text-lg text-primary-dark line-clamp-1">{pessoa.nome}</CardTitle>
        <CardDescription className="text-text-muted">
          {isDesaparecido
            ? `Desaparecido desde: ${formatarData(pessoa.ultimaOcorrencia?.dtDesaparecimento)}`
            : `Encontrado em: ${formatarData(pessoa.ultimaOcorrencia?.dataLocalizacao)}`}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        <p className="text-sm text-text-secondary line-clamp-2">
          {pessoa.ultimaOcorrencia?.localDesaparecimentoConcat
            ? `Local: ${pessoa.ultimaOcorrencia.localDesaparecimentoConcat}`
            : "Local não informado"}
        </p>
        <p className="text-sm text-text-secondary mt-1">
          Idade: {pessoa.idade} | Gênero: {pessoa.sexo === "MASCULINO" ? "Masculino" : "Feminino"}
        </p>
      </CardContent>
      <CardFooter className="pt-2">
        <Button variant="outline" size="sm" className="w-full hover:bg-primary hover:text-text-light" asChild>
          <Link href={`/pessoa/${pessoa.id}`}>Ver Detalhes</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

