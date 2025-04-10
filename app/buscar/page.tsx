"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { PessoaCard } from "@/components/pessoa-card"
import { getPessoasDesaparecidas, type PagePessoaDTO } from "@/lib/api"
import { toast } from "@/components/ui/use-toast"

export default function BuscarPage() {
  const searchParams = useSearchParams()
  const [resultados, setResultados] = useState<PagePessoaDTO>({
    totalPages: 0,
    totalElements: 0,
    numberOfElements: 0,
    first: true,
    last: true,
    size: 0,
    content: [],
    number: 0,
    empty: true,
  })
  const [isLoading, setIsLoading] = useState(true)

  // Extrair parâmetros de busca da URL
  const nome = searchParams.get("nome") || ""
  const faixaIdadeInicial = searchParams.get("faixaIdadeInicial")
    ? Number.parseInt(searchParams.get("faixaIdadeInicial")!)
    : undefined
  const faixaIdadeFinal = searchParams.get("faixaIdadeFinal")
    ? Number.parseInt(searchParams.get("faixaIdadeFinal")!)
    : undefined
  const sexo = searchParams.get("sexo") as "MASCULINO" | "FEMININO" | undefined
  const status = (searchParams.get("status") as "DESAPARECIDO" | "LOCALIZADO") || "DESAPARECIDO"
  const pagina = searchParams.get("pagina") ? Number.parseInt(searchParams.get("pagina")!) : 0
  // Alterar a variável porPagina para 12 cards
  const porPagina = searchParams.get("porPagina") ? Number.parseInt(searchParams.get("porPagina")!) : 12

  // Determinar o valor da aba ativa
  const activeTab = status === "LOCALIZADO" ? "encontrados" : "desaparecidos"

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      try {
        const data = await getPessoasDesaparecidas(pagina, porPagina, {
          nome,
          faixaIdadeInicial,
          faixaIdadeFinal,
          sexo,
          status,
        })
        setResultados(data)
      } catch (error) {
        console.error("Erro ao buscar pessoas na página de busca:", error)
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
  }, [nome, faixaIdadeInicial, faixaIdadeFinal, sexo, status, pagina, porPagina, toast])

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
      <main className="flex-1 bg-gray-50">
        <div className="container py-12">
          <div className="mx-auto max-w-5xl space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="heading-2">Buscar na Base de Casos Registrados</h1>
              <p className="text-text-secondary">
                Pesquise em nossa base abrangente de indivíduos desaparecidos e encontrados.
              </p>
            </div>

            <Card className="shadow-md">
              <CardHeader className="bg-gradient-to-r from-primary to-accent text-white">
                <CardTitle>Filtros de Busca</CardTitle>
                <CardDescription className="text-white/80">Refine sua busca usando os filtros abaixo</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form action="/buscar" method="get" className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="nome" className="text-text-secondary">
                        Nome
                      </Label>
                      <Input
                        id="nome"
                        name="nome"
                        placeholder="Digite o nome completo ou parcial"
                        defaultValue={nome}
                        className="border-gray-300 focus:border-primary focus:ring-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status" className="text-text-secondary">
                        Tipo de Caso
                      </Label>
                      <Select name="status" defaultValue={status}>
                        <SelectTrigger id="status" className="border-gray-300 focus:border-primary focus:ring-primary">
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
                          defaultValue={faixaIdadeInicial}
                          className="border-gray-300 focus:border-primary focus:ring-primary"
                        />
                        <span className="text-text-secondary">até</span>
                        <Input
                          id="faixaIdadeFinal"
                          name="faixaIdadeFinal"
                          type="number"
                          placeholder="Máx"
                          defaultValue={faixaIdadeFinal}
                          className="border-gray-300 focus:border-primary focus:ring-primary"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sexo" className="text-text-secondary">
                        Gênero
                      </Label>
                      <Select name="sexo" defaultValue={sexo || "QUALQUER"}>
                        <SelectTrigger id="sexo" className="border-gray-300 focus:border-primary focus:ring-primary">
                          <SelectValue placeholder="Qualquer" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="QUALQUER">Qualquer</SelectItem>
                          <SelectItem value="MASCULINO">Masculino</SelectItem>
                          <SelectItem value="FEMININO">Feminino</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <input type="hidden" name="pagina" value="0" />
                    <input type="hidden" name="porPagina" value={porPagina.toString()} />
                  </div>

                  <div className="flex flex-col sm:flex-row justify-end gap-4">
                    <Button
                      variant="outline"
                      type="reset"
                      className="border-gray-300 text-text-secondary hover:bg-gray-100"
                    >
                      Limpar Filtros
                    </Button>
                    <Button type="submit" className="bg-primary text-white hover:bg-primary-dark">
                      Buscar
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Tabs defaultValue={activeTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-white shadow-sm">
                <TabsTrigger
                  value="desaparecidos"
                  onClick={() => (window.location.href = `/buscar?status=DESAPARECIDO&pagina=0&porPagina=${porPagina}`)}
                  className="data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  Pessoas Desaparecidas
                </TabsTrigger>
                <TabsTrigger
                  value="encontrados"
                  onClick={() => (window.location.href = `/buscar?status=LOCALIZADO&pagina=0&porPagina=${porPagina}`)}
                  className="data-[state=active]:bg-secondary data-[state=active]:text-text-primary"
                >
                  Pessoas Encontradas
                </TabsTrigger>
              </TabsList>
              <TabsContent value={activeTab} className="mt-6">
                {isLoading ? (
                  <div className="flex justify-center py-10">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                  </div>
                ) : (
                  // Alterar o grid para mostrar 4 cards por linha (3 em telas médias)
                  <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {resultados.content && resultados.content.length > 0 ? (
                      resultados.content.map((pessoa) => <PessoaCard key={pessoa.id} pessoa={pessoa} />)
                    ) : (
                      <div className="col-span-full text-center py-10 bg-white rounded-lg shadow-sm">
                        <p className="text-text-secondary">Nenhum resultado encontrado para os filtros selecionados.</p>
                      </div>
                    )}
                  </div>
                )}

                {resultados.totalPages > 1 && (
                  <div className="mt-8 flex flex-col items-center">
                    <div className="text-sm text-text-secondary mb-2">
                      Página {pagina + 1} de {resultados.totalPages}
                    </div>
                    <Pagination>
                      <PaginationContent>
                        {pagina > 0 && (
                          <PaginationItem>
                            <PaginationPrevious
                              href={`/buscar?nome=${nome}&status=${status}&faixaIdadeInicial=${faixaIdadeInicial || ""}&faixaIdadeFinal=${faixaIdadeFinal || ""}&sexo=${sexo || ""}&pagina=${pagina - 1}&porPagina=${porPagina}`}
                              className="hover:bg-primary hover:text-white"
                            />
                          </PaginationItem>
                        )}

                        {/* Mostrar primeira página */}
                        {pagina > 2 && (
                          <PaginationItem>
                            <PaginationLink
                              href={`/buscar?nome=${nome}&status=${status}&faixaIdadeInicial=${faixaIdadeInicial || ""}&faixaIdadeFinal=${faixaIdadeFinal || ""}&sexo=${sexo || ""}&pagina=0&porPagina=${porPagina}`}
                              className="hover:bg-primary/10"
                            >
                              1
                            </PaginationLink>
                          </PaginationItem>
                        )}

                        {/* Mostrar elipses se necessário */}
                        {pagina > 3 && (
                          <PaginationItem>
                            <PaginationEllipsis />
                          </PaginationItem>
                        )}

                        {/* Mostrar páginas ao redor da página atual */}
                        {Array.from({ length: resultados.totalPages }, (_, i) => {
                          // Mostrar 2 páginas antes e depois da atual, ou ajustar conforme necessário
                          if (i >= Math.max(0, pagina - 2) && i <= Math.min(resultados.totalPages - 1, pagina + 2)) {
                            const pageNumber = i
                            const isActive = pageNumber === pagina

                            return (
                              <PaginationItem key={i}>
                                <PaginationLink
                                  href={`/buscar?nome=${nome}&status=${status}&faixaIdadeInicial=${faixaIdadeInicial || ""}&faixaIdadeFinal=${faixaIdadeFinal || ""}&sexo=${sexo || ""}&pagina=${pageNumber}&porPagina=${porPagina}`}
                                  isActive={isActive}
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
                        {pagina < resultados.totalPages - 4 && (
                          <PaginationItem>
                            <PaginationEllipsis />
                          </PaginationItem>
                        )}

                        {/* Mostrar última página */}
                        {pagina < resultados.totalPages - 3 && (
                          <PaginationItem>
                            <PaginationLink
                              href={`/buscar?nome=${nome}&status=${status}&faixaIdadeInicial=${faixaIdadeInicial || ""}&faixaIdadeFinal=${faixaIdadeFinal || ""}&sexo=${sexo || ""}&pagina=${resultados.totalPages - 1}&porPagina=${porPagina}`}
                              className="hover:bg-primary/10"
                            >
                              {resultados.totalPages}
                            </PaginationLink>
                          </PaginationItem>
                        )}

                        {pagina < resultados.totalPages - 1 && (
                          <PaginationItem>
                            <PaginationNext
                              href={`/buscar?nome=${nome}&status=${status}&faixaIdadeInicial=${faixaIdadeInicial || ""}&faixaIdadeFinal=${faixaIdadeFinal || ""}&sexo=${sexo || ""}&pagina=${pagina + 1}&porPagina=${porPagina}`}
                              className="hover:bg-primary hover:text-white"
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

