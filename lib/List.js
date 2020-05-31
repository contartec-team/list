'use strict'

const DEFAULT_PARAMS = {
  list      : [],
  total     : 0,
  page      : 1,
  pageSize  : 12
}

const DEFAULT_PAGINATE_PARAMS = {
  page      : 1,
  pageSize  : 0
}

class List {
  static get DEFAULT_PARAMS()   { return DEFAULT_PARAMS }

  constructor (params) {
    if (params instanceof Array)
      params = { list: params }

    params = Object
      .assign({}, DEFAULT_PARAMS, params)

    Object
      .assign(this, params)

    if (this.list && this.total == 0)
      this.total = this.list.length
  }

  static getPaginated(list = [], params = {}) {
    let listTemp = null

    if (list) {
      listTemp = [].concat(list)

      params = Object
        .assign({}, DEFAULT_PAGINATE_PARAMS, params)

      if (params.pageSize && list.length) {
        const page = ((params.page || 1) - 1) * params.pageSize

        listTemp = listTemp
          .splice(page, params.pageSize)
      }
    }

    return listTemp
  }
}

module.exports = List