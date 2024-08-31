import { useState, useEffect } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';


const Manager = () => {
    const [form, setForm] = useState({ website: '', username: '', password: '' })
    let [passwordArray, setPasswordArray] = useState([])

    const getPassword = async () => {
        let res = await fetch('http://localhost:3000/')
        let passwords = await res.json()
        setPasswordArray(passwords)
        console.log(passwords)
    }

    useEffect(() => {
        getPassword()
    }, [])


    const savePassword = async () => {
        if (form.website.length > 3 && form.username.length > 3 && form.password.length > 3) {
            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            await fetch('http://localhost:3000/', { method: "POST", headers: { "content-type": "application/json", }, body: JSON.stringify({ ...form, id: uuidv4() }) })
            setForm({ website: '', username: '', password: '' })
        }
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })

    }

    const copyText = (text) => {
        toast('🦄 Copied To Clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        window.navigator.clipboard.writeText(text)
    }

    const deletePassword = async (id) => {
        let c = confirm("you really want to Delete !!")
        if (c) {
            console.log("deleting passord with id ", id)
            setPasswordArray(passwordArray.filter(item => item.id !== id))
            await fetch('http://localhost:3000/', { method: "DELETE", headers: { "contentType": "application/json", }, body: JSON.stringify({ ...form, id }) })
            // toast('🦄 Password Deleted Successfully!', {
            //     position: "top-right",
            //     autoClose: 5000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            //     theme: "light",
            // });
        }
    }
    // const editPassword = (id) => {
    //     console.log("editing passord with id ", id)
    //     setPasswordArray(passwordArray.filter(item => item.id === id)[0])
    //     localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
    // }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            <ToastContainer />
            <div className="absolute top-0 -z-10 h-full w-full bg-purple-50"><div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(139,90,196,0.5)] opacity-50 blur-[80px]"></div></div>
            <div className="box flex justify-center items-center ">
                <div className="container mx-auto max-w-[4xl] md:w-full">
                    <div className="text-2xl text-center text-purple-700 font-bold">
                        <span className="text-purple-700">&lt;</span>
                        <span className="text-pink-500">Pass</span><span className="">OP</span>
                        <span className="text-purple-700">/&gt;</span>
                    </div>
                    <h1 className="text-black text-center text-lg">Password Manager</h1>
                    <h4 className="text-black text-center text-lg">Create & Store your Own Passwords</h4>
                    <div className="md:flex-row flex-col gap-2 items-center justify-center text-black p-4">
                        <input value={form.website} onChange={handleChange} placeholder="Enter Website URL" className="rounded-lg bg-white border-purple-700 focus-visible:outline-purple-700 border p-1 m-2 w-full mx-auto" type="text" name="website" id="" />
                        <div className="flex-row justify-between w-full items-center md:mx-auto">
                            <input name="username" value={form.username} onChange={handleChange} placeholder="Enter Username" className="rounded-lg bg-white focus-visible:outline-purple-700 border-purple-700 border mx-1 p-1 my-2 md:w-[47%] w-40" type="text" />
                            <input name="password" value={form.password} onChange={handleChange} placeholder="Enter Password" className="rounded-lg bg-white focus-visible:outline-purple-700 border-purple-700 border mx-1 p-1 my-2 md:w-[47%] w-40" type="text" /><span className="relative"></span>
                        </div>
                    </div>
                    <div className="button-conatiner flex w-full m-1">
                        <button
                            onClick={savePassword}
                            type="button"
                            className="rounded-full mx-auto bg-purple-300 border border-purple-700 text-purple-700 px-3 py-2 text-sm font-semibold shadow-sm hover:bg-purple-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                        >
                            Add Password
                        </button>
                    </div>
                    <div className="password-container">
                        {passwordArray.length === 0 && <div>There is NO Passwords To Show</div>}
                        {passwordArray.length != 0 &&
                            <table className="table-auto w-full my-4 mb-5">
                                <thead>
                                    <tr className="bg-purple-200 border-1 border-purple-700 text-purple-700">
                                        <th className="p-2">Website</th>
                                        <th className="p-2">Username</th>
                                        <th className="p-2">Password</th>
                                        <th className="p-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {passwordArray.map((item, index) => {
                                        return <tr className="w-4/5" key={index} >
                                            <td className="text-center w-32 bg-purple-50 border border-purple-700"><div className="flex justify-center items-center"><span>{item.website}</span><div onClick={() => { copyText(item.website) }} className="lordicon p-1"><lord-icon
                                                src="https://cdn.lordicon.com/jctchmfs.json"
                                                trigger="hover"
                                                style={{ width: "21px", height: "21px" }}>
                                            </lord-icon></div></div></td>
                                            <td className="text-center w-32 bg-purple-50 border border-purple-700"><div className="flex justify-center items-center"><span>{item.username}</span><div onClick={() => { copyText(item.username) }} className="lordicon p-1"><lord-icon
                                                src="https://cdn.lordicon.com/jctchmfs.json"
                                                trigger="hover"
                                                style={{ width: "21px", height: "21px" }}>
                                            </lord-icon></div></div></td>
                                            <td className="text-center w-32 bg-purple-50 border border-purple-700"><div className="flex justify-center items-center"><span>{item.password}</span><div onClick={() => { copyText(item.password) }} className="lordicon p-1"><lord-icon
                                                src="https://cdn.lordicon.com/jctchmfs.json"
                                                trigger="hover"
                                                style={{ width: "21px", height: "21px" }}>
                                            </lord-icon></div></div></td>
                                            <td className="text-center w-32 bg-purple-50 border border-purple-700">
                                                <span onClick={() => { deletePassword(item.id) }} className="delete cursor-pointer mx-1"><lord-icon
                                                    src="https://cdn.lordicon.com/wpyrrmcq.json"
                                                    trigger="hover"
                                                    style={{ width: "21px", height: "21px" }}>
                                                </lord-icon>
                                                </span>
                                                {/* <span onClick={() => { editPassword(item.id) }} className="edit cursor-pointer mx-1"><lord-icon
                                                    src="https://cdn.lordicon.com/hqymfzvj.json"
                                                    trigger="hover"
                                                    style={{ width: "21px", height: "21px" }}>
                                                </lord-icon>
                                                </span> */}
                                            </td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>}
                    </div>
                </div>
            </div >
        </>
    )
}

export default Manager