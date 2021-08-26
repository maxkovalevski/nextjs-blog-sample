import Link from 'next/link'
import { FC } from 'react'

interface Props { totalPages: string; currentPage: string; }

export const Pagination: FC<Props> = ({ totalPages, currentPage }) => {
  const current = parseInt(currentPage);
  const prevPage = parseInt(currentPage) - 1 > 0
  const nextPage = parseInt(currentPage) + 1 <= parseInt(totalPages)

  return (
    <div className="pt-6 pb-8 space-y-2 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button disabled={!prevPage}>
            Previous
          </button>
        )}
        {prevPage && (
          <Link href={current - 1 === 1 ? `/blog/` : `/blog/page/${current - 1}`}>
            <button>Previous</button>
          </Link>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button disabled={!nextPage}>
            Next
          </button>
        )}
        {nextPage && (
          <Link href={`/blog/page/${currentPage + 1}`}>
            <button>Next</button>
          </Link>
        )}
      </nav>
    </div>
  )
}
