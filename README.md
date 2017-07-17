# Duration formatter

```javascript

import durationFormat from '@maggiben/duration-format'

const S = 1000
const M = 60 * S
const H = 60 * M
const D = 24 * H

const duration = 2*D + 3*H + 45*M + 6*S + 78

durationFormat(duration, '#{D} Day #{H} : #{M} : #{S} . #{MS}')
// 2 Day 3 : 45 : 6 . 78
durationFormat(duration, '#{4D} Day #{2H} : #{2M} : #{2S} . #{3MS}')
// 0002 Day 03 : 45 : 06 . 078
durationFormat(duration, '#{2D} Day #{2M} : #{2S}')
// 02 Day 225 : 06
durationFormat(duration, '#{2H} : #{2M} : #{2S}')
// 51 : 45 : 06
durationFormat(duration, '#{2M} : #{2S}')
// 3105 : 06
durationFormat(duration, '#{2H} : #{2S}')
// 51 : 2706

```