var pull = require('pull-stream')
var pushable = require('../')
var test = require('tape')


test('on close callback', function (t) {

  var i = 0

  var p = pushable(function (err) {
    if(err) throw err
    console.log('ended', err)
    t.equal(i, 3)
    t.end()
  })

  p.pipe(pull.take(3))
    .pipe(pull.drain(function (d) {
      t.equal(d, ++i)
    }, console.log.bind(console, 'end')))

  p.push(1)
  p.push(2)
  p.push(3)
  p.push(4)

})
