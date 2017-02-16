/*
const numbers = '\\d+(?:[\\.,]\\d{0,3})?'
const weekPattern = `(${numbers}W)`
const datePattern = `(${numbers}Y)?(${numbers}M)?(${numbers}D)?`
const timePattern = `T(${numbers}H)?(${numbers}M)?(${numbers}S)?`
const iso8601 = `P(?:${weekPattern}|${datePattern}(?:${timePattern})?)`
const objMap = ['weeks', 'years', 'months', 'days', 'hours', 'minutes', 'seconds']

// The ISO8601 regex for matching / testing durations
const pattern = new RegExp(iso8601)

const parse = durationString => {
  // slice away first entry in match-array
  return durationString.match(pattern).slice(1).reduce((prev, next, idx) => {
    prev[objMap[idx]] = parseFloat(next) || 0
    return prev
  }, {})
}
*/

const unitDuration = {
  MS: 1,
  S: 1000,
  M: 60000,
  H: 3600000,
  D: 86400000,
  W: 604800000
}
const regex = /#\{(\d*)(MS|S|M|H|D|W)\}/g

const findMatchs = function (pattern) {
  return pattern.match(regex).map(match => {
    regex.lastIndex = 0
    let [str, num, unit] = regex.exec(match)
    return {str, num, unit}
  })
}

const findUnits = function (matchs) {
  // Create a unique Set
  return [...new Set(matchs.map(match => match.unit))].sort((a, b) => (unitDuration[b] - unitDuration[a]))
}

const calculateUnitValues = function (duration, units) {
  return units.reduce((accumulator, unit, index, units) => {
    let remains = units.slice(0, index).reduce((remain, unit) => (remain -= unitDuration[unit] * accumulator[unit] || 0), duration)
    accumulator[unit] = Math.floor(remains / unitDuration[unit])
    return accumulator
  }, {})
}

const fill = function (width = 0, value = 0, pad = '0') {
  width -= value.toString().length
  if (width > 0) {
    return new Array(width + (/\./.test(value) ? 2 : 1)).join(pad) + value
  }
  return value
}

export default function (duration, pattern) {
  let matchs = findMatchs(pattern)
  let units = findUnits(matchs)
  let unitValues = calculateUnitValues(duration, units)
  return matchs.reduce((result, match) => (result.replace(match.str, fill(match.num, unitValues[match.unit]))), pattern)
}
