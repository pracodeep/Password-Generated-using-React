import { useState,useCallback,useEffect,useRef } from 'react'


function App() {
const[length ,setlength]=useState(8)
const[numberallowed,setnumberallowed]=useState(false)
const[charecterallowed,setcharecterallowed]=useState(false)
const[password,setpassword]=useState("")

//use ref hook
const passwordref=useRef(null)

const passwordgenerator= useCallback(()=>{
            let pass=""
            let str="ABCDEFGHIJKLMNOPQRSTUVWZYZabcdefghijklmnopqrstuvwxyz"
            if(numberallowed)
            str+="0123456789"
  
           if(charecterallowed)
                  str+="!@#$%^&*(){}-_~'{}[]"
  
           for(let i=1;i<=length;i++)
    {
                  let char=Math.floor(Math.random()*str.length+1)
                  pass+=str.charAt(char)
    }
  setpassword(pass) //for optimization



},[length,numberallowed,charecterallowed,setpassword])


const copyPasswordonclipboard=useCallback(()=>
{
            passwordref.current?.select()
  //passwordref.current?.setSelectionRange(0,3)
            window.navigator.clipboard.writeText(password)


},
[password])


useEffect(()=>
{
         passwordgenerator()
},[length,numberallowed,charecterallowed,passwordgenerator])




  return (
    <>
              <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800'>
                  <h1 className='text-white text-center my-2'>Password generator</h1>
                    <div className='flex shadow rounded-lg overflow-hidden mb-4 my-8'>

<input
              type='text'
              value={password}
              className='outline-none w-full px-3 py-1 '
              placeholder='password'
              readOnly
              ref={passwordref}
            >



</input>
<button
        onClick={copyPasswordonclipboard}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 text-center'>Copy</button>

</div>

<div className='flex flex-sm gap-x-2 '>
  <div className='flex items-center gap-x-1'>

    <input type="range"
    min={8}
    max={100}
    value={length}
    className=' cursor-pointer' 
    onChange={(e)=>{setlength(e.target.value)}
    
    }   
    />
    <label>Length:{length}</label>
  </div>
<div className='flex items-center gap-x-1'>
<input type="checkbox" 
defaultChecked={numberallowed}
id="number Input"
onChange={()=>{setnumberallowed((prev)=>!prev)
}}
/>
<label htmlFor="numberInput">Numbers</label>

</div>
<div className='flex item-center gap -skew-x-1'>
<input type="checkbox"
defaultChecked={charecterallowed}
id="charecter input"
onChange={()=>{setcharecterallowed((prev=>!prev))

}}


/>
<label htmlFor="charecterInput">Charecter</label>

</div>

</div>


</div>
     
    </>
  )
}

export default App
