'use client'
import { SiddeBar, Header, CustomButton } from '@/components';
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AddProductController } from '@/controllers/addProductController';
import { CategoryModel } from '@/models/categoryModel';
import { ProductModel } from '@/models/productModel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Api} from "@/api/api";

export default function addProduct() {
  const [image, setImage] = useState('');
  const notify = () => toast("Produit ajouté avec succès", {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });

  const formik = useFormik({
    initialValues: {
      category: '',
      name: '',
      granulometrie: '',
      forme: '',
      color: '',
      cube6: '',
      cube10: '',
      cube12: '',
      cube14: '',
      cube16: '',
      cube20: '',
      description: '',
      usage: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Le champs est obligatoire'),
      forme: Yup.string().required('Le champs est obligatoire'),
      category: Yup.string().required('Le champs est obligatoire'),
      granulometrie: Yup.string().required('Le Champs est obligatoire'),
      color: Yup.string().required('Le Champs est obligatoire'),
      cube6: Yup.number().required('Le Champs est obligatoire'),
      cube10: Yup.number().required('Le Champs est obligatoire'),
      cube12: Yup.number().required('Le Champs est obligatoire'),
      cube14: Yup.number().required('Le Champs est obligatoire'),
      cube16: Yup.number().required('Le Champs est obligatoire'),
      cube20: Yup.number().required('Le Champs est obligatoire'),
      description: Yup.string().required('Le Champs est obligatoire'),
      usage: Yup.string().required('Le Champs est obligatoire')

    }),

    onSubmit: async (values) => {

      console.log(image);
        //console.log(`mon image est ============================== ${myImage}`)
      const categoryModel = new CategoryModel(values.category);
      const resp = await Api.post(categoryModel, 'category/add');
      if (resp.ok) {
        const cat: CategoryModel = await resp.json();

        const product = new ProductModel(Number(cat.id), values.name, image, values.granulometrie, values.forme, values.color, values.description, values.usage, Number(values.cube6), Number(values.cube10), Number(values.cube12), Number(values.cube14), Number(values.cube16), Number(values.cube20))
        const re = await AddProductController.postFunction(product, 'product/add');
        if (re.ok) {

          notify();
          values.category='';
          values.color=''
          values.cube10=''
          values.cube12=''
          values.cube14=''
          values.cube16=''
          values.cube20=''
          values.cube6=''
          values.description=''
          values.forme=''
          values.granulometrie=''
          values.name=''
          values.usage=''

        }
      }


     }
  });

  function filetobase64(e: any) {
    var  reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {

      // @ts-ignore
      setImage(reader.result);
    };
    reader.onerror = error => {
      console.log("error : ", error);
    };
  }
  return (
    <div className={"b-10"}>
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
      theme="light"
      />
      <Header />
      <div className='ml-[25%] mt-[20px] '>
        <h1 className='text-[35px] font-bold '>Ajouter un produit</h1>
      </div>

      {/**
formulaire */}
      <div className='ml-[10%] mt-[2%]'>
        <form onSubmit={formik.handleSubmit} >
          <Swiper
            spaceBetween={30}
            centeredSlides={true}

            pagination={{
              clickable: true,

            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper w-[700px] "
          >
            <SwiperSlide >
              <div className='w-[600px] bg-bgopacity rounded-lg p-3  ml-[5%] '>

                <div className='flex flex-col space-y-5'>
                  {/** the radio */}
                  <div className='flex content-between justify-between'>
                    <div className='flex space-x-5'>
                      <input type="radio"
                        value='sable'
                        onChange={formik.handleChange}
                        name="category" id="sable" />
                      <h1>sable</h1>
                    </div>

                    <div className='flex space-x-5'>
                      <input type="radio"
                        value='gravier'
                        onChange={formik.handleChange}
                        name="category" id="sable" />
                      <h1>gravier</h1>
                    </div>

                    <div className='flex space-x-5'>
                      <input type="radio"
                        value='ramblai'
                        onChange={formik.handleChange}
                        name="category" id="sable" />
                      <h1>ramblai</h1>
                    </div>
                  </div>
                  <div className='flex flex-col'>
                    <label htmlFor="text" className='text-accent'> {formik.touched.name && formik.errors.name ? formik.errors.name : ''} </label>
                    <input type="text"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      name='name' placeholder='nom' className='h-[40px] pl-5  border-orange-600 border-2 rounded-[15px] text-white text-[20px] bg-transparent ' />

                  </div>


                  <div className='flex content-between justify-between'>
                    <div className='flex flex-col'>
                      <label htmlFor="text" className='text-accent'> {formik.touched.granulometrie && formik.errors.granulometrie ? formik.errors.granulometrie : ''} </label>
                      <input type="text"
                        value={formik.values.granulometrie}
                        onChange={formik.handleChange}
                        name='granulometrie' placeholder='Granulométrie' className='h-[40px] w-[200px] pl-5 bg-transparent border-orange-600 border-2 rounded-[15px] text-white text-[20px] ' />

                    </div>

                    <div className='flex flex-col'>
                      <label htmlFor="text" className='text-accent'> {formik.touched.forme && formik.errors.forme ? formik.errors.forme : ''} </label>
                      <input type="text"
                        value={formik.values.forme}
                        onChange={formik.handleChange}
                        name='forme' placeholder='Forme' className='h-[40px] w-[200px] pl-5 bg-transparent border-orange-600 border-2 rounded-[15px] text-white text-[20px] ' />

                    </div>

                  </div>


                  <div className='flex content-between justify-between'>
                    <div className='flex flex-col'>
                      <label htmlFor="text" className='text-accent'> {formik.touched.color && formik.errors.color ? formik.errors.color : ''} </label>
                      <input type="text"
                        value={formik.values.color}
                        onChange={formik.handleChange}
                        name='color' placeholder='Couleure' className='h-[40px] w-[200px] pl-5 bg-transparent border-orange-600 border-2 rounded-[15px] text-white text-[20px] ' />

                    </div>

                    <div className='flex flex-col'>
                      <label htmlFor="text" className='text-accent'>  </label>
                      <input type="file"
                      id='myfile' onChange={filetobase64}
                        name='image' placeholder='photo' className='h-[40px] w-[200px] pl-5 bg-transparent border-orange-600 border-2 rounded-[15px] text-white text-[20px] ' />

                    </div>

                  </div>

                  <h1>Prix par m3</h1>
                  <div className='flex content-between justify-between'>

                    <div className='flex flex-col'>
                      <label htmlFor="text" className='text-accent'> {formik.touched.cube6 && formik.errors.cube6 ? formik.errors.cube6 : ''} </label>
                      <input type="text"
                        value={formik.values.cube6}
                        onChange={formik.handleChange}
                        name='cube6' placeholder='6 m3' className='h-[40px] w-[130px] pl-5 bg-transparent border-orange-600 border-2 rounded-[15px] text-white text-[20px] ' />

                    </div>

                    <div className='flex flex-col'>
                      <label htmlFor="text" className='text-accent'> {formik.touched.cube10 && formik.errors.cube10 ? formik.errors.cube10 : ''} </label>
                      <input type="text"
                        value={formik.values.cube10}
                        onChange={formik.handleChange}
                        name='cube10' placeholder='10 m3' className='h-[40px] w-[130px] pl-5 bg-transparent border-orange-600 border-2 rounded-[15px] text-white text-[20px] ' />

                    </div>

                    <div className='flex flex-col'>
                      <label htmlFor="text" className='text-accent'> {formik.touched.cube12 && formik.errors.cube12 ? formik.errors.cube12 : ''} </label>
                      <input type="text"
                        value={formik.values.cube12}
                        onChange={formik.handleChange}
                        name='cube12' placeholder='12 m3' className='h-[40px] w-[130px] pl-5 bg-transparent border-orange-600 border-2 rounded-[15px] text-white text-[20px] ' />

                    </div>

                  </div>

                  <div className='flex content-between justify-between'>

                    <div className='flex flex-col'>
                      <label htmlFor="text" className='text-accent'> {formik.touched.cube14 && formik.errors.cube14 ? formik.errors.cube14 : ''} </label>
                      <input type="text"
                        value={formik.values.cube14}
                        onChange={formik.handleChange}
                        name='cube14' placeholder='14 m3' className='h-[40px] w-[130px] pl-5 bg-transparent border-orange-600 border-2 rounded-[15px] text-white text-[20px] ' />

                    </div>

                    <div className='flex flex-col'>
                      <label htmlFor="text" className='text-accent'> {formik.touched.cube16 && formik.errors.cube16 ? formik.errors.cube16 : ''} </label>
                      <input type="text"
                        value={formik.values.cube16}
                        onChange={formik.handleChange}
                        name='cube16' placeholder='16 m3' className='h-[40px] w-[130px] pl-5 bg-transparent border-orange-600 border-2 rounded-[15px] text-white text-[20px] ' />

                    </div>

                    <div className='flex flex-col'>
                      <label htmlFor="text" className='text-accent'> {formik.touched.cube20 && formik.errors.cube20 ? formik.errors.cube20 : ''} </label>
                      <input type="text"
                        value={formik.values.cube20}
                        onChange={formik.handleChange}
                        name='cube20' placeholder='20 m3' className='h-[40px] w-[130px] pl-5 bg-transparent border-orange-600 border-2 rounded-[15px] text-white text-[20px] ' />

                    </div>

                  </div>

                  <div className='ml-[45%] mt-[5px] '>

                  </div>
                </div>



              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className='w-[600px] bg-bgopacity rounded-lg p-3  ml-[5%] '>
                <h1 className='text-center text-[25px]'>Informations complementaires</h1>

                <div className='flex flex-col space-y-5'>
                  <div className='flex flex-col'>
                    <label htmlFor="" className={formik.touched.description && formik.errors.description ? 'text-accent' : ''}> {formik.touched.description && formik.errors.description ? formik.errors.description : 'Description'} </label>
                    <textarea
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      name="description" id="description" cols={10} rows={3} className='pl-5 bg-transparent border-orange-600 border-2 rounded-[15px] text-white text-[20px]'></textarea>
                  </div>

                  <div className='flex flex-col'>
                    <label htmlFor="" className={formik.touched.usage && formik.errors.usage ? 'text-accent' : ''}> {formik.touched.usage && formik.errors.usage ? formik.errors.usage : 'Usage'} </label>
                    <textarea
                      value={formik.values.usage}
                      onChange={formik.handleChange}
                      name="usage" id="usage" cols={10} rows={3} className='pl-5 bg-transparent border-orange-600 border-2 rounded-[15px] text-white text-[20px]'></textarea>
                  </div>

                  <div className='ml-[45%] mt-[5px] '>
                    <button type="submit">
                      AJOUTER
                    </button>
                  </div>
                </div>



              </div>
            </SwiperSlide>
          </Swiper>
        </form>
      </div>


      <SiddeBar />

    </div>
  )
}
