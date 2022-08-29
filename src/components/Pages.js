import {useContext} from 'react'
import {observer} from 'mobx-react-lite'
import {Context} from '../index'
import {Pagination} from 'react-bootstrap'

const Pages = observer(() => {
	const {product} = useContext(Context)
	const pageCnt = Math.ceil(product.totalCount / product.limit)
	const pages = Array(pageCnt).fill(0).map((_, i) => i + 1)

	return <Pagination className='mt-3'>
		{pages.map(page =>
			<Pagination.Item
				key={page}
				active={product.page === page}
				onClick={() => product.setPage(page)}
			>
				{page}
			</Pagination.Item>
		)}
	</Pagination>
})

export default Pages
