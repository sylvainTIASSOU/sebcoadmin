'use client'
import { SiddeBar } from '@/components'
import React, {useState} from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { CategoryModel } from '@/models/categoryModel';
import { AddProductController } from '@/controllers/addProductController';
import { MaterialProductModel } from '@/models/materialProductModel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function addMaterial () {
    const [image, setImage] = useState<any>();
    const [imagePro, setImagePro] = useState<any>('');

  const notify = () => toast("Produit ajouté avec succès", {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });
  const formik = useFormik({
    initialValues: {
      category: '',
      name: '',
      quantity: '',
      price: '',
      priceTonne: '',
    },

    validationSchema: Yup.object({
      category: Yup.string().required('la catégorie est obligatoire'),
      name: Yup.string().required('le nom du produit est obligatoire'),
      quantity: Yup.number().required('la quantité est obligatoire'),
      price: Yup.number().required('le prix unitaire est obligatoire'),
      priceTonne: Yup.number().notRequired(),

    }),


    onSubmit: async  (values) => {
        console.log(image);

      const categorie = new CategoryModel(values.category, image);
      const resp = await AddProductController.postFunction(categorie, 'category/add');
      if(resp.ok) {
        const cat: CategoryModel = await resp.json();
        const product = new MaterialProductModel(Number(cat.id), values.name, Number(values.quantity), Number(values.price), Number(values.priceTonne), imagePro);

        const res = await AddProductController.postFunction(product, 'product/add');
        if(res.ok){
          notify();
          values.category = ''
          values.name = ''
          values.price =''
          values.priceTonne=''
          values.quantity=''
        }
      }
      
    }
  });

    function filetobase64(e :any) {
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {

            setImage(reader.result);
        };
        reader.onerror = error => {
            console.log("error : ", error);
        };
    }

    function filetobase64ImagePro(e: any) {
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {

            setImagePro(reader.result);
        };
        reader.onerror = error => {
            console.log("error : ", error);
        };
    }



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


      <div className='ml-[25%] mt-[20px] '>
        <h1 className='text-[35px] font-bold '>Ajouter un produit</h1>
      </div>
      <div className='ml-[25%] mt-[1%]'>
      <div className='w-[620px] bg-bgopacity rounded-lg p-3  ml-[5%] '>
        <h1 className='text-btnbg text-center'>Les champs précédé de * sont obligatoires</h1>
        {/**formulaire */}
      <form onSubmit={formik.handleSubmit}
      className='flex flex-col space-y-9 p-2'>

          <div className='flex flex-col space-y-2 self-center'>
              <label htmlFor="name"> Selectionner l'image de la catégorie</label>

              <input type="file"
                     accept='image/*'
                     name='quantity'
                     onChange={filetobase64}
                     placeholder='Quantité du produit'
                     className='h-[40px] pl-5  border-orange-600 border-2 rounded-[15px] text-white text-[13px] bg-transparent '
              />
          </div>


        <div className='flex  space-x-15 p-2'>
{/** formulaire 1 */}
        <div className='flex flex-col space-y-3 p-2'>
<div className='flex flex-col space-y-1'>
          <label htmlFor="category"
          className={formik.touched.category && formik.errors.category? 'text-accent' : ""}> 
          {formik.touched.category && formik.errors.category? formik.errors.category : "Catégorie de produit"}  <span className='text-accent'>*</span></label>
          <input type="text" 
          name='category' 
          value={formik.values.category}
          onChange={formik.handleChange}
          list='cat'
          className='h-[40px] pl-5  border-orange-600 border-2 rounded-[15px] text-white text-[13px] bg-transparent ' 
          />
          <datalist id='cat'>
            <option value="ciment">Ciment</option>
            <option value="fer">Fer</option>
            <option value=""></option>
          </datalist>
        </div>

        <div className='flex flex-col space-y-2'>
          <label htmlFor="name"
          className={formik.touched.name && formik.errors.name? 'text-accent' : ""}
          >{formik.touched.name && formik.errors.name? formik.errors.name : "Nom du produit"}  <span className='text-accent'>*</span></label>

          <input type="text" 
          name='name'
          value={formik.values.name}
          onChange={formik.handleChange}
          placeholder='Nom du produit'
          className='h-[40px] pl-5  border-orange-600 border-2 rounded-[15px] text-white text-[13px] bg-transparent ' 
          />
        </div>

        <div className='flex flex-col space-y-2'>
          <label htmlFor="name"
          className={formik.touched.quantity && formik.errors.quantity? 'text-accent' : ""}
          >{formik.touched.quantity && formik.errors.quantity? formik.errors.quantity : "Quantité"}  <span className='text-accent'>*</span></label>
          
          <input type="number" 
          name='quantity'
          value={formik.values.quantity}
          onChange={formik.handleChange}
          placeholder='Quantité du produit'
          className='h-[40px] pl-5  border-orange-600 border-2 rounded-[15px] text-white text-[13px] bg-transparent ' 
          />
</div>
        </div>

        {/** formulaire 2 */}
        <div className='flex flex-col space-y-3 p-2'>
<div className='flex flex-col space-y-2'>
          <label className={formik.touched.price && formik.errors.price? 'text-accent' : ""}
          htmlFor="name">{formik.touched.price && formik.errors.price? formik.errors.price : "Prix Unitaire"}  <span className='text-accent'>*</span></label>
          
          <input type="number" 
          name='price'
          value={formik.values.price}
          onChange={formik.handleChange}
          placeholder='prix unitaire du produit'
          className='h-[40px] pl-5  border-orange-600 border-2 rounded-[15px] text-white text-[13px] bg-transparent ' 
          />
        </div>

        <div className='flex flex-col space-y-2'>
          <label htmlFor="name"
          className={formik.touched.priceTonne && formik.errors.priceTonne? 'text-accent' : ""}
          > Prix du tonne</label>
          
          <input type="number" 
          name='priceTonne'
          value={formik.values.priceTonne}
          onChange={formik.handleChange}
          placeholder='prix du tonne'
          className='h-[40px] pl-5  border-orange-600 border-2 rounded-[15px] text-white text-[13px] bg-transparent ' 
          />
        </div>
        
        <div className='flex flex-col space-y-2'>
          <label
          htmlFor="name">Image du produit <span className='text-accent'>*</span></label>
          
          <input type="file" 
          name='image'
          accept='image/*'
          placeholder=''
          onChange={filetobase64ImagePro}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
          className='h-[40px] pl-5  border-orange-600 border-2 rounded-[15px] text-white text-[13px] bg-transparent ' 
          />
        </div>
        </div>
        </div>
        

        

        <button type="submit"
        className='bg-btnbg w-auto self-center px-4 py-2'>
          AJOUTER
        </button>

      </form>
      </div>
      </div>
      

      <SiddeBar />
    </div>
  )
}
