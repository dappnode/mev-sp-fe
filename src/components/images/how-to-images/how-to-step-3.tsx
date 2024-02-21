import { useTheme } from 'next-themes'

export function HowToStep3() {
  const { systemTheme, theme } = useTheme()
  const currentTheme = theme === 'system' ? systemTheme : theme
  const colors =
    currentTheme === 'light'
      ? ['#D3C8F0', '#002C41', '#fff']
      : ['#625582', '#fff', '#002C41']
  // [0] => lightViolet / darkViolet
  // [1] => darkBlue / white
  // [2] => white / darkBlue

  return (
    <svg
      fill="none"
      height="169"
      width="169"
      xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#a)">
        <mask
          height="170"
          id="b"
          maskUnits="userSpaceOnUse"
          style={{ maskType: 'luminance' }}
          width="169"
          x="0"
          y="0">
          <path d="M.158 169V.106H169V169H.158Z" fill="#73BBA3" />
        </mask>
        <g mask="url(#b)">
          <path
            clipRule="evenodd"
            d="M169 84.5c0 46.668-37.832 84.5-84.5 84.5S0 131.168 0 84.5 37.832 0 84.5 0 169 37.832 169 84.5Z"
            fill={colors[0]}
            fillRule="evenodd"
          />
        </g>
        <path
          clipRule="evenodd"
          d="M110.906 129.391H58.094a10.562 10.562 0 0 1-10.563-10.563V66.016v47.531a10.564 10.564 0 0 0 10.563 10.562h52.812a10.56 10.56 0 0 0 10.563-10.562v5.281a10.563 10.563 0 0 1-10.563 10.563Z"
          fill={colors[0]}
          fillRule="evenodd"
        />
        <path
          clipRule="evenodd"
          d="M58.094 118.828a5.287 5.287 0 0 1-5.282-5.281V60.734a5.287 5.287 0 0 1 5.282-5.28h52.812a5.287 5.287 0 0 1 5.282 5.28v52.813a5.287 5.287 0 0 1-5.282 5.281H58.094Z"
          fill={colors[2]}
          fillRule="evenodd"
        />
        <path
          clipRule="evenodd"
          d="M110.906 50.172H58.094A10.563 10.563 0 0 0 47.53 60.734v52.813a10.564 10.564 0 0 0 10.563 10.562h52.812a10.56 10.56 0 0 0 10.563-10.562V60.734a10.562 10.562 0 0 0-10.563-10.562Zm-52.812 63.375h52.812V60.734H58.094v52.813Z"
          fill={colors[1]}
          fillRule="evenodd"
        />
        <path
          clipRule="evenodd"
          d="M121.468 64.291v-3.556a10.54 10.54 0 0 0-3.126-7.502 100.355 100.355 0 0 1 6.863-4.856 5.268 5.268 0 0 1 7.301 1.57 5.284 5.284 0 0 1-1.571 7.302 91.764 91.764 0 0 0-9.467 7.042Z"
          fill={colors[0]}
          fillRule="evenodd"
        />

        <path
          clipRule="evenodd"
          d="M110.907 74.582V60.734h-1.294a111.604 111.604 0 0 1 8.73-7.502 10.539 10.539 0 0 1 3.127 7.502v3.557a108.327 108.327 0 0 0-10.563 10.29Z"
          fill={colors[1]}
          fillRule="evenodd"
        />
        <path
          clipRule="evenodd"
          d="M85.692 102.984a5.288 5.288 0 0 1-4.196-2.073L65.338 79.786a5.282 5.282 0 0 1 8.392-6.416l11.056 14.457c6.097-10.974 19.345-31.114 40.415-44.732a5.285 5.285 0 0 1 5.735 8.872c-26.955 17.415-40.27 47.54-40.401 47.84a5.282 5.282 0 0 1-4.204 3.138l-.639.039Z"
          fill={colors[1]}
          fillRule="evenodd"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path d="M0 0h169v169H0z" fill={colors[2]} />
        </clipPath>
      </defs>
    </svg>
  )
}
