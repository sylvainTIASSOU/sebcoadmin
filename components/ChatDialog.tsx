'use client'
import {Dialog, Transition} from '@headlessui/react'
import {Fragment, useState} from 'react'
import {HiChatBubbleOvalLeftEllipsis, HiMiniPaperAirplane, HiUserCircle, HiXMark} from "react-icons/hi2";
//import Badge from '@mui/material/Badge';
import {useFormik} from 'formik'
import {userContextProvider} from "@/context/Context";
//import {ChatModel} from '@/models/chatModel'

const DialogMessage = () => {
    const [msgSend, setMsgSend] = useState([]);
    const [msgReceive, setMsgReceive] = useState([]);

    let [isOpen, setIsOpen] = useState(false)


    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }


    const formik = useFormik({
        initialValues: {
            content: '',
        },

        onSubmit: (values) => {

            // const chatModel = new ChatModel(values.content, Number(user));
            // console.log(chatModel);
            // values.content = '';

        }
    })

    return (
        <>
            <button className={"style"}
                    onClick={() => {
                        openModal();
                    }}
            >
                {/*<Badge badgeContent={4} color="primary">

                </Badge>*/}
                <HiChatBubbleOvalLeftEllipsis className='w-[25px] h-[25px] '/>
            </button>


            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25"/>
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel
                                    className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"

                                    >

                                    </Dialog.Title>
                                    <div className="mt-0 text-gray-500 ">
                                        <div className='self-center'>
                                            <button
                                                type="button"
                                                className='fixed top-3 right-3'
                                                onClick={closeModal}
                                            >
                                                <HiXMark className='w-[20px] h-[20px] bg-btnbg rounded-full '/>
                                            </button>


                                            <div className='flex space-x-3 self-center'>
                                                <HiUserCircle className='w-[40px] h-[40px] bg-btnbg rounded-full'/>
                                                <h1 className='text-black'>service client</h1>
                                            </div>
                                        </div>

                                        {/**messages */}
                                        <div
                                            className='my-8 flex flex-col space-y-3 overflow-y-scroll  px-3 h-[300px] '>

                                            <div
                                                className='snap-center  bg-slate-300 w-auto self-end p-3 pl-5 rounded-lg'>
                                                <p className='text-black text-left text-[12px] font-bold '>message2</p>
                                            </div>

                                            return <div
                                            className='snap-center  bg-slate-500 p-3 self-start pl-5 w-auto rounded-lg'>
                                            <p className='text-white text-left text-[12px] font-bold'>message1</p>
                                        </div>



                                        </div>


                                        <div className='self-center  mt-5 bg-white'>
                                            <form onSubmit={formik.handleSubmit}
                                                  className='flex content-between justify-between'>
                        <textarea name="content" id=""
                                  placeholder='posez votre question ici'
                                  cols={30} rows={10}
                                  className='h-[45px] mr-3 w-full border-2 text-black border-btnbg rounded-md pl-3'
                                  value={formik.values.content}
                                  onChange={formik.handleChange}
                        >
                          Posez votre question ici
                        </textarea>
                                                <button type="submit">
                                                    <HiMiniPaperAirplane
                                                        className='w-[40px] h-[40px] bg-btnbg rounded-full'/>
                                                </button>
                                            </form>
                                        </div>
                                    </div>


                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
export default DialogMessage