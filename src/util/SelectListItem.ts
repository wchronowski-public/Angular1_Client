const EMPTY_STRING = '';

export class SelectListItem<TKey> {
  constructor(public key: TKey,
              public value = EMPTY_STRING) {}
}
