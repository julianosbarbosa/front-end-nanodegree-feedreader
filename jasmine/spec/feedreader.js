/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$((() => {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', () => {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('As variaveis estão definidas?', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('As Urls estão funcionado?', () => {
            allFeeds.forEach(feed => {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).toBeGreaterThan(0);
            });
        });

        it('Tem nome definido?', () => {
            allFeeds.forEach(feed => {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });
    //testa o menu no efeito de abrir e fechar
    describe('The menu', () => {
        const body = $('.menu-hidden');
        const menuIcon = $('.menu-icon-link')

        it('O padrão do menu é escondido?', () => {
            expect(body.hasClass('menu-hidden')).toBe(true);
        });

        it('Ao clicar o menu aparece?', () => {
            menuIcon.click();
            expect(body.hasClass('menu-hidden')).toBe(false);
            menuIcon.click();
            expect(body.hasClass('menu-hidden')).toBe(true);
        });
    })
    // testa entradas iniciais
    describe('Initial Entries', () => {
        beforeEach(done => {
            loadFeed(0, () => {
                done();
            });
        });

        it('Tem uma entrada unica depois que a função loadFeed foi chamada?', done => {
            let newEntry = $('.feed .entry');
            expect(newEntry.length).toBeGreaterThan(0);
            done();
        });
    })
    // testa se novo feed é carregado e troca o conteudo
    describe('New Feed Selection', () => {
        let primaryChannel;
        let sencondChannel;
        beforeEach(done => {
            loadFeed(0, () => {
                primaryChannel = $('.feed').html();
                loadFeed(1, () => {
                    sencondChannel = $('.feed').html();
                    done();
                });
            });
        });

        it('O novo feed troca o conteudo?', done => {
            expect(primaryChannel === sencondChannel).toBe(false);
            done();
        });
    })
})());
