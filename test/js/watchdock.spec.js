describe("watchdock suite", function() {
    beforeEach(function() {
        module('docker');
        inject(function($injector) {
        });
    });

    describe('computeUri', function() {
        it('context and reminder should be concatenated with slash in between', function() {
            var expected = 'context/reminder';
            expect(computeUri('context', 'reminder')).toEqual(expected);
        });

        it('existing slash in context should be ignored', function() {
            var expected = 'context/reminder';
            expect(computeUri('context/', 'reminder')).toEqual(expected);
        });

        it('context shorter than 2 characters is not evaluated', function() {
            var expected = 'c/reminder';
            expect(computeUri('c/', 'reminder')).toEqual(expected);
        });
    });

});