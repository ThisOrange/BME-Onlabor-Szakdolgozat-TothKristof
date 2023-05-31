import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Base } from '../src/layout/Base'

function MyApp({ Component, pageProps }: AppProps) {
  return(
  
  <Base>
  <script src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}></script>
  <Component {...pageProps} />
  </Base>
  )
}

export default MyApp
