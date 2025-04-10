// Tipos baseados na API ABITUS
export interface PessoaDTO {
  id: number
  nome: string
  idade: number
  sexo: "MASCULINO" | "FEMININO"
  vivo: boolean
  urlFoto: string
  ultimaOcorrencia?: OcorrenciaDTO
}

export interface OcorrenciaDTO {
  dtDesaparecimento: string
  dataLocalizacao?: string
  encontradoVivo?: boolean
  localDesaparecimentoConcat?: string
  ocorrenciaEntrevDesapDTO?: OcorrenciaEntrevDesapDTO
  listaCartaz?: OcorrenciaCartazDTO[]
  ocoId: number
}

export interface OcorrenciaEntrevDesapDTO {
  informacao?: string
  vestimentasDesaparecido?: string
}

export interface OcorrenciaCartazDTO {
  urlCartaz?: string
  tipoCartaz?: string
}

export interface OcorrenciaInformacaoDTO {
  ocoId: number
  informacao: string
  data: string
  id?: number
  anexos?: string[]
}

export interface PagePessoaDTO {
  totalPages: number
  totalElements: number
  numberOfElements: number
  first: boolean
  last: boolean
  size: number
  content: PessoaDTO[]
  number: number
  empty: boolean
}

export interface EstatisticaPessoaDTO {
  quantPessoasDesaparecidas: number
  quantPessoasEncontradas: number
}

// URL base da API
const API_BASE_URL = "https://abitus-api.geia.vip/v1"

// Função para verificar se estamos no navegador
const isBrowser = typeof window !== "undefined"

// Mensagem de erro padrão
const API_ERROR_MESSAGE =
  "Aparentemente a API fornecida pela PJC pode estar fora do ar, por isso esse serviço não funcionará como o esperado, tente novamente em alguns instantes"

// Função para buscar estatísticas
export async function getEstatisticas(): Promise<EstatisticaPessoaDTO> {
  try {
    // Usar diferentes abordagens dependendo do ambiente
    const url = `${API_BASE_URL}/pessoas/aberto/estatistico`

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(isBrowser && { Origin: window.location.origin }),
      },
      // Remover opções específicas do Next.js que podem causar problemas
      cache: "no-store",
    })

    if (!response.ok) {
      console.error(`Erro na resposta da API: ${response.status} ${response.statusText}`)
      throw new Error(`Erro ao buscar estatísticas: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Erro ao buscar estatísticas:", error)
    throw new Error(API_ERROR_MESSAGE)
  }
}

// Função para buscar pessoas desaparecidas
export async function getPessoasDesaparecidas(
  pagina = 0,
  porPagina = 10,
  filtros: {
    nome?: string
    faixaIdadeInicial?: number
    faixaIdadeFinal?: number
    sexo?: "MASCULINO" | "FEMININO"
    status?: "DESAPARECIDO" | "LOCALIZADO"
  } = {},
): Promise<PagePessoaDTO> {
  try {
    // Construir a URL com os parâmetros de consulta
    let url = `${API_BASE_URL}/pessoas/aberto/filtro?pagina=${pagina}&porPagina=${porPagina}`

    // Adicionar filtros se fornecidos
    if (filtros.nome) url += `&nome=${encodeURIComponent(filtros.nome)}`
    if (filtros.faixaIdadeInicial) url += `&faixaIdadeInicial=${filtros.faixaIdadeInicial}`
    if (filtros.faixaIdadeFinal) url += `&faixaIdadeFinal=${filtros.faixaIdadeFinal}`
    if (filtros.sexo && filtros.sexo !== "QUALQUER") url += `&sexo=${filtros.sexo}`
    if (filtros.status) url += `&status=${filtros.status}`

    // Fazer a requisição
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(isBrowser && { Origin: window.location.origin }),
      },
      cache: "no-store",
    })

    // Verificar se a resposta foi bem-sucedida
    if (!response.ok) {
      console.error(`Erro na resposta da API: ${response.status} ${response.statusText}`)
      throw new Error(`Erro ao buscar pessoas: ${response.status}`)
    }

    // Retornar os dados
    return await response.json()
  } catch (error) {
    console.error("Erro ao buscar pessoas desaparecidas:", error)
    throw new Error(API_ERROR_MESSAGE)
  }
}

// Função para buscar detalhes de uma pessoa específica
export async function getPessoaDetalhes(id: number): Promise<PessoaDTO> {
  try {
    const response = await fetch(`${API_BASE_URL}/pessoas/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(isBrowser && { Origin: window.location.origin }),
      },
      cache: "no-store",
    })

    if (!response.ok) {
      console.error(`Erro na resposta da API: ${response.status} ${response.statusText}`)
      throw new Error(`Erro ao buscar detalhes da pessoa: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Erro ao buscar detalhes da pessoa ${id}:`, error)
    throw new Error(API_ERROR_MESSAGE)
  }
}

// Função para buscar pessoas aleatórias com fotos
export async function getPessoasAleatorias(registros = 4): Promise<PessoaDTO[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/pessoas/aberto/dinamico?registros=${registros}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(isBrowser && { Origin: window.location.origin }),
      },
      cache: "no-store",
    })

    if (!response.ok) {
      console.error(`Erro na resposta da API: ${response.status} ${response.statusText}`)
      throw new Error(`Erro ao buscar pessoas aleatórias: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Erro ao buscar pessoas aleatórias:", error)
    throw new Error(API_ERROR_MESSAGE)
  }
}

// Função para buscar informações de uma ocorrência
export async function getOcorrenciaInformacoes(ocorrenciaId: number): Promise<OcorrenciaInformacaoDTO[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/ocorrencias/informacoes-desaparecido?ocorrenciaId=${ocorrenciaId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(isBrowser && { Origin: window.location.origin }),
      },
      cache: "no-store",
    })

    if (!response.ok) {
      console.error(`Erro na resposta da API: ${response.status} ${response.statusText}`)
      throw new Error(`Erro ao buscar informações da ocorrência: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Erro ao buscar informações da ocorrência ${ocorrenciaId}:`, error)
    throw new Error(API_ERROR_MESSAGE)
  }
}

