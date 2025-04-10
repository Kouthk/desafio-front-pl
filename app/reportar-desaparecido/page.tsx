"use client"

import type React from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { InputMask } from "@/components/input-mask"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { useState } from "react"
import { Upload, MapPin, AlertTriangle } from "lucide-react"

export default function ReportarDesaparecidoPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    nomePessoa: "",
    idade: "",
    sexo: "",
    dataDesaparecimento: "",
    localDesaparecimento: "",
    circunstancias: "",
    vestimentas: "",
    caracteristicas: "",
    nomeInformante: "",
    telefone: "",
    email: "",
    fotos: [] as File[],
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files)
      setFormData((prev) => ({ ...prev, fotos: [...prev.fotos, ...filesArray] }))
    }
  }

  const removeFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      fotos: prev.fotos.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Aqui seria implementada a chamada à API para enviar as informações
      // Como é um exemplo, vamos apenas simular o envio
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Informações enviadas com sucesso!",
        description: "Agradecemos sua colaboração. As autoridades analisarão as informações fornecidas.",
      })

      // Redirecionar para a página inicial após alguns segundos
      setTimeout(() => {
        router.push("/")
      }, 3000)
    } catch (error) {
      console.error("Erro ao enviar informações:", error)
      toast({
        title: "Erro ao enviar informações",
        description: "Ocorreu um erro ao enviar as informações. Por favor, tente novamente.",
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
              className="text-sm font-medium text-primary hover:underline underline-offset-4"
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
          <div className="mx-auto max-w-3xl space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="heading-2">Reportar Pessoa Desaparecida</h1>
              <p className="text-text-secondary">
                Preencha o formulário abaixo com informações sobre a pessoa desaparecida. Quanto mais detalhes você
                fornecer, maiores as chances de encontrá-la.
              </p>
            </div>

            <Card className="shadow-md overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-primary to-accent text-white">
                <CardTitle>Formulário de Registro</CardTitle>
                <CardDescription className="text-white/80">
                  Todos os campos marcados com * são obrigatórios
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-primary-dark border-b pb-2">
                      Dados da Pessoa Desaparecida
                    </h3>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="nomePessoa" className="text-text-secondary">
                          Nome Completo *
                        </Label>
                        <Input
                          id="nomePessoa"
                          name="nomePessoa"
                          placeholder="Digite o nome completo"
                          value={formData.nomePessoa}
                          onChange={handleInputChange}
                          className="border-gray-300 focus:border-primary focus:ring-primary"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="idade" className="text-text-secondary">
                          Idade *
                        </Label>
                        <Input
                          id="idade"
                          name="idade"
                          type="number"
                          placeholder="Digite a idade"
                          value={formData.idade}
                          onChange={handleInputChange}
                          className="border-gray-300 focus:border-primary focus:ring-primary"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="sexo" className="text-text-secondary">
                        Gênero *
                      </Label>
                      <select
                        id="sexo"
                        name="sexo"
                        value={formData.sexo}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 p-2 focus:border-primary focus:ring-primary"
                        required
                      >
                        <option value="">Selecione</option>
                        <option value="MASCULINO">Masculino</option>
                        <option value="FEMININO">Feminino</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="dataDesaparecimento" className="text-text-secondary">
                          Data do Desaparecimento *
                        </Label>
                        <Input
                          id="dataDesaparecimento"
                          name="dataDesaparecimento"
                          type="date"
                          value={formData.dataDesaparecimento}
                          onChange={handleInputChange}
                          className="border-gray-300 focus:border-primary focus:ring-primary"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="localDesaparecimento" className="text-text-secondary">
                          Local do Desaparecimento *
                        </Label>
                        <div className="relative">
                          <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-text-muted" />
                          <Input
                            id="localDesaparecimento"
                            name="localDesaparecimento"
                            placeholder="Endereço, cidade, estado"
                            className="pl-8 border-gray-300 focus:border-primary focus:ring-primary"
                            value={formData.localDesaparecimento}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="circunstancias" className="text-text-secondary">
                        Circunstâncias do Desaparecimento *
                      </Label>
                      <Textarea
                        id="circunstancias"
                        name="circunstancias"
                        placeholder="Descreva detalhadamente as circunstâncias do desaparecimento"
                        className="min-h-[100px] border-gray-300 focus:border-primary focus:ring-primary"
                        value={formData.circunstancias}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="vestimentas" className="text-text-secondary">
                        Vestimentas no Momento do Desaparecimento
                      </Label>
                      <Textarea
                        id="vestimentas"
                        name="vestimentas"
                        placeholder="Descreva as roupas e acessórios que a pessoa usava"
                        className="min-h-[80px] border-gray-300 focus:border-primary focus:ring-primary"
                        value={formData.vestimentas}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="caracteristicas" className="text-text-secondary">
                        Características Físicas
                      </Label>
                      <Textarea
                        id="caracteristicas"
                        name="caracteristicas"
                        placeholder="Descreva características físicas marcantes, como tatuagens, cicatrizes, etc."
                        className="min-h-[80px] border-gray-300 focus:border-primary focus:ring-primary"
                        value={formData.caracteristicas}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="fotos" className="text-text-secondary">
                        Fotos da Pessoa *
                      </Label>
                      <div className="border border-gray-300 rounded-md p-4">
                        <div className="flex items-center justify-center w-full">
                          <label
                            htmlFor="fotos"
                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Upload className="w-8 h-8 mb-2 text-text-muted" />
                              <p className="mb-2 text-sm text-text-secondary">
                                <span className="font-semibold">Clique para enviar</span> ou arraste e solte
                              </p>
                              <p className="text-xs text-text-muted">PNG, JPG ou JPEG (máx. 5MB por arquivo)</p>
                            </div>
                            <input
                              id="fotos"
                              name="fotos"
                              type="file"
                              accept="image/png, image/jpeg, image/jpg"
                              className="hidden"
                              multiple
                              onChange={handleFileChange}
                              required={formData.fotos.length === 0}
                            />
                          </label>
                        </div>

                        {formData.fotos.length > 0 && (
                          <div className="mt-4 space-y-2">
                            <p className="text-sm font-medium text-text-secondary">Fotos selecionadas:</p>
                            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                              {formData.fotos.map((file, index) => (
                                <div key={index} className="relative group">
                                  <div className="aspect-square rounded-md overflow-hidden border">
                                    <img
                                      src={URL.createObjectURL(file) || "/placeholder.svg"}
                                      alt={`Foto ${index + 1}`}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => removeFile(index)}
                                    className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    >
                                      <path d="M18 6L6 18"></path>
                                      <path d="M6 6l12 12"></path>
                                    </svg>
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-primary-dark border-b pb-2 mt-6">Dados do Informante</h3>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="nomeInformante" className="text-text-secondary">
                          Seu Nome Completo *
                        </Label>
                        <Input
                          id="nomeInformante"
                          name="nomeInformante"
                          placeholder="Digite seu nome completo"
                          value={formData.nomeInformante}
                          onChange={handleInputChange}
                          className="border-gray-300 focus:border-primary focus:ring-primary"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="telefone" className="text-text-secondary">
                          Telefone para Contato *
                        </Label>
                        <InputMask
                          id="telefone"
                          name="telefone"
                          mask="(99) 99999-9999"
                          placeholder="(00) 00000-0000"
                          value={formData.telefone}
                          onChange={handleInputChange}
                          className="border-gray-300 focus:border-primary focus:ring-primary"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-text-secondary">
                        E-mail para Contato *
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
                  </div>

                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <div className="flex items-start">
                      <AlertTriangle className="mr-2 h-5 w-5 text-amber-500 mt-0.5" />
                      <p className="text-sm text-amber-800">
                        Todas as informações enviadas serão tratadas com confidencialidade e repassadas às autoridades
                        competentes. Fornecer informações falsas é crime previsto no Código Penal.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-end gap-4">
                    <Button
                      variant="outline"
                      type="button"
                      onClick={() => router.push("/")}
                      className="border-gray-300 text-text-secondary hover:bg-gray-100"
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-primary text-white hover:bg-primary-dark"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                          Enviando...
                        </>
                      ) : (
                        "Enviar Informações"
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
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

