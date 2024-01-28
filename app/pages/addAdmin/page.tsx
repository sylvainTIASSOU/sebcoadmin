"use client"
import { CustomButton, Header } from '@/components'
import SideBar from '@/components/SideBar'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserModel from '@/models/userModel'
import { useRouter } from 'next/navigation'
import {Api} from "@/api/api";


var passValidator = '';
export default function addAdmin() {
  const route = useRouter();

  const notifySucces = () => toast("addmin add!", {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });

  //form validatore
  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      password: '',
      password_confirm:'',
      role:'',

    },
    validationSchema: Yup.object({
      name: Yup.string().required("le nom est obligatoire"),
      phone: Yup.number().required('le numéro est obligatoire'),
      password: Yup.string().required("le mot de passe est obligatoire"),
      password_confirm: Yup.string().required("Confirmer le mot de passe"),
    }),

    onSubmit: async (values) => {

      if(values.password === values.password_confirm)
      {
        const res = await Api.post({
          pseudo: values.name,
        }, 'admin/add');
       
      

        if(res.ok) {
          
          Api.get(`admin/single/${values.name}`).then(async (data) => {
            console.log(data)
           /* const userModel = new UserModel(Number(values.phone), values.password, "admin", Number(data));

            const res = await Api.post(userModel, 'users/add');
            if(res.ok) {
              notifySucces();
              route.push('/pages/adminListe');
            }*/
          })
        }

      }
      else {
        passValidator = 'les mots de passe ne sont pas conforme'
      }
      

    }
  })

  return (

    <div>
      <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      />
      <Header />

      <div className='ml-[25%] mt-[20px] '>
        <h1 className='text-[35px] font-bold '>Ajout d'un utilisateur</h1>
      </div>

      <div className='ml-[35%] mt-[20px] w-[500px] bg-bgopacity rounded-[30px] p-5'>
        <h1>Informations de connexion</h1>
        <h1 className='text-center text-accent'>{passValidator != '' ? passValidator : ''}</h1>
        <form   onSubmit={formik.handleSubmit}>
          <div className='flex flex-col space-y-[20px] '>
{/** name field */}
            <div className='flex flex-col space-y-[2px]'>
              <label htmlFor="pseudo" className='text-accent'>
                {formik.touched.name && formik.errors.name ? formik.errors.name: "" }
              </label>

                <input type="text" 
                name='name' 
                placeholder='nom et prénom' 
                value={formik.values.name}
                  onChange={formik.handleChange}
                className='bg-transparent rounded-[8px] border-[2px] border-btnbg h-[35px] pl-10' />
            </div>

            {/** phone field */}
            <div className='flex flex-col space-y-[2px]'>
              <label htmlFor="pseudo" className='text-accent'>
                {formik.touched.phone && formik.errors.phone ? formik.errors.phone: "" }
              </label>

                <input type="tel" 
                name='phone' 
                placeholder='téléphone' 
                value={formik.values.phone}
                  onChange={formik.handleChange}
                className='bg-transparent rounded-[8px] border-[2px] border-btnbg h-[35px] pl-10' />
            </div>
            {/** password field */}
            <div className='flex flex-col space-y-[2px]'>
            <label htmlFor="password" className='text-accent'>
                {formik.touched.password && formik.errors.password ? formik.errors.password: "" }
              </label>

              <input type="password" 
              name='password' 
              placeholder='mot de passe' 
              value={formik.values.password}
                  onChange={formik.handleChange}
              className='bg-transparent rounded-[8px] border-[2px] border-btnbg h-[35px] pl-10  ' />
            </div>
{/** password field */}
            <div className='flex flex-col space-y-[2px]'>
            <label htmlFor="confirme password" className='text-accent'>
                {formik.touched.password_confirm && formik.errors.password_confirm ? formik.errors.password_confirm: "" }
              </label>

               <input type="password" 
               name='password_confirm' 
               placeholder=' Confirmé le mot de passe' 
               value={formik.values.password_confirm}
                  onChange={formik.handleChange}
               className='bg-transparent rounded-[8px] border-[2px] border-btnbg h-[35px] pl-10  ' />
            </div>
            
           
          </div>
          <br />
          <h1>Rôle</h1> <br />

          <div className='flex space-x-[250px] '>
            <div className='flex space-x-3'>
              <input type="radio" name='role' value='admin' onChange={formik.handleChange} />
              <p>Gérant</p>
            </div>

            <div className='flex space-x-3'>
              <input type="radio" name='role' value='super_admin' onChange={formik.handleChange} />
              <p>Super admin</p>
            </div>

          </div>

          <br /> <br />
          {/**buttons */}
          <div className='flex space-x-[220px] '>
            <input type="reset" value="Annuler" className='w-[150px] bg-btnbg p-2 text-[20px] font-bold rounded-[10px]' />
            
            <CustomButton title={'Valider'} style='w-[150px]' />
            
          </div>
        </form>
      </div>

      <SideBar />
    </div>

  )
}
