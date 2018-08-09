/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('has a URL', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
         });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
          it('has a name', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
         });
    });


    /* A new test suite named "The menu" */
    describe('The menu', function() {
        let body = $('body');
        let menu = $('.menu-icon-link');
        /* A a test that ensures the menu element is
         * hidden by default.
         */
        it('Menu Element is Hidden by default', function() {
            expect(body.hasClass('menu-hidden')).toBe(true);
        });

         /* A test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * has two expectations: the menu display when
          * clicked and it hides when clicked again.
          */
        it('Menu Element is shown on click', function() {
            menu.trigger('click');
            expect(body.hasClass('menu-hidden')).toBe(false);
        });

        it('Menu Element is hidden on next click', function() {
            menu.trigger('click');
            expect(body.hasClass('menu-hidden')).toBe(true);
        });

    });
    /* A new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });
        it('has atleast one entry', function() {
            let entry = $('.feed .entry');
            expect(entry.length).toBeGreaterThan(0);
        });
    });

    /* A new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        let oldFeed, newFeed;
        let feed = $('.feed');
        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                oldFeed = feed.html();
                loadFeed(1, function() {
                    newFeed = feed.html();
                    done();
                });
            });
        });

        it('Feed content changes', function() {
            expect(oldFeed).not.toBe(newFeed);
        });
    });
}());
