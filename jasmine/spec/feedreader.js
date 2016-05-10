/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */
/* Placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    describe('RSS Feeds', function() {
        /* Tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.*/
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        function urlLoop(index) {
            it('has defined URLs', function() {
                expect(allFeeds[index].url.slice(0, 7)).toBe('http://');
                expect(allFeeds[index].url).toBeDefined();
            });
        }
        // Loops through allFeeds elements and test urls
        for (var i = 0; i < allFeeds.length; i++) {
            urlLoop(i);
        }

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        function nameLoop(index) {
            it('has defined Names', function() {
                expect(allFeeds[index].name.length).not.toBe(0);
                expect(allFeeds[index].name).toBeDefined();
            });
        }

        for (var i = 0; i < allFeeds.length; i++) {
            nameLoop(i);
        }
    });

    describe('The Menu', function() {
        var spyEvent;

        /* A test that ensures the menu element is
         * hidden by default.*/

        it('is hidden by default', function() {
            var body = $('body')//.attr('class');

            expect(body.hasClass('menu-hidden')).toBeTruthy();
        });
        /* A test that ensures the menu changes
         * visibility when the menu icon is clicked.*/

        it('appears when menu icon is clicked, then disappears on second click', function() {
            var body = $('body').attr('class');
            spyEvent = spyOnEvent('i', 'click');

            expect($('body').hasClass('menu-hidden')).toBeTruthy();

            $('i').trigger("click");

            expect('click').toHaveBeenTriggeredOn('i');
            expect(spyEvent).toHaveBeenTriggered();
            expect($('body').hasClass('menu-hidden')).toBeFalsy();

            $('i').trigger("click");

            expect('click').toHaveBeenTriggeredOn('i');
            expect(spyEvent).toHaveBeenTriggered();
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });
    });

    describe('Initial Entries', function() {
        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.*/

        beforeEach(function(done) {
            loadFeed(0, done);
        });
        it('loadFeeds call is successfull', function() {
            expect($('.feed .entry')).toExist();
            expect($('.feed .entry h2').text()).not.toBe('');
        });
    });

    describe('New Feed Selection', function() {
        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.*/

         var feedOne = "";
         var feedTwo = "";

        //Calls loadFeed twice and asigns text value to feed one and two
         beforeEach(function(done) {
            loadFeed(0, function(){
                feedOne = $('.feed .entry h2').text();
                loadFeed(1, function(){
                    feedTwo = $('.feed .entry h2').text();
                    done();
                });
            });
         });

         it('content changes', function(){
            expect(feedOne).not.toBe(feedTwo);
         });
    });

}());