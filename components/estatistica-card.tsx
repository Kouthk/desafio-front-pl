import type { EstatisticaPessoaDTO } from "@/lib/api"

interface EstatisticaCardProps {
  estatisticas: EstatisticaPessoaDTO | null
}

export function EstatisticaCard({ estatisticas }: EstatisticaCardProps) {
  if (!estatisticas) {
    return null
  }

  // Usar os dados da API
  const desaparecidos = estatisticas.quantPessoasDesaparecidas
  const encontrados = estatisticas.quantPessoasEncontradas
  const total = desaparecidos + encontrados

  // Calcular porcentagens para o gráfico
  const porcentagemDesaparecidos = Math.round((desaparecidos / total) * 100) || 0
  const porcentagemEncontrados = Math.round((encontrados / total) * 100) || 0

  return (
    <div className="w-full bg-gradient-to-r from-primary-dark to-primary py-12">
      <div className="container">
        <h2 className="text-3xl font-bold text-center text-white mb-8">Estatísticas Atuais</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Coluna de estatísticas */}
          <div className="flex flex-col justify-center">
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                <span className="text-5xl font-bold text-highlight block mb-2">
                  {desaparecidos.toLocaleString("pt-BR")}
                </span>
                <span className="text-lg font-medium text-white">Desaparecidos</span>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                <span className="text-5xl font-bold text-secondary block mb-2">
                  {encontrados.toLocaleString("pt-BR")}
                </span>
                <span className="text-lg font-medium text-white">Encontrados</span>
              </div>
            </div>

            <div className="mt-6 text-center text-white/80">
              <p className="text-lg">Total de {total.toLocaleString("pt-BR")} casos registrados</p>
              <p className="text-sm mt-2">Dados atualizados pela Polícia Judiciária Civil de Mato Grosso</p>
            </div>
          </div>

          {/* Coluna do gráfico - ajustada para alinhar com a coluna de estatísticas */}
          <div className="flex flex-col justify-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 h-full">
              <h3 className="text-xl font-medium text-white text-center mb-4">Proporção de Casos</h3>

              <div className="w-full h-8 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-red-600 float-left" style={{ width: `${porcentagemDesaparecidos}%` }}></div>
                <div className="h-full bg-green-600 float-left" style={{ width: `${porcentagemEncontrados}%` }}></div>
              </div>

              <div className="flex justify-between mt-4 text-sm text-white">
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-red-600 rounded-full inline-block mr-2"></span>
                  <span>Desaparecidos: {porcentagemDesaparecidos}%</span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-green-600 rounded-full inline-block mr-2"></span>
                  <span>Encontrados: {porcentagemEncontrados}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

