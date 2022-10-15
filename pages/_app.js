import '../styles/globals.css'
import "../styles/code.css"
import Layout from '../components/layout'

export default function MyApp(props) {
  return (
    <Layout>
      <props.Component {...props.pageProps} />
    </Layout>
  )
}
