# Manual de Identidade Visual e Repositório de Ativos

**Cliente:** Juliana Rangel Advocacia
**Nicho:** Direito Previdenciário (Benefícios do INSS)
**Posicionamento:** Atendimento humanizado, linguagem simples, comunicação moderna, direta e segura.

---

## 1. Arquivo Mestre e Ambiente de Design (Source of Truth)

Todo o sistema de design, grid de alinhamento estrutural e componentização dos logotipos está centralizado no Figma.

- **Link do Projeto:** [Brand Identity Guidelines - Juliana Rangel](https://www.figma.com/design/gQ6pyCVkbtVrEhSOIt7ur9/JULIANA-RANGEL-ADVOCACIA---BRAND-IDENTITY-GUIDELINES?node-id=0-1&t=j0swNbveTugfTrRb-1)
- **Função:** Este arquivo deve ser utilizado como base imutável para exportar novas resoluções, gerar peças para redes sociais, alterar formatos e manter a consistência de qualquer novo material visual do escritório.

---

## 2. Repositório de Ativos (Assets Exportados)

Os arquivos finais gerados estão organizados em diretório e prontos para uso em ambiente de produção (Web e Impressos). Todos os logotipos foram exportados em formato vetorial (`.svg`), garantindo escalabilidade infinita sem perda de resolução e peso otimizado para carregamento rápido.

### 2.1. Monogramas (Aplicações Reduzidas)

Utilizados para Favicon do site, avatares de redes sociais (Instagram/WhatsApp) e selos de garantia.

- `Logo.svg` (Vetor base original puro)
- `Monogram_Dark_on_LightBG.svg`
- `Monogram_Burgundy_on_LightBG.svg`
- `Monogram_Light_on_DarkBG.svg`
- `Monogram_Light_on_BurgundyBG.svg`

### 2.2. Logos Horizontais (Padrão Web)

Uso principal para o cabeçalho (Header) da Landing Page, barra de navegação e cabeçalhos de papel timbrado.

- `Logo_Horizontal_Dark_on_LightBG.svg`
- `Logo_Horizontal_Burgundy_on_LightBG.svg`
- `Logo_Horizontal_Light_on_DarkBG.svg`
- `Logo_Horizontal_Light_on_BurgundyBG.svg`

### 2.3. Logos Verticais (Redes Sociais e Documentos)

Uso recomendado para capas de propostas em PDF, pastas físicas e materiais onde o alinhamento centralizado é predominante.

- `Logo_Vertical_Dark_on_LightBG.svg`
- `Logo_Vertical_Burgundy_on_LightBG.svg`
- `Logo_Vertical_Light_on_DarkBG.svg`
- `Logo_Vertical_Light_on_BurgundyBG.svg`

### 2.4. Logos Institucionais (Assinaturas Completas)

Contêm dados de contato e registro profissional (OAB). Essenciais para rodapés de sites, contratos e rodapés de documentos oficiais.

- `Institutional_Dark_on_LightBG.svg`
- `Institutional_Burgundy_on_LightBG.svg`
- `Institutional_Light_on_DarkBG.svg`
- `Institutional_Light_on_BurgundyBG.svg`

### 2.5. Fotografia e Mídia

- `foto_adv_juliana_rangel.jpg`: Retrato oficial destinado à seção "Sobre a Profissional" na Landing Page. (Pode ser submetida a recorte de fundo transparente dependendo da aplicação no layout final).

---

## 3. Paleta de Cores Oficial

A paleta foi construída para transmitir autoridade (Vinho), sobriedade na leitura (Grafite Escuro) e foco total na conversão (Verde).

| Cor | Nome Técnico            | HEX (Web) | RGB (Telas)     | Uso Principal                                     |
| :-- | :---------------------- | :-------- | :-------------- | :------------------------------------------------ |
| 🔴  | **Vinho Institucional** | `#590F12` | `89, 15, 18`    | Logos, Ícones, Linhas e Elementos de Destaque.    |
| ⚫  | **Grafite Escuro**      | `#1E1E1E` | `30, 30, 30`    | Textos longos, Títulos e Logos em fundo claro.    |
| ⚪  | **Branco Puro**         | `#FFFFFF` | `255, 255, 255` | Fundo principal do site e logos em fundo escuro.  |
| 🟢  | **Verde Conversão**     | `#25D366` | `37, 211, 102`  | **Exclusivo:** Botões de Ação (WhatsApp/Contato). |

---

## 4. Sistema Tipográfico (Fontes)

O sistema utiliza o Google Fonts, contrastando a elegância da fonte Serifada com a leiturabilidade moderna da fonte Sans-Serif.

### 4.1. Títulos e Destaques (Heading Font)

- **Família:** `Cinzel` (Serif)
- **Pesos (Weights):** Regular (400), SemiBold (600), Bold (700)
- **Uso:** Nome do escritório e Títulos das seções da Landing Page (H1, H2, H3).

### 4.2. Corpo de Texto e Subtítulos (Body Font)

- **Família:** `Montserrat` (Sans-Serif)
- **Pesos (Weights):** Light (300), Regular (400), Medium (500)
- **Uso:** Textos informativos, descrições de serviços e FAQs. Em legendas maiúsculas (ex: "ADVOGADA"), aplicar `letter-spacing` expandido (ex: `0.3em` ou `30%`).

---

## 5. Próximos Desdobramentos (Geração de Novos Ativos)

Com a fundação técnica acima estabelecida e os arquivos já exportados, o projeto possui capacidade imediata para gerar as seguintes ramificações institucionais:

1. **Padrões de Fundo (Marcas d'água):** Utilizando o arquivo `Logo.svg` com redução de opacidade (ex: 5% a 10%), é possível criar backgrounds elegantes para seções intercaladas da Landing Page ou para o fundo de apresentações institucionais.
2. **Assinaturas de E-mail Dinâmicas (HTML):** Estruturação do código da assinatura padrão do escritório utilizando as fontes definidas, cores HEX oficiais e o apontamento em nuvem para o `Institutional_Burgundy_on_LightBG.svg`.
3. **Templates Sociais Iniciais:** Utilização do arquivo do Figma como base para derivar um sistema de templates para postagens informativas sobre o INSS no Instagram.
4. **Iconografia Padronizada:** A paleta (Vinho `#590F12`) e o estilo de traço (stroke de 2px) estão definidos e prontos para serem aplicados em bibliotecas open-source (como Lucide ou Phosphor) visando a ilustração visual dos nove benefícios previdenciários na etapa de desenvolvimento front-end.
