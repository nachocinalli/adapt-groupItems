import React from 'react';
import { templates, classes, html, compile } from 'core/js/reactHelpers';
import a11y from 'core/js/a11y';
export default function GroupItems(props) {
  const {
    _id,
    _items,
    _groupItems,
    _groupActive,
    _globals,
    setActive
  } = props;
  const onButtonClick = (index, event) => {
    setActive(index);
  };
  const onKeyDown = (event) => {
    let flag = false;
    let currentIndex = _groupActive;
    switch (event.which) {
      case 35:
        currentIndex = _items.length - 1;
        flag = true;
        break;
      case 36:
        currentIndex = 0;
        flag = true;
        break;
      case 37:
      case 38:
        if (currentIndex === 0) currentIndex = _items.length;
        currentIndex--;
        flag = true;
        break;
      case 39:
      case 40:
        if (currentIndex === _items.length - 1) currentIndex = -1;
        currentIndex++;
        flag = true;
    }
    if (flag) {
      setActive(currentIndex);
      event.stopPropagation();
      event.preventDefault();
    }
  };
  return (
    <div className='component__inner groupitems__inner'>
      <templates.header {...props} />
      <div className='component__widget groupitems__widget'>
        <div className='groupitems__container-groups' aria-labelledby={`${_id}-heading`} role='tablist'>
          {_items.map(({ title, _icon, _isVisited, _isActive }, _index) => (
            <button
              id={`${_id}-button-${_index}`}
              className={classes([
                'btn-text',
                'groupitems__group',
                _isActive ? 'is-active' : '',
                _isVisited && 'is-visited'
              ])}
              type='button'
              key={_index}
              data-index={_index}
              role='tab'
              aria-selected ={_isActive}
              aria-controls={`${_id}-panel-${_index}`}
              aria-hidden={!_isActive || null}
              aria-label={`${title}.${_isVisited ? ` ${_globals._accessibility._ariaLabels.visited}` : ''}`}
              tabIndex={_isActive ? null : -1}
              onClick={(e) => onButtonClick(_index, e)}
              onKeyDown={onKeyDown}
            >
              {_icon._classes && (
                <span aria-hidden='true' className={classes([
                  'icon',
                  _icon._classes
                ])}>
                </span>)}
              {_icon.src && (
                <img aria-hidden='true' src={_icon.src} alt={_icon.alt} />
              )}
              {title && (
                <span className='groupitems__group-title'>
                  {html(compile(title))}
                </span>
              )}
            </button>
          ))}
        </div>
        {_items.map(({ _isVisited, _isActive, _index }, _groupindex) => (
          <div
            id={`${_id}-panel-${_index}`}
            key={_index}
            className={classes([
              'groupitems__container-items',
              _isActive ? 'is-active' : '',
              _isVisited && 'is-visited'
            ])}
            role='tabpanel'
            tabIndex='0'
            arial-labelledby={`${_id}-button-${_index}`}>
            {_groupItems.filter(item => item._group === _index + 1).map(({ title, body, _graphic, _classes }, _index) => (
              <div
                className={classes([
                  'groupitems__item',
                  _graphic.src && 'has-image',
                  _classes
                ])}
                key={_index}>
                {title && (
                  <div className='groupitems__item__content-title' role='heading' aria-level={a11y.ariaLevel('componentItem')}>
                    {html(compile(title))}
                  </div>
                )}
                {body && (
                  <div className='groupitems__item__content-body'>
                    {html(compile(body))}
                  </div>
                )}
                {
                  <templates.image {..._graphic}
                    classNamePrefixes={[
                      'component',
                      'groupitems'
                    ]}
                  />
                }
              </div>

            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
