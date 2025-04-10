import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Users, FileText, AlertTriangle, Shield, Clock } from "lucide-react"

export default function SobrePage() {
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
            <Link href="/sobre" className="text-sm font-medium text-primary hover:underline underline-offset-4">
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
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Sobre o Projeto
                </h1>
                <p className="mx-auto max-w-[700px] text-text-light/80 md:text-xl">
                  Conheça a iniciativa da Polícia Judiciária Civil de Mato Grosso para encontrar pessoas desaparecidas
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 md:grid-cols-2 lg:gap-16">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter mb-6 text-primary-dark">Nossa Missão</h2>
                <p className="text-text-secondary text-lg leading-relaxed mb-4">
                  O portal "Encontre Pessoas Desaparecidas" é uma iniciativa da Polícia Judiciária Civil de Mato Grosso
                  que visa facilitar a busca e a divulgação de informações sobre pessoas desaparecidas no estado.
                </p>
                <p className="text-text-secondary text-lg leading-relaxed mb-4">
                  Nossa missão é reunir famílias e entes queridos, oferecendo uma plataforma acessível e eficiente para
                  o registro, busca e compartilhamento de informações sobre desaparecimentos.
                </p>
                <p className="text-text-secondary text-lg leading-relaxed">
                  Acreditamos que a tecnologia, aliada à colaboração da sociedade, pode ser uma ferramenta poderosa na
                  resolução de casos de desaparecimento e na reconexão de famílias.
                </p>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-md aspect-video rounded-lg overflow-hidden shadow-xl">
                  <img
                    src="/placeholder.svg?height=300&width=500&text=PJC-MT"
                    alt="Polícia Judiciária Civil de Mato Grosso"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-gray-50">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter mb-10 text-center text-primary-dark">Como Funciona</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-white shadow-md">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Search className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Busca Eficiente</CardTitle>
                  <CardDescription>
                    Utilize nossos filtros avançados para encontrar informações sobre pessoas desaparecidas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-text-secondary">
                    Nossa plataforma permite buscar por nome, idade, gênero e outras características, facilitando a
                    localização de informações sobre pessoas desaparecidas.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-md">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Registro de Casos</CardTitle>
                  <CardDescription>Reporte desaparecimentos ou informe sobre pessoas encontradas</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-text-secondary">
                    Disponibilizamos formulários específicos para o registro de pessoas desaparecidas e para informar
                    sobre pessoas encontradas que possam estar sendo procuradas.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-md">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Colaboração</CardTitle>
                  <CardDescription>
                    Contribua com informações que possam ajudar a encontrar pessoas desaparecidas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-text-secondary">
                    A colaboração da sociedade é fundamental para o sucesso das buscas. Qualquer informação, por menor
                    que pareça, pode ser decisiva para encontrar alguém.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter mb-10 text-center text-primary-dark">
              Nossos Princípios
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-primary-dark">Segurança</h3>
                <p className="text-text-secondary">
                  Todas as informações são tratadas com o máximo de segurança e confidencialidade, respeitando a
                  privacidade das pessoas envolvidas.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-primary-dark">Agilidade</h3>
                <p className="text-text-secondary">
                  Trabalhamos para que as informações sejam processadas e disponibilizadas com a maior rapidez possível,
                  pois sabemos que o tempo é crucial em casos de desaparecimento.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <AlertTriangle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-primary-dark">Responsabilidade</h3>
                <p className="text-text-secondary">
                  Verificamos todas as informações recebidas antes de publicá-las, garantindo a credibilidade e a
                  confiabilidade do nosso serviço.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-primary-dark text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter">Faça Parte Desta Iniciativa</h2>
                <p className="mx-auto max-w-[700px] text-text-light/80 md:text-xl">
                  Sua colaboração é fundamental para ajudarmos mais pessoas a se reencontrarem
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Button asChild className="bg-highlight text-primary-dark hover:bg-secondary">
                  <Link href="/reportar-desaparecido">Reportar Desaparecido</Link>
                </Button>
                <Button asChild className="bg-white text-primary-dark hover:bg-gray-100">
                  <Link href="/reportar-encontrado">Reportar Encontrado</Link>
                </Button>
                <Button asChild variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link href="/contato">Entre em Contato</Link>
                </Button>
              </div>
            </div>
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
              Email: contato@pjc.mt.gov.br
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

