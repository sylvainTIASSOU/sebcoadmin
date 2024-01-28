'use client'
import { CustomButton } from '@/components'
import { useRouter } from 'next/navigation'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import ConnexionModel from '@/models/ConnexionModel'
import UserModel from '@/models/userModel'
import {userContextProvider} from "@/context/Context";
import {Api} from "@/api/api";
//import { myContext } from './context/page'

var authorisation = '';
export default function Home() {
  // @ts-ignore
  const { user, setUser   } = userContextProvider();

  const router = useRouter()
  async function postFunction(data: any, endPoint: string) {
    const response = await fetch(`http://localhost:3001/${endPoint}`, {
            
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
    return response ;
  }

  const formik = useFormik({
    initialValues: {
      phone : '',
      password: ''
    },

    validationSchema: Yup.object({
      phone: Yup.number().required('le psuedo est obligatoire'),
      password: Yup.string().required('le mot de passe est obligatoire')
    }),

    onSubmit: async (values) => {
    //  console.log(values);
      const connexionModel = new ConnexionModel(Number(values.phone), values.password);

      const res = await Api.post(connexionModel, 'users/login');

      if(res.ok) {
        await res.json().then((data) => {

          if((data.role == 'super_admin') || (data.role == 'admin') ) {
            setUser(data.id.toString())
            router.push('pages/dashbord');
          } else {
            authorisation = 'Desolé vous n\'avez pas accès a ce site.'
          }
        })
      }
    }
  })

  return (
    <div className='w-full h-full'>

      <h1 className=' text-[40px] text-font-bold text-center  mt-10'>Page de connecxion</h1>

      <div className='flex items-center justify-center px-5'>

        <div className='bg-bgopacity md:w-[600px] mt-[45%] md:mt-[5%] md:mx-[320px] rounded-xl content-center justify-center items-center  h-auto p-10'>

          <h1 className={authorisation != ''? ' text-accent text-[28px] text-font-bold text-center  ' : 'text-[28px] text-font-bold text-center' }>
            {authorisation != '' ? authorisation : "Connectez-vous"}
            </h1>

          <form onSubmit={formik.handleSubmit}>

            <div className='flex flex-col space-y-[15px] mt-8 '>
              <div className='flex flex-col space-y-2'>
                <label className='text-accent'>{formik.touched.phone && formik.errors.phone ? formik.errors.phone : ""} </label>
                <input type="tel" name='phone' 
                value={formik.values.phone}
                onChange={formik.handleChange}
                placeholder='Numéro' className='h-[40px] pl-5 bg-zinc-300 border-orange-600 border-2 rounded-[15px] text-black text-[25px] ' />
              </div>
              

              <div className='flex flex-col space-y-2'>
                <label className='text-accent'>{formik.touched.password && formik.errors.password ? formik.errors.password : ""} </label>
                <input type="password" name='password' 
                value={formik.values.password}
                onChange={formik.handleChange}
                placeholder='Mot de passe' className='h-[40px] pl-5  bg-zinc-300 border-orange-600 border-2 rounded-[15px] text-black text-[25px]' />
              </div>

              <button
              type={'submit'}
              className={'bg-btnbg p-2 text-[20px] font-bold rounded-[10px]'}
              >
                Se connecter
              </button>
              {/*<CustomButton
                  title={'Se connecter'}
              />*/}
            </div>
          </form>
        </div>
      </div>

    </div>
  )
}
