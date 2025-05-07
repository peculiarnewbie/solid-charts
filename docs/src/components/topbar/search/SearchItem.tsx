import type { SearchItemType } from '@components/topbar/search/Search'
import clsx from 'clsx'

const SearchItem = (props: {
  item: SearchItemType
  onMouseMove: () => void
  isActive: boolean
  closeSearch: () => void
}) => {
  return (
    <li role="presentation">
      <a
        role="option"
        aria-selected={props.isActive ? 'true' : 'false'}
        href={props.item.pathname}
        class={clsx('block p-2 text-sm', {
          'bg-sc-300': props.isActive,
          'bg-sc-100': !props.isActive,
        })}
        onMouseMove={props.onMouseMove}
        onClick={props.closeSearch}
      >
        <span class="block font-bold">{props.item.hierarchy}</span>
        <span
          class="block truncate [&>mark]:rounded-sm [&>mark]:bg-sc-400 [&>mark]:px-0.5"
          // eslint-disable-next-line solid/no-innerhtml
          innerHTML={props.item.content}
        />
      </a>
    </li>
  )
}

export default SearchItem
