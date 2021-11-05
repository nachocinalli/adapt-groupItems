import Adapt from 'core/js/adapt';
import GroupItemsModel from './GroupItemsModel';
import GroupItemsView from './GroupItemsView';

export default Adapt.register('groupItems', {
  model: GroupItemsModel,
  view: GroupItemsView
});
