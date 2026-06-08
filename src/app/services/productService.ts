import { fallbackMenuItems, type MenuItem } from '../data/menuItems';
import { getApiBaseUrl } from './api';

type ApiProduct = {
  id?: number | string;
  category_id?: number | string;
  name_en?: string;
  name_pt?: string;
  description_en?: string | null;
  description_pt?: string | null;
  price?: number | string;
  image_url?: string | null;
  is_available?: boolean | number;
};

export type ProductListResult = {
  products: MenuItem[];
  loadedRemotely: boolean;
  error?: string;
};

export async function listProducts(
  fetcher: typeof fetch = fetch
): Promise<ProductListResult> {
  const apiBaseUrl = getApiBaseUrl();

  try {
    const response = await fetcher(`${apiBaseUrl}/products`);
    if (!response.ok)
      throw new Error(`Product API returned ${response.status}`);

    const responseData = (await response.json()) as
      | ApiProduct[]
      | { data?: ApiProduct[] };
    const productsPayload = Array.isArray(responseData)
      ? responseData
      : (responseData.data ?? []);
    const products = productsPayload
      .map(mapApiProductToMenuItem)
      .filter((product): product is MenuItem => Boolean(product));

    return {
      products: products.length > 0 ? products : fallbackMenuItems,
      loadedRemotely: products.length > 0,
    };
  } catch (error) {
    return {
      products: fallbackMenuItems,
      loadedRemotely: false,
      error: error instanceof Error ? error.message : 'Product API unavailable',
    };
  }
}

function mapApiProductToMenuItem(product: ApiProduct): MenuItem | null {
  const id = Number(product.id);
  const price = Number(product.price);
  if (!Number.isInteger(id) || !Number.isFinite(price)) return null;

  return {
    id,
    nameEn: product.name_en ?? `Product ${id}`,
    namePt: product.name_pt ?? product.name_en ?? `Produto ${id}`,
    descriptionEn: product.description_en ?? '',
    descriptionPt: product.description_pt ?? product.description_en ?? '',
    price,
    image: product.image_url ?? fallbackMenuItems[0].image,
    category: getCategoryLabel(product.category_id),
    available: Boolean(product.is_available ?? true),
  };
}

function getCategoryLabel(categoryId?: number | string) {
  return Number(categoryId) === 2 ? 'Para Acompanhar' : 'Cafés Especiais';
}
