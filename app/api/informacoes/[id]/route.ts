import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Obter o ID da pessoa da URL
    const id = params.id

    // Processar o FormData da requisição
    const formData = await request.formData()

    // Extrair os dados do formulário
    const nome = formData.get("nome")
    const telefone = formData.get("telefone")
    const email = formData.get("email")
    const dataAvistamento = formData.get("dataAvistamento")
    const localAvistamento = formData.get("localAvistamento")
    const informacoes = formData.get("informacoes")

    // Extrair as fotos (se houver)
    const fotos: File[] = []
    for (const [key, value] of formData.entries()) {
      if (key.startsWith("foto_") && value instanceof File) {
        fotos.push(value)
      }
    }

    // Aqui você normalmente enviaria esses dados para um banco de dados ou serviço externo
    console.log("Informações recebidas:", {
      pessoaId: id,
      nome,
      telefone,
      email,
      dataAvistamento,
      localAvistamento,
      informacoes,
      quantidadeFotos: fotos.length,
    })

    // Simular um pequeno atraso para tornar a experiência mais realista
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Retornar uma resposta de sucesso
    return NextResponse.json({
      success: true,
      message: "Informações recebidas com sucesso",
      data: {
        pessoaId: id,
        nome,
        telefone,
        dataAvistamento,
        localAvistamento,
        quantidadeFotos: fotos.length,
      },
    })
  } catch (error) {
    console.error("Erro ao processar informações:", error)

    // Retornar uma resposta de erro
    return NextResponse.json({ success: false, message: "Erro ao processar as informações" }, { status: 500 })
  }
}

