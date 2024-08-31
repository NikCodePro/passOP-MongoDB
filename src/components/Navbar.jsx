
const Navbar = () => {
  return (
    <nav className='bg-purple-200 flex items-center justify-between'>
        <div className="logo font-bold text-purple-700 text-lg mx-5">
          <span className="text-purple-700">&lt;</span>
            <span className="text-pink-500">Pass</span><span className="">OP</span>
          <span className="text-purple-700">/&gt;</span>
        </div>
        <ul className='flex items-center justify-evenly my-3'>
            {/* <li className='mx-5 text-purple-700 text-lg hover:text-purple-400'><a href="">Home</a></li> */}
            <li className='mx-5 text-purple-700 text-lg hover:text-purple-400'><a href="https://github.com/NikCodePro" target="_blank">GitHub</a></li>
        </ul>
    </nav>
  )
}

export default Navbar