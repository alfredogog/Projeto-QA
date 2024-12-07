Feature: Testes de usabilidade no Portal da Transparência

  Background:
    Given que estou na página inicial do Portal da Transparência

  Scenario: Deve exibir a imagem utilizada como título principal
    Then a imagem utilizada como título principal deve ser exibida

  Scenario: Deve navegar para a página de Receitas
    When clico no link "Receitas"
    Then devo ser direcionado para a página de receitas

  Scenario: Deve exibir os links úteis
    Then os links úteis devem ser exibidos

  Scenario: Deve buscar e listar corretamente por "Receitas"
    When navego pelo menu para receitas
    And clico para buscar receitas
    Then a aba de receitas deve exibir "Tabela"

  Scenario: Pesquisar obras públicas de 2020
    When clico em "Obras Públicas"
    Then a URL deve incluir "/obras"
    When seleciono o ano "2020"
    And clico em pesquisar
    Then os resultados devem ser exibidos

  Scenario: Deve exibir e funcionar o botão de WhatsApp
    Then o botão de WhatsApp deve estar visível e funcional

  Scenario: Deve funcionar o menu em dispositivos móveis
    Given que estou em um dispositivo móvel
    When abro o menu
    Then o menu deve estar visível

  Scenario: Deve exibir últimas notícias
    Then as últimas notícias devem ser exibidas

  Scenario: Deve abrir o modal ao clicar no botão "Abra uma Demanda"
    When clico no botão "Abra uma Demanda"
    Then o modal deve exibir "Registrar manifestação"

  Scenario: Deve exibir uma aba contendo as buscas da página
    Then a aba de buscas deve estar visível