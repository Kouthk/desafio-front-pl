"use client"

import type React from "react"
import { useState, useEffect, forwardRef } from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface InputMaskProps extends React.InputHTMLAttributes<HTMLInputElement> {
  mask: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const InputMask = forwardRef<HTMLInputElement, InputMaskProps>(
  ({ mask, value = "", onChange, className, ...props }, ref) => {
    const [inputValue, setInputValue] = useState("")

    useEffect(() => {
      // Aplicar a máscara ao valor inicial
      if (value) {
        setInputValue(applyMask(value, mask))
      }
    }, [value, mask])

    const applyMask = (value: string, mask: string) => {
      let result = ""
      let valueIndex = 0

      for (let i = 0; i < mask.length && valueIndex < value.length; i++) {
        if (mask[i] === "9") {
          // Dígito
          if (/\d/.test(value[valueIndex])) {
            result += value[valueIndex]
            valueIndex++
          }
        } else if (mask[i] === "A") {
          // Letra
          if (/[a-zA-Z]/.test(value[valueIndex])) {
            result += value[valueIndex]
            valueIndex++
          }
        } else if (mask[i] === "*") {
          // Qualquer caractere
          result += value[valueIndex]
          valueIndex++
        } else {
          // Caractere especial da máscara
          result += mask[i]
          if (value[valueIndex] === mask[i]) {
            valueIndex++
          }
        }
      }

      return result
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target

      // Remover caracteres não numéricos para máscaras de telefone, CPF, etc.
      const digits = value.replace(/\D/g, "")

      // Aplicar a máscara
      const maskedValue = applyMask(digits, mask)

      // Atualizar o valor do input
      setInputValue(maskedValue)

      // Criar um novo evento com o valor mascarado
      const newEvent = {
        ...e,
        target: {
          ...e.target,
          value: maskedValue,
          name: e.target.name,
        },
      } as React.ChangeEvent<HTMLInputElement>

      // Chamar o onChange original
      if (onChange) {
        onChange(newEvent)
      }
    }

    return <Input ref={ref} value={inputValue} onChange={handleChange} className={cn(className)} {...props} />
  },
)

InputMask.displayName = "InputMask"

