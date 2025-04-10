"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { InputMask } from "@/components/input-mask"
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"

export default function ContatoPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    assunto: "",
    mensagem: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulação de envio
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Mensagem enviada com sucesso!",
        description: "Agradecemos seu contato. Responderemos o mais breve possível.",
      })

      // Limpar formulário
      setFormData({
        nome: "",
        email: "",
        telefone: "",
        assunto: "",
        mensagem: "",
      })
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error)
      toast({
        title: "Erro ao enviar mensagem",
        description: "Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
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
            <Link href="/contato" className="text-sm font-medium text-primary hover:underline underline-offset-4">
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
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-primary-dark via-primary to-accent text-text-light">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Entre em Contato
                </h1>
                <p className="mx-auto max-w-[700px] text-text-light/80 md:text-xl">
                  Estamos à disposição para ajudar e responder suas dúvidas
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 md:grid-cols-2 lg:gap-16">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter mb-6 text-primary-dark">Fale Conosco</h2>
                <p className="text-text-secondary text-lg leading-relaxed mb-8">
                  Utilize o formulário ao lado para enviar sua mensagem ou entre em contato diretamente através dos
                  canais abaixo. Estamos prontos para ajudar.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="mr-4 mt-1">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-primary-dark">Telefone</h3>
                      <p className="text-text-secondary">(65) 3613-5617</p>
                      <p className="text-text-secondary">(65) 3613-5618</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-4 mt-1">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-primary-dark">E-mail</h3>
                      <p className="text-text-secondary">contato@pjc.mt.gov.br</p>
                      <p className="text-text-secondary">desaparecidos@pjc.mt.gov.br</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-4 mt-1">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-primary-dark">Endereço</h3>
                      <p className="text-text-secondary">
                        Delegacia Especializada de Pessoas Desaparecidas
                        <br />
                        Rua Batista das Neves, 155 - Centro
                        <br />
                        Cuiabá - MT, 78005-190
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-4 mt-1">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-primary-dark">Horário de Atendimento</h3>
                      <p className="text-text-secondary">
                        Segunda a Sexta: 8h às 18h
                        <br />
                        Plantão 24h para casos urgentes
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Card className="shadow-md">
                  <CardHeader className="bg-gradient-to-r from-primary to-accent text-white">
                    <CardTitle>Formulário de Contato</CardTitle>
                    <CardDescription className="text-white/80">
                      Preencha o formulário abaixo para enviar sua mensagem
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="nome" className="text-text-secondary">
                          Nome Completo *
                        </Label>
                        <Input
                          id="nome"
                          name="nome"
                          placeholder="Digite seu nome completo"
                          value={formData.nome}
                          onChange={handleInputChange}
                          className="border-gray-300 focus:border-primary focus:ring-primary"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-text-secondary">
                            E-mail *
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="seu.email@exemplo.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="border-gray-300 focus:border-primary focus:ring-primary"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="telefone" className="text-text-secondary">
                            Telefone
                          </Label>
                          <InputMask
                            id="telefone"
                            name="telefone"
                            mask="(99) 99999-9999"
                            placeholder="(00) 00000-0000"
                            value={formData.telefone}
                            onChange={handleInputChange}
                            className="border-gray-300 focus:border-primary focus:ring-primary"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="assunto" className="text-text-secondary">
                          Assunto *
                        </Label>
                        <Input
                          id="assunto"
                          name="assunto"
                          placeholder="Digite o assunto da mensagem"
                          value={formData.assunto}
                          onChange={handleInputChange}
                          className="border-gray-300 focus:border-primary focus:ring-primary"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="mensagem" className="text-text-secondary">
                          Mensagem *
                        </Label>
                        <Textarea
                          id="mensagem"
                          name="mensagem"
                          placeholder="Digite sua mensagem"
                          value={formData.mensagem}
                          onChange={handleInputChange}
                          className="min-h-[150px] border-gray-300 focus:border-primary focus:ring-primary"
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary text-white hover:bg-primary-dark"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                            Enviando...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" /> Enviar Mensagem
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 bg-white">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tighter mb-6 text-primary-dark">Localização</h2>
              <div className="aspect-video w-full rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3842.6690109620897!2d-56.09945492394567!3d-15.598141123870493!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x939db1e169af7e85%3A0x4ab25d3d95a782b3!2sR.%20Batista%20das%20Neves%2C%20155%20-%20Centro%20Norte%2C%20Cuiab%C3%A1%20-%20MT%2C%2078005-190!5e0!3m2!1spt-BR!2sbr!4v1712018427121!5m2!1spt-BR!2sbr"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
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

