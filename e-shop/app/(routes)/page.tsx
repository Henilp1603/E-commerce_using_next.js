import getBillboard from '@/actions/getBillboards'
import getProducts from '@/actions/getProducts'
import Billboard from '@/components/Billboard'
import ProductList from '@/components/ProductList'
import Container from '@/components/ui/Container'
import React from 'react'

const HomePage = async() => {
  const billboard=await getBillboard("65ca500ae8a5883db1770640")
  const products = await getProducts({ isFeatured: true });
  // console.log(products);
  
  return (
    <Container>

    <div className='space-y-10 pb-10'>
      <Billboard data={billboard} />
      <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList title="Featured Products" items={products} />
        </div>
    </div>

    </Container>
  )
}

export default HomePage
