const memdb = require('../index')
const assert = require('assert')

describe('memdb', function () {
  beforeEach(function () {
    memdb.clear()
  })

  describe('.save(doc)', function () {
    it('should save the document', function (done) {
      let pet = {name: 'Tobi'}
      memdb.save(pet, function () {
        let ret = memdb.first({name: 'Tobi'})
        assert(ret === pet)
        done()
      })
    })
  })

  describe('.first(obj)', function () {
    it('should return the first matching doc', function () {
      let tobi = {name: 'Tobi'}
      let loki = {name: 'Loki'}

      memdb.save(tobi)
      memdb.save(loki)

      let ret = memdb.first({name: 'Tobi'})
      assert(ret === tobi)

      ret = memdb.first({name: 'Loki'})
      assert(ret === loki)
    })

    it('should return null when no doc matches', function () {
      let ret = memdb.first({name: 'Manny'})
      assert(ret === undefined)
    })
  })
})
