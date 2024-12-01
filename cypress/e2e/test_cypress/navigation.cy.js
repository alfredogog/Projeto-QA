/// <reference types="cypress" />

context('Portal da Transparência - Testes de Usabilidade', () => {
    // Antes de cada teste, acessa a página inicial do portal
    beforeEach(() => {
        cy.visit('https://transparencia.joaopessoa.pb.gov.br/');
    });

    // Teste 1: Verificar o título principal da página
    it('Deve exibir a imagem que está sendo utilizada como título principal', () => {
        cy.get('.figura-home')
    });

    // Teste 2: Garantir que ao clicar em "receitas", seja direcionado para a página de Receitas
    it('Deve navegar para a página de Receitas (Quadro Geral é o defaut)', () => {
        cy.get('.componente-home.componente-cards > [href="#/receitas/receitas-quadro-geral"] > span').click();
        cy.url().should('include', '/receitas');
    });

    // Teste 3: Verificar a exibição de links úteis
    it('Deve exibir os links úteis', () => {
        cy.get('.componentes-home > :nth-child(9)').should('be.visible');
    });


    // Teste 4: Testar a funcionalidade do menu hamburguer
    it('Deve buscar e listar corretamente por "receitas"', () => {
        cy.get(':nth-child(5) > .nav-dropdown-toggle').click();
        cy.get('.open > .nav-dropdown-items > :nth-child(1) > .nav-link > span').click();
        cy.get('.cdk-overlay-backdrop', { timeout: 10000 }).should('not.exist');
        cy.get(':nth-child(4) > .btn > .ui-button-text').click({ force: true });
        cy.get('#mat-tab-label-0-0')
            .should('be.visible')
            .and('contain', 'Tabela');
    });
    
    // Teste 5: Validar mensagem de erro na inscrição no boletim utilizando e-mail inválido
    it('Deve exibir uma mensagem de erro ao tentar se inscrever no boletim com um e-mail inválido', () => {
        cy.intercept('POST', '**/subscribe/post**').as('postRequest');
        cy.get('#mce-EMAIL').type('teste@teste.com');
        cy.get('#mc-embedded-subscribe').contains('Inscrever-se').click();
        cy.wait('@postRequest', { timeout: 10000 }).then((interception) => {
            expect(interception.response.body).to.include('{"result":"error","msg":"teste@teste.com is an invalid email address and cannot be imported."}');
        });
    });

    // Teste 6: Testar acessibilidade do botão de WhatsApp
    it('Deve exibir e funcionar o botão de WhatsApp', () => {
        cy.get('.btn-whatsapp-fixed > img').should('be.visible');
        cy.get('.btn-whatsapp-fixed').click();
        cy.url().should('include', 'whatsapp');
    });

    // Teste 7: Garantir responsividade do menu
    it('Deve funcionar o menu em dispositivos móveis', () => {
        cy.viewport('iphone-x');
        cy.get('.d-lg-none').click();
        cy.get('nav').should('be.visible');
    });

    // Teste 8: Validar seção de notícias
    it('Deve exibir últimas notícias', () => {
        cy.get('.elemento-novidades > :nth-child(2)').should('have.length.greaterThan', 0);
    });

    // Teste 9: Garantir que o botão "Abrir Demanda" funciona
    it.only('Deve abrir a página de Demanda ao clicar no botão', () => {
        cy.get(':nth-child(2) > .cartao-componente > span').contains('Abrir uma Demanda').click();
        cy.url().should('include', '/demandas');
    });

    // Teste 10: Testar a exibição da seção COVID-19
    it('Deve exibir a seção COVID-19 corretamente', () => {
        cy.get('.covid-section').should('be.visible');
    });
});