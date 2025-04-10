"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Phone, Mail, Clock, User, Info, AlertTriangle, Share2 } from "lucide-react"
import { getPessoaDetalhes, getOcorrenciaInformacoes, type PessoaDTO, type OcorrenciaInformacaoDTO } from "@/lib/api"
import { formatarData } from "@/lib/utils"

// Importar o toast no topo do arquivo
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function PessoaDetalhesPage() {
  const params = useParams()
  const router = useRouter()
  const id = Number.parseInt(params.id as string)

  const [pessoa, setPessoa] = useState<PessoaDTO | null>(null)
  const [informacoesOcorrencia, setInformacoesOcorrencia] = useState<OcorrenciaInformacaoDTO[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDesaparecido, setIsDesaparecido] = useState(true)

  // Substitua a função handleCompartilhar por esta versão:
  const handleCompartilhar = () => {
    const url = window.location.href
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast({
          title: "Link copiado!",
          description: "O link foi copiado para a área de transferência.",
        })
      })
      .catch((err) => {
        console.error("Erro ao copiar link: ", err)
        toast({
          title: "Erro ao copiar link",
          description: "Não foi possível copiar o link. Por favor, copie manualmente.",
          variant: "destructive",
        })
      })
  }

  // Modificar o useEffect para incluir tratamento de erro com toast
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      try {
        // Buscar detalhes da pessoa
        const pessoaData = await getPessoaDetalhes(id)
        setPessoa(pessoaData)

        // Determinar se a pessoa está desaparecida ou foi encontrada
        const desaparecido = !pessoaData?.ultimaOcorrencia?.dataLocalizacao
        setIsDesaparecido(desaparecido)

        // Buscar informações da ocorrência, se disponível
        if (pessoaData?.ultimaOcorrencia?.ocoId) {
          try {
            const ocorrenciaData = await getOcorrenciaInformacoes(pessoaData.ultimaOcorrencia.ocoId)
            setInformacoesOcorrencia(ocorrenciaData)
          } catch (error) {
            console.error(`Erro ao buscar informações da ocorrência ${pessoaData.ultimaOcorrencia.ocoId}:`, error)
            toast({
              title: "Erro ao carregar informações da ocorrência",
              description:
                "Aparentemente a API fornecida pela PJC pode estar fora do ar, por isso esse serviço não funcionará como o esperado, tente novamente em alguns instantes",
              variant: "destructive",
            })
          }
        }
      } catch (error) {
        console.error(`Erro ao buscar detalhes da pessoa ${id}:`, error)
        toast({
          title: "Erro ao carregar dados da pessoa",
          description:
            "Aparentemente a API fornecida pela PJC pode estar fora do ar, por isso esse serviço não funcionará como o esperado, tente novamente em alguns instantes",
          variant: "destructive",
        })
        router.push("/")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [id, router, toast])

  const handleEnviarInformacoes = () => {
    router.push(`/informacoes/${id}`)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!pessoa) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md">
          <h1 className="text-2xl font-bold text-primary-dark">Pessoa não encontrada</h1>
          <p className="mt-2 text-text-secondary">O registro solicitado não existe ou não está disponível.</p>
          <Button className="mt-6 bg-primary text-white hover:bg-primary-dark" asChild>
            <Link href="/">Voltar para a página inicial</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Toaster />
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
        <div className="container flex h-16 items-center">
          <Link href="/" className="font-bold text-xl text-primary-dark">
            Encontre Pessoas Desaparecidas - PJC
          </Link>
          <nav className="ml-auto hidden md:flex gap-6">
            <Link
              href="/reportar-desaparecido"
              className="text-sm font-medium text-text-secondary hover:text-primary hover:underline underline-offset-4"
            >
              Reportar Desaparecido
            </Link>
            <Link
              href="/reportar-encontrado"
              className="text-sm font-medium text-text-secondary hover:text-primary hover:underline underline-offset-4"
            >
              Reportar Encontrado
            </Link>
            <Link
              href="/sobre"
              className="text-sm font-medium text-text-secondary hover:text-primary hover:underline underline-offset-4"
            >
              Sobre
            </Link>
            <Link
              href="/contato"
              className="text-sm font-medium text-text-secondary hover:text-primary hover:underline underline-offset-4"
            >
              Contato
            </Link>
          </nav>
          <button className="ml-auto md:hidden text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </header>
      <main className="flex-1 bg-gray-50">
        <div className="container py-12">
          <div className="mx-auto max-w-5xl space-y-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="aspect-[3/4] w-full overflow-hidden">
                    <img
                      src={pessoa.urlFoto || `/placeholder.svg?height=400&width=300&text=Pessoa ${id}`}
                      alt={`Foto de ${pessoa.nome}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 space-y-3">
                    <Button className="w-full bg-accent text-white hover:bg-primary" onClick={handleCompartilhar}>
                      <Share2 className="mr-2 h-4 w-4" /> Compartilhar
                    </Button>
                    {isDesaparecido ? (
                      <Button
                        variant="outline"
                        className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                        onClick={handleEnviarInformacoes}
                      >
                        <Info className="mr-2 h-4 w-4" /> Tenho Informações
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        className="w-full border-secondary text-secondary hover:bg-secondary hover:text-white"
                        onClick={handleEnviarInformacoes}
                      >
                        <User className="mr-2 h-4 w-4" /> Conheço Esta Pessoa
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              <div className="md:w-2/3 space-y-6">
                <Card className="shadow-md">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-2xl text-primary-dark">{pessoa.nome}</CardTitle>
                      <Badge
                        variant={isDesaparecido ? "destructive" : "outline"}
                        className={isDesaparecido ? "bg-primary-dark" : "bg-secondary text-text-primary"}
                      >
                        {isDesaparecido ? "Desaparecido" : "Encontrado"}
                      </Badge>
                    </div>
                    <div className="flex items-center text-text-muted mt-2">
                      <Calendar className="mr-2 h-4 w-4 text-primary" />
                      <span>
                        {isDesaparecido
                          ? `Desaparecido desde: ${formatarData(pessoa.ultimaOcorrencia?.dtDesaparecimento)}`
                          : `Encontrado em: ${formatarData(pessoa.ultimaOcorrencia?.dataLocalizacao)}`}
                      </span>
                    </div>
                    {pessoa.ultimaOcorrencia?.localDesaparecimentoConcat && (
                      <div className="flex items-center text-text-muted mt-1">
                        <MapPin className="mr-2 h-4 w-4 text-primary" />
                        <span>
                          {isDesaparecido
                            ? `Último local visto: ${pessoa.ultimaOcorrencia.localDesaparecimentoConcat}`
                            : `Local encontrado: ${pessoa.ultimaOcorrencia.localDesaparecimentoConcat}`}
                        </span>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-md">
                      <div className="space-y-1">
                        <p className="text-sm text-text-muted">Idade</p>
                        <p className="font-medium text-text-primary">{pessoa.idade} anos</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-text-muted">Gênero</p>
                        <p className="font-medium text-text-primary">
                          {pessoa.sexo === "MASCULINO" ? "Masculino" : "Feminino"}
                        </p>
                      </div>
                    </div>

                    <Tabs defaultValue="detalhes" className="w-full mt-6">
                      <TabsList className="grid w-full grid-cols-3 bg-gray-100">
                        <TabsTrigger
                          value="detalhes"
                          className="data-[state=active]:bg-primary data-[state=active]:text-white"
                        >
                          Detalhes
                        </TabsTrigger>
                        <TabsTrigger
                          value="caracteristicas"
                          className="data-[state=active]:bg-primary data-[state=active]:text-white"
                        >
                          Características
                        </TabsTrigger>
                        <TabsTrigger
                          value="contato"
                          className="data-[state=active]:bg-primary data-[state=active]:text-white"
                        >
                          Contato
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="detalhes" className="space-y-4 mt-4">
                        {pessoa.ultimaOcorrencia?.ocorrenciaEntrevDesapDTO?.informacao && (
                          <div className="space-y-2">
                            <h3 className="font-semibold text-primary">Circunstâncias</h3>
                            <p className="text-sm text-text-secondary">
                              {pessoa.ultimaOcorrencia.ocorrenciaEntrevDesapDTO.informacao}
                            </p>
                          </div>
                        )}

                        {pessoa.ultimaOcorrencia?.ocorrenciaEntrevDesapDTO?.vestimentasDesaparecido && (
                          <div className="space-y-2">
                            <h3 className="font-semibold text-primary">Vestimentas no Momento do Desaparecimento</h3>
                            <p className="text-sm text-text-secondary">
                              {pessoa.ultimaOcorrencia.ocorrenciaEntrevDesapDTO.vestimentasDesaparecido}
                            </p>
                          </div>
                        )}
                      </TabsContent>
                      <TabsContent value="caracteristicas" className="space-y-4 mt-4">
                        <div className="space-y-2">
                          <h3 className="font-semibold text-primary">Características Físicas</h3>
                          <p className="text-sm text-text-secondary">
                            Informações detalhadas sobre características físicas não estão disponíveis.
                          </p>
                        </div>
                      </TabsContent>
                      <TabsContent value="contato" className="space-y-4 mt-4">
                        <div className="space-y-2">
                          <h3 className="font-semibold text-primary">Para Informações</h3>
                          <div className="flex items-center text-text-secondary">
                            <Phone className="mr-2 h-4 w-4 text-primary" />
                            <span>(65) 3613-5617</span>
                          </div>
                          <div className="flex items-center text-text-secondary">
                            <Mail className="mr-2 h-4 w-4 text-primary" />
                            <span>abitus@pjc.mt.gov.br</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h3 className="font-semibold text-primary">Delegacia Responsável</h3>
                          <p className="text-sm text-text-secondary">
                            Delegacia Especializada de Pessoas Desaparecidas
                            <br />
                            Endereço: Rua Batista das Neves, 155 - Centro, Cuiabá - MT
                            <br />
                            Telefone: (65) 3613-5617
                          </p>
                        </div>
                        <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                          <div className="flex items-start">
                            <AlertTriangle className="mr-2 h-5 w-5 text-amber-500 mt-0.5" />
                            <p className="text-sm text-amber-800">
                              Se você tiver qualquer informação sobre esta pessoa, por favor, entre em contato
                              imediatamente com as autoridades ou com nossa equipe. Toda informação é importante e será
                              tratada com confidencialidade.
                            </p>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>

                {informacoesOcorrencia && informacoesOcorrencia.length > 0 && (
                  <Card className="shadow-md">
                    <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
                      <CardTitle className="text-lg text-primary">Histórico de Informações</CardTitle>
                      <CardDescription>Atualizações e informações recebidas sobre este caso</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {informacoesOcorrencia.map((info, index) => (
                          <div key={index} className="border-b pb-4 last:border-b-0">
                            <div className="flex items-center justify-between">
                              <div className="font-medium text-primary">Informação Recebida</div>
                              <div className="text-sm text-text-muted flex items-center">
                                <Clock className="mr-1 h-3 w-3" /> {formatarData(info.data)}
                              </div>
                            </div>
                            <p className="text-sm mt-1 text-text-secondary">{info.informacao}</p>
                            {info.anexos && info.anexos.length > 0 && (
                              <div className="mt-2">
                                <p className="text-xs font-medium text-text-secondary">Anexos:</p>
                                <div className="flex flex-wrap gap-2 mt-1">
                                  {info.anexos.map((anexo, idx) => (
                                    <a
                                      key={idx}
                                      href={anexo}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-xs text-accent hover:text-primary hover:underline"
                                    >
                                      Ver anexo {idx + 1}
                                    </a>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t bg-primary-dark text-text-light">
        <div className="container flex flex-col gap-4 py-10 md:flex-row md:gap-6">
          <div className="space-y-4 md:w-1/3">
            <h3 className="text-xl font-bold">Encontre Pessoas Desaparecidas - PJC</h3>
            <p className="text-sm text-text-light/70">Ajudando a reconectar famílias e entes queridos desde 2025.</p>
          </div>
          <div className="md:w-1/3 space-y-4">
            <h4 className="text-sm font-semibold">Links Rápidos</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/reportar-desaparecido" className="text-sm text-text-light/70 hover:text-highlight">
                Reportar Desaparecido
              </Link>
              <Link href="/reportar-encontrado" className="text-sm text-text-light/70 hover:text-highlight">
                Reportar Encontrado
              </Link>
              <Link href="/buscar" className="text-sm text-text-light/70 hover:text-highlight">
                Buscar
              </Link>
            </nav>
          </div>
          <div className="md:w-1/3 space-y-4">
            <h4 className="text-sm font-semibold">Contato</h4>
            <p className="text-sm text-text-light/70">
              Email: contato@encontrealguem.org.br
              <br />
              Telefone: (65) 3613-5617
            </p>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="container py-6">
            <p className="text-center text-sm text-text-light/50">
              © {new Date().getFullYear()} Encontre Pessoas Desaparecidas - PJC. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

