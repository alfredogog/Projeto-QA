/// <reference types="cypress" />

context('Portal da Transparência - Testes de Usabilidade', () => {
    // Antes de cada teste, acessa a página inicial do portal
    beforeEach(() => {
        cy.visit('https://transparencia.joaopessoa.pb.gov.br/');
    });

    // Teste 1: Verificar o título principal da página
    it('Deve exibir o título principal corretamente', () => {
        cy.get('h1').contains('Portal da Transparência').should('be.visible');
    });

    // Teste 2: Testar a funcionalidade de busca do Quadro Geral
    it('Deve buscar corretamente por "receitas"', () => {
        cy.get(':nth-child(5) > .nav-dropdown-toggle').click();
        cy.get('.open > .nav-dropdown-items > :nth-child(1) > .nav-link > span').click();
        cy.get(':nth-child(4) > .btn > .ui-button-text').click();

    });

    // Teste 3: Garantir que o menu lateral está funcionando
    it('Deve navegar para a página de Receitas', () => {
        cy.get('a').contains('Receitas').click();
        cy.url().should('include', '/receitas');
    });

    // Teste 4: Verificar a exibição de links úteis
    it('Deve exibir os links úteis', () => {
        cy.get('.links-uteis').should('be.visible');
    });

    // Teste 5: Validar o formulário de inscrição de boletins
    it('Deve permitir a inscrição no boletim com um e-mail válido', () => {
        cy.get('input[type="email"]').type('teste@teste.com');
        cy.get('button').contains('Inscrever-se').click();
        cy.contains('Inscrição realizada com sucesso').should('be.visible');
    });

    // Teste 6: Testar acessibilidade do botão de WhatsApp
    it('Deve exibir e funcionar o botão de WhatsApp', () => {
        cy.get('a').contains('Ouvidoria via WhatsApp').should('be.visible').click();
        cy.url().should('include', 'whatsapp');
    });

    // Teste 7: Garantir responsividade do menu
    it('Deve funcionar o menu em dispositivos móveis', () => {
        cy.viewport('iphone-x');
        cy.get('.menu-toggle').click();
        cy.get('nav').should('be.visible');
    });

    // Teste 8: Validar seção de notícias
    it('Deve exibir notícias recentes', () => {
        cy.get('.noticias-recentes').find('li').should('have.length.greaterThan', 0);
    });

    // Teste 9: Garantir que o botão "Abrir Demanda" funciona
    it('Deve abrir a página de Demanda ao clicar no botão', () => {
        cy.get('a').contains('Abrir uma Demanda').click();
        cy.url().should('include', '/demandas');
    });

    // Teste 10: Testar a exibição da seção COVID-19
    it('Deve exibir a seção COVID-19 corretamente', () => {
        cy.get('.covid-section').should('be.visible');
    });
});