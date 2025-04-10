# 🚨 Desaparecidos - PJC

## 📜 Dados de Inscrição: 
  - **Inscrição: 10068**
  - **Nome: ALEX SANDRO PEREIRA GARCIA**

## 📌 Sobre o Projeto  

**Desafio do Processo Seletivo Seplag**  

Este projeto foi desenvolvido utilizando a API **ABITUS** da Polícia Judiciária Civil (PJC), com o objetivo de facilitar a busca e a divulgação de informações sobre pessoas desaparecidas.  

🔍 **Funcionalidades Principais:**  
- Buscar por pessoas desaparecidas ou encontradas.  
- Reportar novos casos de desaparecimento.  
- Reportar pessoas encontradas.  
- Enviar informações sobre casos existentes.  
- Compartilhar casos nas redes sociais.  

A API **ABITUS** gerencia os dados de pessoas desaparecidas e encontradas. No entanto, algumas funcionalidades, como o reporte de casos de desaparecimento, não estão presentes na API original e foram desenvolvidas como um adicional à aplicação.  

---

## 🚀 Tecnologias Utilizadas  

- **🖥️ Frameworks e Bibliotecas:** Next.js, React, TypeScript  
- **🎨 Estilização:** Tailwind CSS  
- **🐳 Containerização:** Docker  
- **🔗 API:** Integração com API **ABITUS**  

---

## 🛠️ Requisitos para Execução Local  

Antes de rodar o projeto, certifique-se de ter instalado:  

✅ **Node.js** 18.x ou superior  
✅ **npm**  
✅ **Docker e Docker Compose**  
✅ **Git**  

---

## ⚙️ Configuração e Execução  

### ▶️ Execução com Docker  

1. **Clone o repositório:**  

   ```
   git clone https://github.com/kouthk/desafio-front-end-seplag.git  
   ```
   **Abra o Repositorio**
   ```
   cd desaparecidos-online
   ```
2. **Antes de Contruir e Iniciar os Container com o Docker Compose**
Limpe o Docker para evitar conflitos com outros projetos que tenham sido testados anteriormente
    ```
   docker-compose down  
   docker system prune -a --volumes
    ```

3. **Construa e inicie os containers com Docker Compose:**

   ```   
   docker-compose up --build -d  
   ```

4. **Acesse a aplicação no navegador:**

   🔗 http://localhost:3000



    


📜 Considerações Finais:
   **Este projeto foi desenvolvido para fins de avaliação técnica.**
