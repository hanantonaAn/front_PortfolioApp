describe('Check navigation and render', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000');
      cy.viewport(1280, 720);
    });
  
    it('Check recommendation page and return', () => {
      // Ожидаем завершения загрузки страницы
      cy.wait(2000);

      // Переходим на страницу рекомендаций
      cy.get('div[data-test="pc-only"] ul li a[href="/recommendations"]').click();
      cy.url().should('include', '/recommendations');
  
      // Возвращаемся на предыдущую страницу
      cy.go(-1);
      cy.url().should('include', '/');
    });
  
    it('Check Contacts page and return', () => {
      // Ожидаем завершения загрузки страницы
      cy.wait(5555);
  
      // Переходим на страницу контактов
      cy.get('div[data-test="pc-only"] ul li a[href="/contacts"]').click();
      cy.url().should('include', '/contacts');
  
      // Возвращаемся на предыдущую страницу
      cy.go(-1);
      cy.url().should('include', '/');
    });
  
    it('Check About us page and return', () => {
      // Ожидаем завершения загрузки страницы
      cy.wait(5555);
  
      // Переходим на страницу "О нас"
      cy.get('a[href="/about-us"]').click();
      cy.url().should('include', '/about-us');
  
      // Возвращаемся на предыдущую страницу
      cy.go(-1);
      cy.url().should('include', '/');
    });
  
    it('Check Privacy-policy page and return', () => {
      // Ожидаем завершения загрузки страницы
      cy.wait(5555);
  
      // Переходим на страницу "Пользовательское соглашение"
      cy.get('a[href="/privacy-policy"]').click();
      cy.url().should('include', '/privacy-policy');
  
      // Возвращаемся на предыдущую страницу
      cy.go(-1);
      cy.url().should('include', '/');
    });
  
    it('Check our-partners page and return', () => {
      // Ожидаем завершения загрузки страницы
      cy.wait(5555);
  
      // Переходим на страницу "Наши партнеры"
      cy.get('a[href="/our-partners"]').click();
      cy.url().should('include', '/our-partners');
  
      // Возвращаемся на предыдущую страницу
      cy.go(-1);
      cy.url().should('include', '/');
    });
  });