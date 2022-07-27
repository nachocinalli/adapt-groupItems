import ItemsComponentModel from 'core/js/models/itemsComponentModel';
import ItemModel from 'core/js/models/itemModel';
export default class GroupItemsModel extends ItemsComponentModel {
  defaults() {
    return ItemsComponentModel.resultExtend('defaults', {
      _groupActive: null
    });
  }

  setUpItems() {
    const items = this.get('_items') || [];
    items.forEach((item, index) => (item._index = index));
    this.set('_groupItems', items);

    const groups = this.get('_groups') || [];
    groups.forEach((group, index) => (group._index = index));
    this.setChildren(new Backbone.Collection(groups, { model: ItemModel }));

  }
}
