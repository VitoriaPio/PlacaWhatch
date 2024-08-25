# Placa Watch - API de Reconhecimento de Placas de Veículos

Este projeto é uma aplicação web desenvolvida com Node.js, Express.js e React para gerenciar o reconhecimento e o armazenamento de informações de placas de veículos usando OCR (Reconhecimento Óptico de Caracteres) e interagindo com um banco de dados PostgreSQL.

## Funcionalidades

- Upload de Fotos: Os usuários podem enviar uma foto de uma placa de veículo e o nome de uma cidade através da interface web.
- Processamento de OCR: A aplicação utiliza a biblioteca Tesseract.js para reconhecer automaticamente o número da placa nas imagens enviadas.
- Armazenamento de Dados: Informações sobre a placa reconhecida, cidade, data e hora são armazenadas em um banco de dados PostgreSQL.
- Geração de Relatórios em PDF: É possível gerar relatórios em PDF para download contendo todas as placas registradas de uma cidade específica.
- Consulta de Placas: Verifica se uma placa específica está registrada no banco de dados.

## Design no Figma

Link para o design no Figma: https://www.figma.com/design/bCzy7g6gVwWmfpcWwUA4Z9/Untitled?node-id=4-213&t=Ggwj4czNR6O91iGU-1

## Home

![home1](https://github.com/user-attachments/assets/74bc952a-ca0f-4d6b-80e8-fdced99f0f94)

## Tela Upload de placa

![pag-2](https://github.com/user-attachments/assets/0ee3eeae-861e-4c1a-8045-8c5523e0958d)

## Tela Consulta de placa

![pag-3](https://github.com/user-attachments/assets/5669c9d8-94b2-40df-af37-8865e7eb6b93)

## Tela Relatório por cidade

![pag-4](https://github.com/user-attachments/assets/2181abe4-0c8b-4e52-af96-567cadee0587)



