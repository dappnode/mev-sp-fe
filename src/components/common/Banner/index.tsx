export default function Banner() {
  return (
    <div className="flex items-center gap-x-6 border-b border-purple-500 bg-white px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
      <p className="rotating-text text-sm leading-6 text-black">
        <div>
          <strong className="font-semibold">🎁 Special NY Gift 🎉</strong>
          <svg
            aria-hidden="true"
            className="mx-2 inline h-0.5 w-0.5 fill-current"
            viewBox="0 0 2 2">
            <circle cx={1} cy={1} r={1} />
          </svg>
          5 Ether donation to Smooth by January 11th! 💰 JOIN NOW TO GET
          IT!&nbsp;
          <strong className="ml-1 font-semibold">🎁 Special NY Gift 🎉</strong>
          <svg
            aria-hidden="true"
            className="mx-2 inline h-0.5 w-0.5 fill-current"
            viewBox="0 0 2 2">
            <circle cx={1} cy={1} r={1} />
          </svg>
          5 Ether donation to Smooth by January 11th! 💰 JOIN NOW TO GET
          IT!&nbsp;
          <strong className="ml-1 font-semibold">🎁 Special NY Gift 🎉</strong>
        </div>
      </p>
    </div>
  )
}
