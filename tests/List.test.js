'use strict'

const List = require('../lib/List')

describe('List', () => {

  describe('construct', () => {
    const ARRAY = [1, 2, 3, 4]

    context('when initialized with and `object`', () => {
      context('when `object` is complete', () => {
        let PARAMS, list

        before(() => {
          PARAMS = {
            list      : ARRAY,
            total     : 20,
            page      : 3,
            pageSize  : ARRAY.length
          }

          list = new List(PARAMS)
        })

        it('should set the attr `list`', () => {
          const array = PARAMS.list

          expect(list.list).to.eql(array)
        })

        it('should set the attr `total`', () => {
          const total = PARAMS.total

          expect(list.total).to.eql(total)
        })

        it('should set the attr `page`', () => {
          const page = PARAMS.page

          expect(list.page).to.eql(page)
        })

        it('should set the attr `pageSize`', () => {
          const pageSize = PARAMS.pageSize

          expect(list.pageSize).to.eql(pageSize)
        })
      })

      context('when only `list` is passed', () => {
        let list, PARAMS

        before(() => {
          PARAMS = {
            list  : ARRAY
          }

          list = new List(PARAMS)
        })

        it('should set the attr `list`', () => {
          const array = PARAMS.list

          expect(list.list).to.eql(array)
        })

        it('should set the attr `total` with the length as the passed array', () => {
          const total = PARAMS.list.length

          expect(list.total).to.eql(total)
        })

        it('should set the attr `page` with default value', () => {
          const page = 1

          expect(list.page).to.eql(page)
        })

        it('should set the attr `pageSize` with default value', () => {
          const pageSize = 12

          expect(list.pageSize).to.eql(pageSize)
        })
      })
    })

    context('when initialized with an `array`', () => {
      let list

      before(() => {
        list = new List(ARRAY)
      })

      it('should set the attr `list`', () => {
        expect(list.list).to.eql(ARRAY)
      })

      it('should set the attr `total` with the same length as the passed array', () => {
        expect(list.total).to.eql(ARRAY.length)
      })

      it('should set the attr `page` with default value', () => {
        const page = 1

        expect(list.page).to.eql(page)
      })

      it('should set the attr `pageSize` with default value', () => {
        const pageSize = 12

        expect(list.pageSize).to.eql(pageSize)
      })
    })
  })

  describe('#getPaginated', () => {
    const ARRAY = ['a', 'e', 'c', 'r', 'h', 'u', 'i']

    context('when `array` has items', () => {
      context('when `params` is not `null`', () => {
        context('when `params.pageSize` is not `null`', () => {
          const PARAMS = {
            pageSize: 3
          }

          let list

          before(() => {
            list = List.getPaginated(ARRAY, PARAMS)
          })

          it('should return the paginated `array`', () => {
            expect(list).to.eql(ARRAY.slice(0, PARAMS.pageSize))
          })

          it('should return the array with same `length` as `params.pageSize`', () => {
            expect(list).to.have.lengthOf(PARAMS.pageSize)
          })
        })

        context('when `params.page` is not `null`', () => {
          const PARAMS = {
            page      : 2,
            pageSize  : 2
          }

          let list

          before(() => {
            list = List.getPaginated(ARRAY, PARAMS)
          })

          it('should return the paginated `array`', () => {
            expect(list).to.eql(ARRAY.splice(PARAMS.pageSize, PARAMS.pageSize))
          })

          it('should return the array with same `length` as `params.pageSize`', () => {
            expect(list).to.have.lengthOf(PARAMS.pageSize)
          })
        })
      })

      context('when `params` is `null`', () => {
        let list

        before(() => {
          list = List.getPaginated(ARRAY)
        })

        it('should return the passed `array`', () => {
          expect(list).to.eql(ARRAY)
        })
      })
    })

    context('when `array` has no items', () => {
      let list

      before(() => {
        list = List.getPaginated([])
      })

      it('should return the passed `array`', () => {
        expect(list).to.eql([])
      })
    })

    context('when `array` is `null`', () => {
      let list

      before(() => {
        list = List.getPaginated(null)
      })

      it('should return the passed `array`', () => {
        expect(list).to.not.exist
      })
    })
  })
})