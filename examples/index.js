import format from '../src/';

var D, H, M, S, duration;
S = 1000;
M = 60 * S;
H = 60 * M;
D = 24 * H;

duration = 21 * D + 3 * H + 45 * M + 6 * S + 78;

var str = format(duration, '#{2D} days #{2H}:#{2M}:#{2S}');
console.log(str)
