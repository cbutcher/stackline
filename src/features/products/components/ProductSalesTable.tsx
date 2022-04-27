import { useState } from "react";
import { ProductSaleModel } from "../api/productModels";
import "../styles/productSales.css"

export interface ProductSalesTableProps {
  readonly sales: ProductSaleModel[];
}

interface Sort {
  key: keyof ProductSaleModel;
  direction: 'ASC' | 'DESC';
}

const DEFAULT_SORT: Sort = {
  key: 'weekEnding',
  direction: 'DESC'
};

const usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0
})

function getSaleComparator({ key, direction }: Sort): (a: ProductSaleModel, b: ProductSaleModel) => number {
  if (key === 'weekEnding') {
    const compareDate = (saleA: ProductSaleModel, saleB: ProductSaleModel) => {
      const [dateA, dateB] = [new Date(saleA[key]), new Date(saleB[key])];
      if (dateA < dateB) {
        return -1;
      } else if (dateA > dateB) {
        return 1;
      } else {
        return 0;
      }
    }
    const inversedCompareDate = (a: ProductSaleModel, b: ProductSaleModel) => (-1 * compareDate(a, b));
    return direction === 'ASC' ? compareDate : inversedCompareDate;
  } else {
    const compareNumber = (saleA: ProductSaleModel, saleB: ProductSaleModel) => {
      return saleA[key] - saleB[key];
    }
    const inversedCompareNumber = (a: ProductSaleModel, b: ProductSaleModel) => (-1 * compareNumber(a, b));
    return direction === 'ASC' ? compareNumber : inversedCompareNumber;
  }
}

export default function ProductSalesTable({ sales }: ProductSalesTableProps) {
  const [sort, setSort] = useState<Sort>(DEFAULT_SORT);

  const updateSort = function(key: keyof ProductSaleModel) {
    if (sort.key === key) {
      setSort({
        key: key,
        direction: sort.direction === 'ASC' ? 'DESC' : 'ASC'
      });
    } else {
      setSort({
        key: key,
        direction: DEFAULT_SORT.direction
      });
    }
  }

  const sorted = [...sales].sort(getSaleComparator(sort));

  return (
    <table>
      <thead>
        <tr className={sort.direction === 'ASC' ? 'Ascending' : 'Descending'}>
          <th className={sort.key === 'weekEnding' ? 'Sorted' : ''} onClick={() => updateSort('weekEnding')} scope="col">WEEK ENDING</th>
          <th className={sort.key === 'retailSales' ? 'Sorted' : ''} onClick={() => updateSort('retailSales')} scope="col">RETAIL SALES</th>
          <th className={sort.key === 'wholesaleSales' ? 'Sorted' : ''} onClick={() => updateSort('wholesaleSales')} scope="col">WHOLESALE SALES</th>
          <th className={sort.key === 'unitsSold' ? 'Sorted' : ''} onClick={() => updateSort('unitsSold')} scope="col">UNITS SOLD</th>
          <th className={sort.key === 'retailerMargin' ? 'Sorted' : ''} onClick={() => updateSort('retailerMargin')} scope="col">RETAILER MARGIN</th>
        </tr>
      </thead>
      <tbody>
        { sorted.map((sale, index) => (
          <tr key={`sale-${index}`}>
            <td>{ sale.weekEnding }</td>
            <td>{ usdFormatter.format(sale.retailSales) }</td>
            <td>{ usdFormatter.format(sale.wholesaleSales) }</td>
            <td>{ sale.unitsSold }</td>
            <td>{ usdFormatter.format(sale.retailerMargin) }</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}