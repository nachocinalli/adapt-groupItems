import ComponentView from 'core/js/views/componentView';

class GroupItemsView extends ComponentView {

  preRender() {
    this.onClick = this.onClick.bind(this);
    this.listenTo(this.model.getChildren(), 'change:_isActive', this.onItemsActiveChange);
  }

  postRender () {
    this.$('.component__widget').imageready(() => {
      this.setReadyStatus();
    });
    if (this.model.get('_setCompletionOn') === 'inview') {
      this.setupInviewCompletion('.component__widget');
    }
    const items = this.model.getChildren();
    if (!items || !items.length) return;
    const activeItem = this.model.getActiveItem();
    if (!activeItem) {
      this.model.setActive(this.model.get('_groupActive') - 1);
    } else {
      items.trigger('change:_isActive', activeItem, true);
    }

  }

  onClick(event) {
    const $btn = $(event.currentTarget);
    const itemIndex = $btn.data('index');
    if (itemIndex === this.model.get('_groupActive')) return;
    this.model.setActive(itemIndex);
  }
}

GroupItemsView.template = 'group-items.jsx';

export default GroupItemsView;
