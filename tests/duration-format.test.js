import { test } from 'tape'
import format from '../src'

var D, H, M, S
S = 1000
M = 60 * S
H = 60 * M
D = 24 * H

test('format test', function (assert) {
  const duration = 21 * D + 3 * H + 45 * M + 6 * S + 78
  const output = format(duration, '#{2D} days #{2H}:#{2M}:#{2S}')

  assert.equal('21 days 03:45:06', output)
  assert.end()
})

test('timing test', function (assert) {
  const duration = H + 45 * M + 1 * S
  const output = format(duration, '#{H}:#{M}:#{S}')

  assert.equal('1:45:1', output)
  assert.end()
})

test('pading test', function (assert) {
  const duration = H + 45 * M + 1 * S
  const output = format(duration, '#{2H}:#{4M}:#{8S}')

  assert.equal('01:0045:00000001', output)
  assert.end()
})
