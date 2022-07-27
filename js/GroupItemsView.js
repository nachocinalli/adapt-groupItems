import ComponentView from 'core/js/views/componentView';
import a11y from 'core/js/a11y';
class GroupItemsView extends ComponentView {

  preRender() {
    this.reset();
    this.listenTo(this.model.get('_children'), 'change:_isActive', this.onItemsActiveChange);
    this.setActive = this.setActive.bind(this);
  }

  postRender () {
    this.$('.component__widget').imageready(() => {
      this.setReadyStatus();
    });
    if (this.model.get('_setCompletionOn') === 'inview') {
      this.setupInviewCompletion('.component__widget');
    }
  }

  onItemsActiveChange(item, isActive) {
    if (!isActive) return;
    this.model.set('_groupActive', item.get('_index'));
    item.toggleVisited(true);
  }

  reset() {
    this.model.resetActiveItems();
    this.model.set('_groupActive', 0);
    const firstItem = this.model.getItem(this.model.get('_groupActive'));

    if (!firstItem) return;
    firstItem.toggleActive(true);
    firstItem.toggleVisited(true);
  }

  setActive(index) {
    this.model.setActiveItem(index);
    const button = document.getElementById(`${this.model.get('_id')}-button-${index}`);
    a11y.focus(button);
  }
}

GroupItemsView.template = 'group-items.jsx';

export default GroupItemsView;
