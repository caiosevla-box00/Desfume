export default function Logo({ size = 48 }) {
  const s = size
  const cx = s / 2
  const cy = s / 2
  const r = s * 0.46
  const ri = s * 0.36
  const circumference = 2 * Math.PI * r
  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`rg-${s}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2ECC71"/>
          <stop offset="100%" stopColor="#1A6B42"/>
        </linearGradient>
        <linearGradient id={`lg-${s}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1A6B42"/>
          <stop offset="100%" stopColor="#0A3D2B"/>
        </linearGradient>
      </defs>
      {/* outer ring track */}
      <circle cx={cx} cy={cy} r={r} stroke="#DCF0E7" strokeWidth={s*0.05} fill="none"/>
      {/* outer ring progress ~80% */}
      <circle cx={cx} cy={cy} r={r} stroke={`url(#rg-${s})`} strokeWidth={s*0.055}
        strokeLinecap="round" fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={circumference * 0.22}
        transform={`rotate(-90 ${cx} ${cy})`}/>
      {/* white face */}
      <circle cx={cx} cy={cy} r={ri} fill="white"/>
      {/* hour hand */}
      <line x1={cx} y1={cy - ri*0.65} x2={cx} y2={cy} stroke="#0A3D2B" strokeWidth={s*0.055} strokeLinecap="round"/>
      {/* minute hand */}
      <line x1={cx} y1={cy} x2={cx + ri*0.52} y2={cy - ri*0.3} stroke="#1A6B42" strokeWidth={s*0.045} strokeLinecap="round"/>
      {/* center */}
      <circle cx={cx} cy={cy} r={s*0.07} fill="#1A6B42"/>
      <circle cx={cx} cy={cy} r={s*0.035} fill="white"/>
      {/* lock body */}
      <rect x={cx - s*0.11} y={cy + s*0.14} width={s*0.22} height={s*0.18} rx={s*0.04} fill={`url(#lg-${s})`}/>
      {/* lock shackle */}
      <path d={`M${cx-s*0.055} ${cy+s*0.14} L${cx-s*0.055} ${cy+s*0.06} C${cx-s*0.055} ${cy-s*0.01} ${cx+s*0.055} ${cy-s*0.01} ${cx+s*0.055} ${cy+s*0.06} L${cx+s*0.055} ${cy+s*0.14}`}
        fill="none" stroke={`url(#lg-${s})`} strokeWidth={s*0.055} strokeLinecap="round"/>
      {/* check in lock */}
      <path d={`M${cx-s*0.065} ${cy+s*0.22} L${cx-s*0.015} ${cy+s*0.26} L${cx+s*0.07} ${cy+s*0.19}`}
        stroke="white" strokeWidth={s*0.04} strokeLinecap="round" strokeLinejoin="round"/>
      {/* green dot on shackle top = open/unlocked */}
      <circle cx={cx+s*0.055} cy={cy+s*0.04} r={s*0.055} fill="#2ECC71"/>
      <path d={`M${cx+s*0.015} ${cy+s*0.04} L${cx+s*0.045} ${cy+s*0.065} L${cx+s*0.095} ${cy+s*0.015}`}
        stroke="white" strokeWidth={s*0.035} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
