import Head from "next/head"
import Layout from "../components/Layout"
import ProductPlaceholder from "../components/ProductPlaceholder"
import { Provider } from "react-redux"
import { store } from "../app/store"
import { PersistGate } from "reduxjs-toolkit-persist/integration/react"
import { persistStore } from "reduxjs-toolkit-persist"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "../styles/index.css"

const MyApp = ({ Component, pageProps }) => {
  let persistor = persistStore(store, {}, function () {
    persistor.persist()
  })
  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <Layout>
            <ProductPlaceholder />
          </Layout>
        }
        persistor={persistor}
      >
        <Layout>
          <Head></Head>
          <Component {...pageProps} />
          <ToastContainer
            position="top-center"
            autoClose={1500}
            limit={1}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </Layout>
      </PersistGate>
    </Provider>
  )
}

export default MyApp
