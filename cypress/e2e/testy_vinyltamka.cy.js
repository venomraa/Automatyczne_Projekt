Cypress.Commands.add('Logowanie',() => {  
  
    cy.get('#fx-user').click();
    cy.wait(1000);
    cy.fixture('Login.json').then((user) => {
    cy.get('#mail_input_long').type(user.name)
    cy.get('#pass_input_long').type(user.pass)
    cy.get('.login-inner > fieldset > .btn > span').click();

//cy.wait(2000);
//cy.get('.logout > span').click(); //wylogowanie nieużywane w commands

})
})

beforeEach('setup', () => {
    cy.visit('https://vinyltamka.pl/'); //cy.visit('/')
    cy.url().should('contain', 'vinyltamka');
    
})

//------------------------ Logowanie do sklepu, mail  temp44@r44.int.pl pass:Haslo123456!----------------------

//Test_1 Logowanie do witryny sklepu z użyciem błędnego hasła i poprawnego adresu e-mail

  it("Logowanie do witryny sklepu z użyciem błędnego hasła i poprawnego adresu e-mail", () => {

    cy.get('#fx-user').click();
    cy.get('#mail_input_long').type('temp44@r44.int.pl');
    cy.get('#pass_input_long').type('Haslo123456!!!'); //poprawne hasło: Haslo123456!
    cy.wait(1000);
    cy.get('.login-inner > fieldset > .btn > span').click();
})

// Test_2 Logowanie do witryny sklepu z użyciem poprawnego hasła i poprawnego adresu e-mail

  it("Logowanie do witryny sklepu z użyciem poprawnego hasła i poprawnego adresu e-mail", () => {
    
    cy.Logowanie()
    cy.wait(2000);
    cy.get('.logout > span').click(); 
    cy.get('.alert-success > .row > p').should('contain', 'Zostałeś pomyślnie wylogowany.')

})

// Test_3 Dodanie produktu do ulubionych i sprawdzenie czy znajduję się na liście w panelu użytkownika

  it("Dodanie produktu do ulubionych i sprawdzenie czy znajduję się na liście w panelu użytkownika", () => {

    cy.Logowanie();
    cy.get('input[name="search"]').type('SLAYER');
    cy.get('.js__search-submit-btn').click();
    cy.get('[data-product-id="60035"] > .product-inner-wrap > .prodimage > .f-grid-12 > img').click();
    cy.get('.addtofav').click();    // Dodaj produkt do ulubionych
    cy.get('#fx-user').click();
    cy.get('.prodstorage > span').click();

 // Sprawdź, czy wiadomość o pomyślnym dodaniu do ulubionych jest wyświetlana
    cy.contains('Produkty w przechowalni').should('be.visible');
})

// Test_4 Dodanie produktu do koszyka (bez logowania do panelu klienta)

  it("Dodanie produktu do koszyka", () => {
    cy.get('#headlink5').click();
    cy.get('.addtobasket > span').click();
    cy.get('.ajax-product-block > .left').click();
    cy.get('header').scrollIntoView();
    cy.get(':nth-child(2) > .count').click();
    cy.wait(1000);
    cy.url().should('contain', 'basket'); //sprawdzenie czy aktualnie jestesmy na stronie koszyka
})

// // Test_5 Wyświetlenie produktów w kategorii "Stare wydania"

  it("Wyświetlenie produktów w kategorii Stare wydania", () => {
    
    cy.get('#headlink4 > span').click();
    cy.wait(1000);
    cy.get('#filter_category_14').click().find(' ul > :nth-child(1) > a > span').click()   //.select('Stare wydania').should('have.value','Stare wydania')
    cy.wait(1000);
    cy.get('.category-name').should('be.visible');

})

//Test_6 Usuniecie produktu z koszyka

  it("Dodanie produktu do koszyka", () => {
    cy.get('#headlink5').click();
    cy.get('.addtobasket > span').click();
    cy.get('.ajax-product-block > .left').click();
    cy.get('header').scrollIntoView();
    cy.get(':nth-child(2) > .count').click();
    cy.wait(1000);
    cy.url().should('contain', 'basket'); //sprawdzenie czy aktualnie jestesmy na stronie koszyka
    cy.get('.prodremove > .fa').click();
    cy.wait(1000);
    cy.get('.row > p').should('contain','Produkt usunięty z koszyka.');
    
})

//Test_7 Próba zaapisanie się do newsletter na błędnie podany e-mail

  it("Próba zaapisanie się do newsletter na błędnie podany e-mail", () => {
    cy.get('footer').scrollIntoView();
    cy.get('.newsletter-input').type('ewa.nowak#gmail.com');
    cy.get('.innerbox > form > :nth-child(1) > .btn').click();
    cy.contains('Nieprawidłowy format adresu e-mail.').should('be.visible');
    cy.get('.close > span').click();

})

//Test_8 Posortowanie wybranej kategorii BONY PREZENTOWE po najniższej cenie

  it('Posortowanie wybranej kategorii BONY PREZENTOWE po najniższej cenie', () => {
    
    // Wejdź w kategorię "BONY PREZENTOWE"
    cy.get('#headlink19 > span').click();

    // Kliknij na rozwijane MENU sortowania
    cy.get('.gotourl').select('/pl/c/Bony-Prezentowe/61/1/default/3').should('have.value','/pl/c/Bony-Prezentowe/61/1/default/3', 'be.visible');   

})

//Test_9 Dodawanie komentarza w kategorii BLOG Uwaga: ten wpis na blog nie był wykonany, test dokona wpisu po raz pierwszy.

  it('Dodawanie komentarza w kategorii BLOG', () => {
  
    cy.get('#headlink13 > span').click();
    cy.get(':nth-child(2) > .readmore').should('be.visible'); // Sprawdzenie czy znajdujemy się w kategorii BLOG
    cy.get(':nth-child(2) > .fx-img').click();
    cy.get('#commentuser').type('Piter');
    cy.get('#comment').type('Kawał dobrej muzyki.');

//     // Assert działa po pojawieniu się wpisu "Komentarz został dodany"
//     // Dodanie komentarza jednorazowe, żeby nie spamować API strony :) zostało przetestowane na innym wpisie.

    cy.get('fieldset > .btn > span').click();
    cy.contains('Komentarz został dodany.').should('be.visible');
})

// Test_10 Wyszukanie produktów posiadające w nazwie słowo GENESIS

  it('Wyszukanie produktów posiadające w nazwie słowo GENESIS"', () => {

    cy.get('.search__input').click();
    cy.get('input[name="search"]').type('GENESIS');
    cy.get('.js__search-submit-btn').click();

    // Sprawdź, czy wyniki wyszukiwania zawierają słowo "GENESIS"
    cy.contains('GENESIS').should('be.visible');
});

// // // Test_3a Dodanie produktu do ulubionych po zalogowaniu się na konto klienta

// //       it("Logowanie do sklepu", () => {

// //         cy.Logowanie();
// //         cy.get('input[name="search"]').type('SLAYER');
// //         cy.get('.js__search-submit-btn').click();

// //         cy.get('[data-product-id="60035"] > .product-inner-wrap > .prodimage > .f-grid-12 > img').click();
// //         cy.get('.addtofav').click();    // Dodaj produkt do ulubionych
// //         cy.get('#fx-user').click();
// //         cy.get('.prodstorage > span').click();

// //       // Sprawdź, czy wiadomość o pomyślnym dodaniu do ulubionych jest wyświetlana
// //         cy.contains('Produkty w przechowalni').should('be.visible');
// // })

//Test_11 Dodanie produktu z listy ulubionych do koszyka

  it("Dodanie produktu z listy ulubionych do koszyka", () => {

    cy.Logowanie();
    cy.get('input[name="search"]').type('SLAYER');
    cy.get('.js__search-submit-btn').click();
    cy.get('[data-product-id="60035"] > .product-inner-wrap > .prodimage > .f-grid-12 > img').click();
    cy.get('.addtofav').click();    // Dodaj produkt do ulubionych
    cy.get('#fx-user').click();
    cy.get('.prodstorage > span').click(); 
    cy.get('.btn-red2 > span').click({ force: true });
    cy.get(':nth-child(2) > .count').click();
    cy.url().should('contain', 'basket'); //sprawdzenie czy aktualnie jestesmy na stronie koszyka
    cy.get('.important > span').should('be.visible');
})
