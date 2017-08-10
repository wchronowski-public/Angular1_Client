export enum Order {
  Asc = -1,
  Desc = 1,
}

type Sort = (a: any, b: any) => number;

function applySort(a: any, b: any, order: Order): number {
    if(a < b) { return order; }
    if(a > b) { return -order; }
    return 0;
}

export function byProperty(f: (t: any) => any, order: Order = Order.Asc): Sort {
  return function (a: any, b: any): number {
    const valA = f(a);
    const valB = f(b);
    return applySort(valA, valB, order);
  };
}

export function ascending(): Sort {
  return function (a: any, b: any): number {
    return applySort(a, b, Order.Asc);
  };
}

export function descending(): Sort {
  return function (a: any, b: any): number {
    return applySort(a, b, Order.Desc);
  };
}
