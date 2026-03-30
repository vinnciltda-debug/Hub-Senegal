#!/bin/bash

# Script de Servidor Local para Hub Senegal (Mac/Linux)
# Executa um servidor HTTP local na porta 8000 para visualização do site.

echo "🚀 Iniciando Servidor Local em http://localhost:8000"
echo "Para encerrar o servidor, pressione: CTRL + C"

# Usando o servidor nativo do Python (quase sempre disponível no Mac)
python3 -m http.server 8000
