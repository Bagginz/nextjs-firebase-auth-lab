import Head from 'next/head'
const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD'
};

const Layout = props => (
    <>
    <Head>
        <title>Firebase Authen</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      
    </Head>
    <div style={layoutStyle}>
        {props.children}
    </div>
    </>
);

export default Layout;