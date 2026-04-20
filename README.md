# Engels Tech — Landing Page

Landing page institucional da Engels Tech, empresa de consultoria em tecnologia especializada em IA, automações e desenvolvimento Python.

## Tecnologias

- HTML5, CSS3, JavaScript (vanilla)
- Google Fonts (Outfit) + Font Awesome 6.4.0
- Design com glassmorphism
- Formulário via [Formspree](https://formspree.io)

## Estrutura

```
landing_page/
├── index.html
├── style.css
├── script.js
└── assets/
    ├── logo.png
    └── images/
        ├── hero.png
        └── innovation.png
```

## Seções

| Seção | Descrição |
|---|---|
| Hero | Tagline principal com CTA |
| Serviços | Grid com 5 serviços (IA, Automações, Python, ML, Consultoria) |
| Inovação | Imagem + conteúdo descritivo |
| Sobre | Apresentação da empresa |
| Contato | Formulário integrado ao Formspree |

## Configuração

Antes de publicar, atualize o endpoint do formulário em `index.html`:

```html
<form action="https://formspree.io/f/SEU_ID_AQUI" method="POST">
```

Crie o formulário em [formspree.io](https://formspree.io) para obter o ID.

## Deploy

Site estático — sem processo de build. Pode ser hospedado em:

- GitHub Pages
- Netlify / Vercel
- Qualquer hospedagem tradicional

Basta fazer upload dos arquivos e o site estará no ar.
