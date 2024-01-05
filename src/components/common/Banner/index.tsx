export default function Banner() {
  return (
    <div className="flex items-center border-b border-purple-500 bg-white py-2.5 sm:px-3.5">
      <p className="rotating-text text-sm leading-6 text-black overflow-hidden whitespace-nowrap">
        <div className="flex animate-marquee">
          <div className="flex space-x-2"> {/* Adjust right margin for separation */}
            <strong className="font-semibold">🎁 Special NY Gift 🎉</strong>
            <span>5 Ether donation to Smooth by January 11th! 💰 JOIN NOW TO GET IT!</span>
          </div>
        </div>
      </p>
    </div>
  )
}
