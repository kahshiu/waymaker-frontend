export interface INavList {
  list: INavListItem[];
  listClassName?: string;
}

export interface INavListItem {
  href?: string;
  disabled?: boolean;
  itemText: string;
  itemClassName?: string;
}

export const NavList = (props: INavList) => {
  const { list, listClassName } = props;
  const _listClassName = listClassName ?? "nav-list-col";

  return (
    <ul className={_listClassName}>
      {list.map((item: INavListItem) => {
        const { href, disabled, itemClassName, itemText } = item;
        const _href = href ?? "";
        const _itemClassName = itemClassName ?? "nav-item-blue-200";
        const _itemText = itemText ?? "BLANK";
        const _itemStyle = {
          display: "inline-block",
          width: "100%",
        };
        return (
          <li className={_itemClassName}>
            {disabled ? (
              <span class="text-slate-400">{_itemText}</span>
            ) : (
              <a style={_itemStyle} href={_href}>
                {_itemText}
              </a>
            )}
          </li>
        );
      })}
    </ul>
  );
};
