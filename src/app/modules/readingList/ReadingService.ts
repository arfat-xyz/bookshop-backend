import { IProduct } from "../product/ProductInterface";
import { ReadingModel } from "./ReadingModel"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createReading = async ({ id, email }: { id: string; email: string }): Promise<any> => {
   const exist = await ReadingModel.findOne({ email }).populate({
      path: 'products'
   })
   let result
   if (exist) {
      const check = exist.products.find((product: IProduct) => product._id == id)
      if (check) {
         return exist
      }
      result = await ReadingModel.updateOne({ _id: exist._id }, {
         $push: { products: id }
      }).populate({
         path: 'products'
      })
   }
   else {

      const temp = await ReadingModel.create({ email, products: id })
      result = await ReadingModel.findOne({ _id: temp._id }).populate({ path: 'products' })
      console.log(result, 'From else');
   }
   return result
}
const getReading = async ({ email }: { email: string }) => {
   const result = await ReadingModel.findOne({ email }).populate({ path: 'products' })
   console.log(email, result);
   return result
}
const deleteReading = async ({ email }: { email: string }) => {
   const result = await ReadingModel.findOne({ email }).populate({ path: 'products' })
   console.log(email, result);
   return result
}

export const ReadingService = { createReading, getReading, deleteReading }