/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // Ajustar el path para que Tailwind escanee archivos HTML y TS
  ],
  theme: {
    extend: {
      colors: {
        CheeseColorPrimary: '#ff3d12',
        CheeseColorSecondary: '#ff5a40',
        CheeseColorTerciary: '#f2d4c0',
        FondoCrema: '#f0ead6',
        FondoCrema2: '#f2eedd',
        Letra1: '#A52A2A',
        Letra2: '#A86854',
        Letra3: '#F96269',
        Encabezados: '#f20030',
        Encabezados2: '#32127a'
        
        
      },
    },
  },
  plugins: [],
}

