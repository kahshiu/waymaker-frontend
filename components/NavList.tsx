export interface INavList {
  list: INavListItem[];
  listClassName?: string;
}

export interface INavListItem {
  href: string;
  itemText: string;
  itemClassName?: string;
}

export const NavList = (props: INavList) => {
  const { list, listClassName } = props;
  const _listClassName = listClassName ?? "nav-list-col";

  return (
    <ul className={_listClassName}>
      {list.map((item: INavListItem) => {
        const { href, itemClassName, itemText } = item;
        const _href = href ?? "";
        const _itemClassName = itemClassName ?? "nav-item-blue-200";
        const _itemText = itemText ?? "BLANK";
        return (
          <li className={_itemClassName}>
            <a href={_href}> {_itemText} </a>
          </li>
        );
      })}
    </ul>
  );
};
