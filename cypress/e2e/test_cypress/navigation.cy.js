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
    
    // Teste 5: Pesquisar obras públicas com filtros específicos de 2020
    it('Deve pesquisar obras públicas com filtros específicos', () => {
        cy.contains('Obras Públicas').should('be.visible').click();
        cy.url().should('include', '/obras');
        cy.get('.ui-dropdown-label-container').first().click();
        cy.contains('.ui-dropdown-item', '2020').click();
        cy.contains('Pesquisar').should('be.visible').click();
        cy.get('Tabela').should('be.visible');
});

    // Teste 6: Testar acessibilidade do botão de WhatsApp
    it('Deve exibir e funcionar o botão de WhatsApp', () => {
        cy.get('.btn-whatsapp-fixed > img', { timeout: 10000 }).should('be.visible');
        cy.get('.btn-whatsapp-fixed') 
            .should('have.attr', 'href') 
            .and('include', 'https://api.whatsapp.com'); 
        cy.get('.btn-whatsapp-fixed')
            .should('have.attr', 'target', '_blank'); 
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

    // Teste 9: Garantir que o botão "Abrir Demanda" funciona e abre o modal
    it('Deve abrir o modal ao clicar no botão "Abra uma Demanda"', () => {
    cy.contains('Abra uma Demanda').should('be.visible');
    cy.contains('Abra uma Demanda').click();
    cy.contains('Registrar manifestação').should('be.visible');
    });

    // Teste 10: Testar a aba do que se deseja buscar
    it('Deve exibir uma aba contendo as buscas da página', () => {
    cy.get('.ui-dropdown-label-container > .ng-tns-c192-2').should('be.visible');
    });
});