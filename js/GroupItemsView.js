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

    if (_groupActive === 0) return;

    this.model.setActive(this.model.get('_groupActive') - 1);

  }

  onClick(event) {
    const $btn = $(event.currentTarget);
    const itemIndex = $btn.data('index');
    this.model.setActive(itemIndex);
  }
}

GroupItemsView.template = 'group-items.jsx';

export default GroupItemsView;
