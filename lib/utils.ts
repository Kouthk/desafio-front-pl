import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function formatarData(dataString: string | undefined): string {
  if (!dataString) return "Data não informada"

  try {
    const data = new Date(dataString)
    const dia = String(data.getDate()).padStart(2, "0")
    const mes = String(data.getMonth() + 1).padStart(2, "0") // Janeiro é 0!
    const ano = data.getFullYear()
    return `${dia}/${mes}/${ano}`
  } catch (error) {
    console.error("Erro ao formatar data:", error)
    return "Data inválida"
  }
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

