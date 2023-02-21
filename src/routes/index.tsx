import { Resource, component$ } from '@builder.io/qwik';
import type { RequestHandler } from '@builder.io/qwik-city';
import { loader$ } from '@builder.io/qwik-city';

export async function getProducts() {
  console.log('products getProducts ***');
  await sleep(5000);
  console.log('products getProducts after sleep ***');
  return [
    {
      name: 'Wrench',
      price: 123.45,
      description: `Used to fix stuff`,
    },
    {
      name: 'Screwdriver',
      price: 110.0,
      description: `Used to screw`,
    },
  ];
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const getProductData = loader$(({ defer }) => {
  const promise = getProducts();
  return defer(promise);
});

export default component$(() => {
  const productData = getProductData();
  console.log('products component$ ***');
  return (
    <Resource
      value={productData}
      onPending={() => (
        <>
          <h1>Loading...</h1>
        </>
      )}
      onRejected={() => <div>Error</div>}
      onResolved={(product) => (
        <>
          <h1>Info!</h1>
          <p>Name: {product[0].name}</p>
          <p>Price: {product[0].price}</p>
          <p>Description: {product[0].description}</p>
        </>
      )}
    />
  );
});
