import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ListItem.scss';

const ListItem = ({
  idx,
  activeIndex,
  setActiveIndex,
  title,
  list,
  setIsOpenSubMenu,
  isOpenSubMenu,
}) => {
  const [subActiveIdx, setSubActiveIdx] = useState();
  const navigate = useNavigate();

  const handleClick = () => {
    setIsOpenSubMenu(true);
    setActiveIndex(idx);
    setSubActiveIdx(null);
    !list && navigate(`/${title.replace(' ', '').toLowerCase()}`);
  };

  const goToSubLink = (e, idx) => {
    setSubActiveIdx(idx);
    navigate({
      pathname: `products?category_id=${idx + 1}`,
    });
  };

  const goToTitleLink = (e, idx) => {
    setSubActiveIdx(idx);
    navigate({
      pathname: `${e.target.innerText.replace(' ', '').toLowerCase()}`,
    });
  };

  return (
    <li className="listLi">
      <div className="listTitle" onClick={handleClick}>
        {title}
      </div>
      <div className={idx === activeIndex ? '' : 'closed'}>
        {isOpenSubMenu &&
          list?.map((sub, idx) => {
            return (
              <div
                key={sub.id}
                className="listSub"
                onClick={e => {
                  if (sub.id < 5) {
                    goToSubLink(e, idx);
                  } else {
                    goToTitleLink(e, idx);
                  }
                }}
              >
                <div
                  className={
                    subActiveIdx === idx
                      ? ['listDot', 'listActive'].join(' ')
                      : 'listDot'
                  }
                />
                <span onClick={e => {}}>{sub.name}</span>
              </div>
            );
          })}
      </div>
    </li>
  );
};

export default ListItem;
