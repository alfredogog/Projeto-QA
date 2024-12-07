import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

// Configuração de Ambiente
// Refere-se ao `beforeEach` no Cypress
Given("que estou na página inicial do Portal da Transparência", () => {
  cy.visit("https://transparencia.joaopessoa.pb.gov.br/");
});

// Teste 1: Verificar o título principal da página
Then("a imagem utilizada como título principal deve ser exibida", () => {
  cy.get(".figura-home").should("be.visible");
});

// Teste 2: Garantir que ao clicar em "receitas", seja direcionado para a página de Receitas
When("clico no link {string}", (link) => {
  cy.get(`.componente-home.componente-cards > [href="#/receitas/receitas-quadro-geral"] > span`).click();
});

Then("devo ser direcionado para a página de receitas", () => {
  cy.url().should("include", "/receitas");
});

// Teste 3: Verificar a exibição de links úteis
Then("os links úteis devem ser exibidos", () => {
  cy.get(".componentes-home > :nth-child(9)").should("be.visible");
});

// Teste 4: Testar a funcionalidade do menu hamburguer
When("navego pelo menu para receitas", () => {
  cy.get(":nth-child(5) > .nav-dropdown-toggle").click();
  cy.get(".open > .nav-dropdown-items > :nth-child(1) > .nav-link > span").click();
});

When("clico para buscar receitas", () => {
  cy.get(".cdk-overlay-backdrop", { timeout: 10000 }).should("not.exist");
  cy.get(":nth-child(4) > .btn > .ui-button-text").click({ force: true });
});

Then("a aba de receitas deve exibir {string}", (texto) => {
  cy.get("#mat-tab-label-0-0").should("be.visible").and("contain", texto);
});

// Teste 5: Pesquisar obras públicas com filtros específicos de 2020
When("clico em {string}", (opcao) => {
  cy.contains(opcao).should("be.visible").click();
});

Then("a URL deve incluir {string}", (texto) => {
  cy.url().should("include", texto);
});

When("seleciono o ano {string}", (ano) => {
  cy.get(".ui-dropdown-label-container").first().click();
  cy.contains(".ui-dropdown-item", ano).click();
});

When("clico em pesquisar", () => {
  cy.contains("Pesquisar").should("be.visible").click();
});

Then("os resultados devem ser exibidos", () => {
  cy.get("Tabela").should("be.visible");
});

// Teste 6: Testar acessibilidade do botão de WhatsApp
Then("o botão de WhatsApp deve estar visível e funcional", () => {
  cy.get(".btn-whatsapp-fixed > img", { timeout: 10000 }).should("be.visible");
  cy.get(".btn-whatsapp-fixed")
    .should("have.attr", "href")
    .and("include", "https://api.whatsapp.com");
  cy.get(".btn-whatsapp-fixed").should("have.attr", "target", "_blank");
});

// Teste 7: Garantir responsividade do menu
Given("que estou em um dispositivo móvel", () => {
  cy.viewport("iphone-x");
});

When("abro o menu", () => {
  cy.get(".d-lg-none").click();
});

Then("o menu deve estar visível", () => {
  cy.get("nav").should("be.visible");
});

// Teste 8: Validar seção de notícias
Then("as últimas notícias devem ser exibidas", () => {
  cy.get(".elemento-novidades > :nth-child(2)").should("have.length.greaterThan", 0);
});

// Teste 9: Garantir que o botão "Abrir Demanda" funciona e abre o modal
When("clico no botão {string}", (botao) => {
  cy.contains(botao).click();
});

Then("o modal deve exibir {string}", (texto) => {
  cy.contains(texto).should("be.visible");
});

// Teste 10: Testar a aba do que se deseja buscar
Then("a aba de buscas deve estar visível", () => {
  cy.get(".ui-dropdown-label-container > .ng-tns-c192-2").should("be.visible");
});