#!/bin/bash

# Script de Sincronização Unificada para Hub Senegal
# Este script envia todas as alterações em um único commit para evitar sobrecarga no Vercel.

echo "🚀 Iniciando sincronização unificada..."

# 1. Adicionar todas as mudanças
git add .

# 2. Criar um único commit com todas as alterações
# Se não houver mudanças, o git avisará
COMMIT_MSG="Update: $(date +'%Y-%m-%d %H:%M:%S')"
if git commit -m "$COMMIT_MSG"; then
    echo "✅ Alterações agrupadas em um único commit."
    
    # 3. Enviar para o GitHub
    echo "📤 Enviando para o GitHub..."
    if git push origin main; then
        echo "=========================================="
        echo "🎉 SUCESSO! O Vercel iniciará APENAS UMA build."
        echo "=========================================="
    else
        echo "❌ Erro ao enviar para o GitHub. Verifique sua conexão ou permissões."
    fi
else
    echo "ℹ️ Nenhuma alteração detectada para sincronizar."
fi
