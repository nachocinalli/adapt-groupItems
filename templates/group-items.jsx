import React from 'react';
import { templates, classes, html, compile } from 'core/js/reactHelpers';

export default function GroupItems({
  onClick,
  _groups,
  _items,
  _groupActive,
  ...props
}) {
  return (
    <div className='component__inner groupitems__inner'>
      <templates.header {...props} />
      <div className='component__widget groupitems__widget'>
        <div className='groupitems__container-groups' role='list'>
          {_groups.map(({ title, _icon }, _index) => (
            <button onClick={onClick}
              className={classes([
                'btn-text',
                'groupitems__group',
                _groupActive === _index ? 'is-active' : ''
              ])}
              key={_index}
              data-index={_index}
              role="listitem"
            >
              <div className={classes([
                'icon',
                _icon._classes
              ])}>
                {_icon.src && (
                  <img src={_icon.src} alt={_icon.alt} />
                )}
              </div>
              {title && (
                <div className='groupitems__group-title'>
                  {html(compile(title))}
                </div>
              )}

            </button>
          ))}
        </div>
        <div className='groupitems__container-items' role='list'>
          {_items.map(({ _group, title, body, _graphic, _isActive, _isVisited, _classes }, _index) => (
            <div
              className={classes([
                'groupitems__item',
                _graphic.src && 'has-image',
                _isActive && 'is-active',
                _isVisited && 'is-visited',
                _classes
              ])}
              key={_index}
              data-index={_index}
              role="listitem"
            >

              {title && (
                <div className='groupitems__item__content-title'>
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
      </div>
    </div>
  );
}
