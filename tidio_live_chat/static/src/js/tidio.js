odoo.define('tidio_live_chat', function (require) {
var dom = require('web.dom');

var WebClient = require('web.WebClient');
// note: I know it's ugly to include the whole method without super call but  
// odoo `WebClient` don't provide an appropriate hook to override it. 
// it should provide hook like `get_dom_to_detach` :(
WebClient.include({
    /**
     * Don't de-attached tidio iframe on toggle home menu
     * tidio unable to re-init it self while dom re-attached
     * @override
     */
    toggle_home_menu: function (display) {
        if (display === this.home_menu_displayed) {
            return; // nothing to do (prevents erasing previously detached webclient content)
        }
        if (display) {
            var self = this;
            this.clear_uncommitted_changes().then(function() {
                // Save the current scroll position
                self.scrollPosition = self.getScrollPosition();

                // Detach the web_client contents
                var $to_detach = self.$el.contents()
                        .not(self.menu.$el)
                        .not('.o_loading')
                        .not('.o_in_home_menu')
                        .not('.o_notification_manager')
                        .not('#tidio-chat')
                        .not('#tidio-chat-code');
                self.web_client_content = document.createDocumentFragment();
                dom.detach([{widget: self.action_manager}], {$to_detach: $to_detach}).appendTo(self.web_client_content);

                // Attach the home_menu
                self.append_home_menu();
                self.$el.addClass('o_home_menu_background');

                // Save and clear the url
                self.url = $.bbq.getState();
                self._ignore_hashchange = true;
                $.bbq.pushState('#home', 2); // merge_mode 2 to replace the current state
                self.menu.toggle_mode(true, self.action_manager.getCurrentAction() !== null);
            });
        } else {
            dom.detach([{widget: this.home_menu}]);
            dom.append(this.$el, [this.web_client_content], {
                in_DOM: true,
                callbacks: [{widget: this.action_manager}],
            });
            this.trigger_up('scrollTo', this.scrollPosition);
            this.home_menu_displayed = false;
            this.$el.removeClass('o_home_menu_background');
            this.menu.toggle_mode(false, this.action_manager.getCurrentAction() !== null);
        }
    },
});

});