import ItemsComponentModel from 'core/js/models/itemsComponentModel';

export default class GroupItemsModel extends ItemsComponentModel {
  defaults() {
    return ItemsComponentModel.resultExtend('defaults', {
      _group: 0
    });
  }

  setActive(group) {
    this.resetActiveItems();
    const itemsGroup = this.getChildren().filter({ _group: group + 1 });
    itemsGroup.forEach((child, index) => child.set({ _isVisited: true, _isActive: true }));
    this.set('_groupActive', group);
  }

}
