import { createSlice } from "@reduxjs/toolkit"
import { getCategories, getProducts } from "../../utils/api"
import { toast } from "react-toastify"

let items = await getProducts()
let categories = await getCategories()

export const productSlice = createSlice({
  name: "product",
  initialState: {
    categories,
    items,
    addedItems: [],
    total: 0,
    totalItemsInCart: 0,
  },
  reducers: {
    increseAmount: (state, action) => {
      state.addedItems.find((item) => {
        if (item.id === action.payload && item.quantity < 99) {
          state.total += item.price
          state.totalItemsInCart += 1
          item.quantity += 1
        }
      })
    },

    decreseAmount: (state, action) => {
      state.addedItems.find((item) => {
        if (item.id === action.payload && item.quantity > 1) {
          state.total -= item.price
          state.totalItemsInCart -= 1
          item.quantity -= 1
        }
      })
    },

    addProduct: (state, action) => {
      const itemInItems = state.items.find((item) => item.id === action.payload)
      const checkItemInItems = Boolean(itemInItems)
      const itemInAddedItems = state.addedItems.find(
        (addedItem) => addedItem.id === action.payload
      )
      const checkItemInAddedItems = Boolean(itemInAddedItems)
      if (checkItemInItems && !checkItemInAddedItems) {
        const cloneObject = JSON.parse(JSON.stringify(itemInItems))
        cloneObject.quantity += 1
        state.addedItems.push(cloneObject)
        state.totalItemsInCart += 1
        state.total += cloneObject.price
        toast.success("Добавлено ✨", {
          toastId: cloneObject.id,
        })
      } else if (itemInAddedItems.quantity === 99) {
        toast.info("Максимальное количество 99 штук", {
          toastId: itemInAddedItems.id,
        })
      } else {
        state.totalItemsInCart += 1
        state.total += itemInAddedItems.price
        itemInAddedItems.quantity += 1
        toast.success("Добавлено ✨", {
          toastId: itemInAddedItems.id,
        })
      }
    },

    removeProduct: (state, action) => {
      state.addedItems.find((item) => {
        if (item.id === action.payload) {
          state.total -= item.price * item.quantity
          state.totalItemsInCart -= item.quantity
        }
      })
      const filteredItem = state.addedItems.filter(
        (item) => item.id !== action.payload
      )
      state.addedItems = filteredItem
    },
  },
})

export const { addProduct, removeProduct, increseAmount, decreseAmount } =
  productSlice.actions

export default productSlice.reducer
