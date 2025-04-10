"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PessoaCard } from "@/components/pessoa-card"
import { EstatisticaCard } from "@/components/estatistica-card"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useToast } from "@/components/ui/use-toast"

// Importando as funções de busca da API
import {
  getPessoasDesaparecidas,
  getEstatisticas,
  type PessoaDTO,
  type EstatisticaPessoaDTO,
  type PagePessoaDTO,
} from "@/lib/api"

export default function Home() {
  const router = useRouter()
  const [pessoasDesaparecidas, setPessoasDesaparecidas] = useState<PessoaDTO[]>([])
  const [pessoasEncontradas, setPessoasEncontradas] = useState<PessoaDTO[]>([])
  const [estatisticas, setEstatisticas] = useState<EstatisticaPessoaDTO | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [paginaDesaparecidos, setPaginaDesaparecidos] = useState(0)
  const [paginaEncontrados, setPaginaEncontrados] = useState(0)
  const [resultadosDesaparecidos, setResultadosDesaparecidos] = useState<PagePessoaDTO | null>(null)
  const [resultadosEncontrados, setResultadosEncontrados] = useState<PagePessoaDTO | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filtros, setFiltros] = useState({
    nome: "",
    faixaIdadeInicial: "",
    faixaIdadeFinal: "",
    sexo: "QUALQUER",
    status: "DESAPARECIDO",
  })

  const { toast } = useToast()

  // Aumentado para 12 cards por página
  const porPagina = 12

  const carregarDesaparecidos = async (pagina: number) => {
    try {
      const desaparecidosData = await getPessoasDesaparecidas(pagina, porPagina, { status: "DESAPARECIDO" })
      setPessoasDesaparecidas(desaparecidosData.content || [])
      setResultadosDesaparecidos(desaparecidosData)
    } catch (error) {
      console.error("Erro ao buscar pessoas desaparecidas na página inicial:", error)
    }
  }

  const carregarEncontrados = async (pagina: number) => {
    try {
      const encontradosData = await getPessoasDesaparecidas(pagina, porPagina, { status: "LOCALIZADO" })
      setPessoasEncontradas(encontradosData.content || [])
      setResultadosEncontrados(encontradosData)
    } catch (error) {
      console.error("Erro ao buscar pessoas encontradas na página inicial:", error)
    }
  }

  // Modificar o useEffect para incluir tratamento de erro com toast
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)

      try {
        // Carregar desaparecidos
        const desaparecidosData = await getPessoasDesaparecidas(paginaDesaparecidos, porPagina, {
          status: "DESAPARECIDO",
        })
        setPessoasDesaparecidas(desaparecidosData.content || [])
        setResultadosDesaparecidos(desaparecidosData)

        // Carregar encontrados
        const encontradosData = await getPessoasDesaparecidas(paginaEncontrados, porPagina, { status: "LOCALIZADO" })
        setPessoasEncontradas(encontradosData.content || [])
        setResultadosEncontrados(encontradosData)

        // Buscando estatísticas
        const estatisticasData = await getEstatisticas()
        setEstatisticas(estatisticasData)
      } catch (error) {
        console.error("Erro ao buscar dados na página inicial:", error)
        toast({
          title: "Erro ao carregar dados",
          description:
            "Aparentemente a API fornecida pela PJC pode estar fora do ar, por isso esse serviço não funcionará como o esperado, tente novamente em alguns instantes",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [paginaDesaparecidos, paginaEncontrados, toast])

  const handleTopSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/buscar?nome=${encodeURIComponent(searchTerm)}`)
    }
  }

  const handleAdvancedSearch = (e: React.FormEvent) => {
    e.preventDefault()

    // Construir a URL com os parâmetros de busca
    let searchUrl = "/buscar?"

    if (filtros.nome) searchUrl += `nome=${encodeURIComponent(filtros.nome)}&`
    if (filtros.faixaIdadeInicial) searchUrl += `faixaIdadeInicial=${filtros.faixaIdadeInicial}&`
    if (filtros.faixaIdadeFinal) searchUrl += `faixaIdadeFinal=${filtros.faixaIdadeFinal}&`
    if (filtros.sexo !== "QUALQUER") searchUrl += `sexo=${filtros.sexo}&`
    searchUrl += `status=${filtros.status}&pagina=0&porPagina=${porPagina}`

    router.push(searchUrl)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFiltros((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="flex min-h-screen flex-col">
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
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-primary-dark via-primary to-accent text-text-light">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              <div className="space-y-3 max-w-3xl">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Reunindo Famílias, Restaurando Esperança
                </h1>
                <p className="mx-auto max-w-[700px] text-text-light/80 md:text-xl">
                  Nossa plataforma ajuda a encontrar pessoas desaparecidas e reconectá-las com seus entes queridos.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form onSubmit={handleTopSearch} className="relative">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                    <Input
                      type="search"
                      name="nome"
                      placeholder="Buscar por nome..."
                      className="w-full bg-white pl-10 rounded-md border border-white/20 text-text-primary"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full mt-2 bg-highlight text-primary-dark hover:bg-secondary">
                    Buscar
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {estatisticas && (
          <section className="w-full py-0 bg-gradient-to-r from-primary-dark to-primary">
            <EstatisticaCard estatisticas={estatisticas} />
          </section>
        )}

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="heading-2">Buscar na Base de Casos Registrados</h2>
                <p className="mx-auto max-w-[700px] text-text-secondary md:text-lg">
                  Pesquise em nossa base abrangente de indivíduos desaparecidos e encontrados.
                </p>
              </div>

              <div className="w-full max-w-3xl mt-6">
                <Card className="shadow-md">
                  <CardHeader className="bg-gradient-to-r from-primary to-accent text-white">
                    <CardTitle>Filtros de Busca</CardTitle>
                    <CardDescription className="text-white/80">
                      Refine sua busca usando os filtros abaixo
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <form onSubmit={handleAdvancedSearch} className="space-y-4">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="nome" className="text-text-secondary">
                            Nome
                          </Label>
                          <Input
                            id="nome"
                            name="nome"
                            placeholder="Digite o nome completo ou parcial"
                            value={filtros.nome}
                            onChange={handleInputChange}
                            className="border-gray-300 focus:border-primary focus:ring-primary"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="status" className="text-text-secondary">
                            Tipo de Caso
                          </Label>
                          <Select
                            name="status"
                            value={filtros.status}
                            onValueChange={(value) => setFiltros((prev) => ({ ...prev, status: value }))}
                          >
                            <SelectTrigger
                              id="status"
                              className="border-gray-300 focus:border-primary focus:ring-primary"
                            >
                              <SelectValue placeholder="Selecione o tipo de caso" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="DESAPARECIDO">Pessoas Desaparecidas</SelectItem>
                              <SelectItem value="LOCALIZADO">Pessoas Encontradas</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div className="space-y-2">
                          <Label htmlFor="faixaIdadeInicial" className="text-text-secondary">
                            Faixa Etária
                          </Label>
                          <div className="flex items-center gap-2">
                            <Input
                              id="faixaIdadeInicial"
                              name="faixaIdadeInicial"
                              type="number"
                              placeholder="Mín"
                              value={filtros.faixaIdadeInicial}
                              onChange={handleInputChange}
                              className="border-gray-300 focus:border-primary focus:ring-primary"
                            />
                            <span className="text-text-secondary">até</span>
                            <Input
                              id="faixaIdadeFinal"
                              name="faixaIdadeFinal"
                              type="number"
                              placeholder="Máx"
                              value={filtros.faixaIdadeFinal}
                              onChange={handleInputChange}
                              className="border-gray-300 focus:border-primary focus:ring-primary"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="sexo" className="text-text-secondary">
                            Gênero
                          </Label>
                          <Select
                            name="sexo"
                            value={filtros.sexo}
                            onValueChange={(value) => setFiltros((prev) => ({ ...prev, sexo: value }))}
                          >
                            <SelectTrigger
                              id="sexo"
                              className="border-gray-300 focus:border-primary focus:ring-primary"
                            >
                              <SelectValue placeholder="Qualquer" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="QUALQUER">Qualquer</SelectItem>
                              <SelectItem value="MASCULINO">Masculino</SelectItem>
                              <SelectItem value="FEMININO">Feminino</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-end">
                          <Button type="submit" className="w-full bg-primary text-white hover:bg-primary-dark">
                            Buscar
                          </Button>
                        </div>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
            <Tabs defaultValue="desaparecidos" className="w-full max-w-5xl mx-auto mt-8">
              <TabsList className="grid w-full grid-cols-2 bg-white/80 backdrop-blur-sm">
                <TabsTrigger
                  value="desaparecidos"
                  className="data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  Pessoas Desaparecidas
                </TabsTrigger>
                <TabsTrigger
                  value="encontrados"
                  className="data-[state=active]:bg-secondary data-[state=active]:text-text-primary"
                >
                  Pessoas Encontradas
                </TabsTrigger>
              </TabsList>
              <TabsContent value="desaparecidos" className="mt-6">
                {isLoading ? (
                  <div className="flex justify-center py-10">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                  </div>
                ) : (
                  // Alterar o grid para mostrar 4 cards por linha (3 em telas médias)
                  <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {pessoasDesaparecidas && pessoasDesaparecidas.length > 0 ? (
                      pessoasDesaparecidas.map((pessoa) => <PessoaCard key={pessoa.id} pessoa={pessoa} />)
                    ) : (
                      <div className="col-span-full text-center py-10">
                        <p>Nenhuma pessoa desaparecida encontrada.</p>
                      </div>
                    )}
                  </div>
                )}

                {resultadosDesaparecidos && resultadosDesaparecidos.totalPages > 1 && (
                  <div className="mt-8 flex flex-col items-center">
                    <div className="text-sm text-text-secondary mb-2">
                      Página {paginaDesaparecidos + 1} de {resultadosDesaparecidos.totalPages}
                    </div>
                    <Pagination>
                      <PaginationContent>
                        {paginaDesaparecidos > 0 && (
                          <PaginationItem>
                            <PaginationPrevious
                              href="#"
                              onClick={(e) => {
                                e.preventDefault()
                                setPaginaDesaparecidos((prev) => Math.max(0, prev - 1))
                              }}
                              className="hover:bg-primary hover:text-white"
                            />
                          </PaginationItem>
                        )}

                        {/* Mostrar primeira página */}
                        {paginaDesaparecidos > 2 && (
                          <PaginationItem>
                            <PaginationLink
                              href="#"
                              onClick={(e) => {
                                e.preventDefault()
                                setPaginaDesaparecidos(0)
                              }}
                              className="hover:bg-primary/10"
                            >
                              1
                            </PaginationLink>
                          </PaginationItem>
                        )}

                        {/* Mostrar elipses se necessário */}
                        {paginaDesaparecidos > 3 && (
                          <PaginationItem>
                            <PaginationEllipsis />
                          </PaginationItem>
                        )}

                        {/* Mostrar páginas ao redor da página atual */}
                        {Array.from({ length: resultadosDesaparecidos.totalPages }, (_, i) => {
                          // Mostrar 2 páginas antes e depois da atual, ou ajustar conforme necessário
                          if (
                            i >= Math.max(0, paginaDesaparecidos - 2) &&
                            i <= Math.min(resultadosDesaparecidos.totalPages - 1, paginaDesaparecidos + 2)
                          ) {
                            const pageNumber = i
                            const isActive = pageNumber === paginaDesaparecidos

                            return (
                              <PaginationItem key={i}>
                                <PaginationLink
                                  href="#"
                                  isActive={isActive}
                                  onClick={(e) => {
                                    e.preventDefault()
                                    setPaginaDesaparecidos(pageNumber)
                                  }}
                                  className={isActive ? "bg-primary text-white" : "hover:bg-primary/10"}
                                >
                                  {pageNumber + 1}
                                </PaginationLink>
                              </PaginationItem>
                            )
                          }
                          return null
                        })}

                        {/* Mostrar elipses se necessário */}
                        {paginaDesaparecidos < resultadosDesaparecidos.totalPages - 4 && (
                          <PaginationItem>
                            <PaginationEllipsis />
                          </PaginationItem>
                        )}

                        {/* Mostrar última página */}
                        {paginaDesaparecidos < resultadosDesaparecidos.totalPages - 3 && (
                          <PaginationItem>
                            <PaginationLink
                              href="#"
                              onClick={(e) => {
                                e.preventDefault()
                                setPaginaDesaparecidos(resultadosDesaparecidos.totalPages - 1)
                              }}
                              className="hover:bg-primary/10"
                            >
                              {resultadosDesaparecidos.totalPages}
                            </PaginationLink>
                          </PaginationItem>
                        )}

                        {paginaDesaparecidos < resultadosDesaparecidos.totalPages - 1 && (
                          <PaginationItem>
                            <PaginationNext
                              href="#"
                              onClick={(e) => {
                                e.preventDefault()
                                setPaginaDesaparecidos((prev) =>
                                  Math.min(resultadosDesaparecidos.totalPages - 1, prev + 1),
                                )
                              }}
                              className="hover:bg-primary hover:text-white"
                            />
                          </PaginationItem>
                        )}
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="encontrados" className="mt-6">
                {isLoading ? (
                  <div className="flex justify-center py-10">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
                  </div>
                ) : (
                  // E também para a seção de pessoas encontradas
                  <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {pessoasEncontradas && pessoasEncontradas.length > 0 ? (
                      pessoasEncontradas.map((pessoa) => <PessoaCard key={pessoa.id} pessoa={pessoa} />)
                    ) : (
                      <div className="col-span-full text-center py-10">
                        <p>Nenhuma pessoa encontrada registrada.</p>
                      </div>
                    )}
                  </div>
                )}

                {resultadosEncontrados && resultadosEncontrados.totalPages > 1 && (
                  <div className="mt-8 flex flex-col items-center">
                    <div className="text-sm text-text-secondary mb-2">
                      Página {paginaEncontrados + 1} de {resultadosEncontrados.totalPages}
                    </div>
                    <Pagination>
                      <PaginationContent>
                        {paginaEncontrados > 0 && (
                          <PaginationItem>
                            <PaginationPrevious
                              href="#"
                              onClick={(e) => {
                                e.preventDefault()
                                setPaginaEncontrados((prev) => Math.max(0, prev - 1))
                              }}
                              className="hover:bg-secondary hover:text-text-primary"
                            />
                          </PaginationItem>
                        )}

                        {/* Mostrar primeira página */}
                        {paginaEncontrados > 2 && (
                          <PaginationItem>
                            <PaginationLink
                              href="#"
                              onClick={(e) => {
                                e.preventDefault()
                                setPaginaEncontrados(0)
                              }}
                              className="hover:bg-secondary/10"
                            >
                              1
                            </PaginationLink>
                          </PaginationItem>
                        )}

                        {/* Mostrar elipses se necessário */}
                        {paginaEncontrados > 3 && (
                          <PaginationItem>
                            <PaginationEllipsis />
                          </PaginationItem>
                        )}

                        {/* Mostrar páginas ao redor da página atual */}
                        {Array.from({ length: resultadosEncontrados.totalPages }, (_, i) => {
                          // Mostrar 2 páginas antes e depois da atual, ou ajustar conforme necessário
                          if (
                            i >= Math.max(0, paginaEncontrados - 2) &&
                            i <= Math.min(resultadosEncontrados.totalPages - 1, paginaEncontrados + 2)
                          ) {
                            const pageNumber = i
                            const isActive = pageNumber === paginaEncontrados

                            return (
                              <PaginationItem key={i}>
                                <PaginationLink
                                  href="#"
                                  isActive={isActive}
                                  onClick={(e) => {
                                    e.preventDefault()
                                    setPaginaEncontrados(pageNumber)
                                  }}
                                  className={isActive ? "bg-secondary text-text-primary" : "hover:bg-secondary/10"}
                                >
                                  {pageNumber + 1}
                                </PaginationLink>
                              </PaginationItem>
                            )
                          }
                          return null
                        })}

                        {/* Mostrar elipses se necessário */}
                        {paginaEncontrados < resultadosEncontrados.totalPages - 4 && (
                          <PaginationItem>
                            <PaginationEllipsis />
                          </PaginationItem>
                        )}

                        {/* Mostrar última página */}
                        {paginaEncontrados < resultadosEncontrados.totalPages - 3 && (
                          <PaginationItem>
                            <PaginationLink
                              href="#"
                              onClick={(e) => {
                                e.preventDefault()
                                setPaginaEncontrados(resultadosEncontrados.totalPages - 1)
                              }}
                              className="hover:bg-secondary/10"
                            >
                              {resultadosEncontrados.totalPages}
                            </PaginationLink>
                          </PaginationItem>
                        )}

                        {paginaEncontrados < resultadosEncontrados.totalPages - 1 && (
                          <PaginationItem>
                            <PaginationNext
                              href="#"
                              onClick={(e) => {
                                e.preventDefault()
                                setPaginaEncontrados((prev) => Math.min(resultadosEncontrados.totalPages - 1, prev + 1))
                              }}
                              className="hover:bg-secondary hover:text-text-primary"
                            />
                          </PaginationItem>
                        )}
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>
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

